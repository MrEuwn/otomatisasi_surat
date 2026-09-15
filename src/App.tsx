import { useEffect, useRef, useState } from "react";
import { TEMPLATES, type TemplateId } from "./lib/templates";
import { emptySurat, type SuratData } from "./lib/types";
import SuratForm from "./components/SuratForm";
import SuratPaper from "./components/SuratPaper";
import { downloadSuratPdf } from "./lib/pdf";

const STORAGE_KEY = "surat-fisip-draft";

export default function App() {
  const [templateId, setTemplateId] = useState<TemplateId | null>(null);
  const [data, setData] = useState<SuratData>(emptySurat());
  const paperRef = useRef<HTMLDivElement>(null);

  // pulihkan draft terakhir
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setTemplateId(saved.templateId ?? null);
        setData({ ...emptySurat(), ...saved.data });
      }
    } catch { /* abaikan */ }
  }, []);

  // autosave
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ templateId, data }));
  }, [templateId, data]);

  const baseOk =
    !!data.tanggal &&
    !!data.ythJabatan.trim() &&
    !!data.ythAlamat.trim() &&
    data.mahasiswa.length > 0 &&
    data.mahasiswa.every((m) => m.nama.trim() && m.npm.trim() && m.prodi.trim())

  const extraOk =
    templateId === "tugas-kuliah"
      ? !!(data.mataKuliah.trim() && data.kegiatan.trim() && data.aspek.trim())
      : templateId === "penelitian"
      ? !!(data.lokasiPenelitian.trim() && data.judulPenelitian.trim())
      : true;

  const isValid = baseOk && extraOk;

  const handleDownload = () => {
    if (!paperRef.current || !templateId) return;
    const namaPertama =
      data.mahasiswa[0]?.nama.trim().split(/\s+/).join("-") || "Mahasiswa";
    downloadSuratPdf(paperRef.current, `Surat-${TEMPLATES[templateId].short}-${namaPertama}.pdf`);
  };

  // ---------- Halaman pilih template ----------
  if (!templateId) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Pembuat Surat Pengantar FISIP UPN "Veteran" Jawa Timur
          </h1>
          <p className="mt-2 text-gray-500">Pilih jenis surat yang ingin dibuat</p>
        </header>
        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {(Object.keys(TEMPLATES) as TemplateId[]).map((id) => (
            <button key={id} onClick={() => setTemplateId(id)}
              className="rounded-xl bg-white p-6 text-left shadow transition hover:-translate-y-0.5 hover:shadow-lg">
              <div className="mb-3 text-3xl">{TEMPLATES[id].icon}</div>
              <div className="font-semibold text-gray-800">{TEMPLATES[id].label}</div>
              <div className="mt-1 text-sm text-gray-500">{TEMPLATES[id].desc}</div>
              <div className="mt-3 text-xs text-gray-400">/UN63.4/{TEMPLATES[id].kode}/…</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ---------- Halaman form + preview ----------
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <button onClick={() => setTemplateId(null)}
            className="text-sm font-medium text-blue-600 hover:underline">
            ← Ganti template
          </button>
          <div className="flex gap-2">
            <button onClick={() => window.print()}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50">
              🖨 Print
            </button>
            <button onClick={handleDownload} disabled={!isValid} title={isValid ? "" : "Lengkapi data wajib terlebih dahulu"}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40">
              ⬇ Download PDF
            </button>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[420px_1fr]">
          <SuratForm templateId={templateId} data={data} onChange={setData} />

          <div className="overflow-x-auto rounded-lg shadow lg:sticky lg:top-4">
            <div className="bg-gray-200 px-4 py-2 text-xs font-medium text-gray-600">
              Pratinjau surat (A4)
            </div>
            <div id="surat-paper" ref={paperRef} className="surat">
              <SuratPaper templateId={templateId} data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}