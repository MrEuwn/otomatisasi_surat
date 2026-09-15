import type { ReactNode } from "react";
import { TEMPLATES, type TemplateId } from "../lib/templates";
import type { SuratData } from "../lib/types";
import MahasiswaRows from "./MahasiswaRows";

const inputCls =
  "mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

function Field({ label, required, hint, children }:
  { label: string; required?: boolean; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {hint && <span className="mt-0.5 block text-xs text-gray-400">{hint}</span>}
    </label>
  );
}

interface Props {
  templateId: TemplateId;
  data: SuratData;
  onChange: (d: SuratData) => void;
}

export default function SuratForm({ templateId, data, onChange }: Props) {
  const t = TEMPLATES[templateId];
  const set = (patch: Partial<SuratData>) => onChange({ ...data, ...patch });
  const tahun = data.tanggal ? data.tanggal.slice(0, 4) : new Date().getFullYear();

  return (
    <div className="space-y-4 rounded-lg bg-white p-5 shadow">
      <h2 className="font-semibold">{t.label}</h2>

      <div className="rounded-md bg-blue-50 p-3 text-xs text-blue-800">
        Nomor surat <b>dikosongkan</b> (…/UN63.4/{t.kode}/{tahun}) — diisi manual oleh TU setelah
        surat dicetak. Tahun otomatis mengikuti tanggal surat.
      </div>

      <Field label="Tanggal surat" required>
        <input type="date" className={inputCls} value={data.tanggal}
          onChange={(e) => set({ tanggal: e.target.value })} />
      </Field>

      <div className="space-y-4 border-t pt-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Tujuan surat</div>
        <Field label="Yth. — jabatan / nama" required>
          <input className={inputCls} placeholder="cth: KEPALA EXPORT CENTER SURABAYA / Manager"
            value={data.ythJabatan} onChange={(e) => set({ ythJabatan: e.target.value })} />
        </Field>
        <Field label="Instansi (opsional)">
          <input className={inputCls} placeholder="cth: PT PLN Nusantara Power Services"
            value={data.ythInstansi} onChange={(e) => set({ ythInstansi: e.target.value })} />
        </Field>
        <Field label="Alamat tujuan" required hint="Tekan Enter untuk pindah baris">
          <textarea rows={3} className={inputCls} value={data.ythAlamat}
            onChange={(e) => set({ ythAlamat: e.target.value })} />
        </Field>
      </div>

      {templateId === "tugas-kuliah" && (
        <div className="space-y-4 border-t pt-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Detail tugas mata kuliah</div>
          <Field label="Mata kuliah" required>
            <input className={inputCls} list="mk-list" placeholder="cth: Ekspor Impor"
              value={data.mataKuliah} onChange={(e) => set({ mataKuliah: e.target.value })} />
            <datalist id="mk-list"><option value="Ekspor Impor" /></datalist>
          </Field>
          <Field label="Kegiatan" required>
            <input className={inputCls} list="kg-list" placeholder="cth: Wawancara, Observasi"
              value={data.kegiatan} onChange={(e) => set({ kegiatan: e.target.value })} />
            <datalist id="kg-list">
              <option value="Wawancara" /><option value="Observasi" />
              <option value="Wawancara, Observasi" />
            </datalist>
          </Field>
          <Field label="Aspek" required hint="cth: aspek ekonomi dokumentasi">
            <input className={inputCls} value={data.aspek}
              onChange={(e) => set({ aspek: e.target.value })} />
          </Field>
        </div>
      )}

      {templateId === "magang" && (
        <div className="border-t pt-4">
          <Field label="Jangka waktu magang">
            <input className={inputCls} value={data.durasiMagang}
              onChange={(e) => set({ durasiMagang: e.target.value })} />
          </Field>
        </div>
      )}

      {templateId === "penelitian" && (
        <div className="space-y-4 border-t pt-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Detail penelitian</div>
          <Field label="Lokasi penelitian" required>
            <input className={inputCls} value={data.lokasiPenelitian}
              onChange={(e) => set({ lokasiPenelitian: e.target.value })} />
          </Field>
          <Field label="Judul penelitian" required hint="Otomatis ditampilkan dalam HURUF KAPITAL">
            <textarea rows={3} className={inputCls} value={data.judulPenelitian}
              onChange={(e) => set({ judulPenelitian: e.target.value })} />
          </Field>
          <p className="rounded-md bg-amber-50 p-3 text-xs text-amber-800">
            Lokasi &amp; judul penelitian berlaku untuk semua mahasiswa dalam surat ini. Jika judul
            antar-mahasiswa berbeda, buat surat terpisah.
          </p>
        </div>
      )}

      <div className="space-y-3 border-t pt-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Data mahasiswa</div>
        <MahasiswaRows value={data.mahasiswa} onChange={(mahasiswa) => set({ mahasiswa })} />
      </div>
    </div>
  );
}