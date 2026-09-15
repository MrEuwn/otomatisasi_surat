import type { SuratData } from "../lib/types";
import { TEMPLATES, type TemplateId } from "../lib/templates";
import { formatTanggalIndo } from "../lib/format";
import KopSurat from "./KopSurat";

const BLANK = "\u00A0".repeat(9); // ruang kosong nomor surat (diisi TU)

function NomorPerihal({ templateId, data }: { templateId: TemplateId; data: SuratData }) {
  const t = TEMPLATES[templateId];
  const tahun = data.tanggal ? data.tanggal.slice(0, 4) : String(new Date().getFullYear());
  return (
    <div className="mt-6 flex justify-between items-start">
      <div>
        <div className="flex">
          <span className="w-[22mm]">Nomor</span>
          <span>:&nbsp;&nbsp;{BLANK}/UN63.4/{t.kode}/{tahun}</span>
        </div>
        <div className="flex">
          <span className="w-[22mm]">Perihal</span>
          <span>:&nbsp;&nbsp;{t.perihal}</span>
        </div>
      </div>
      <div>Surabaya, {formatTanggalIndo(data.tanggal)}</div>
    </div>
  );
}

function YthBlock({ data }: { data: SuratData }) {
  return (
    <div className="mt-5 flex">
      <span className="shrink-0 w-[13mm]">Yth.</span>
      <div>
        <div>{data.ythJabatan}</div>
        {data.ythInstansi && <div>{data.ythInstansi}</div>}
        {data.ythAlamat.split("\n").filter(Boolean).map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}

function TabelMahasiswa({ data }: { data: SuratData }) {
  return (
    <table className="my-4 w-full table-fixed text-center">
      <thead>
        <tr>
          <th className="w-[8%]">No.</th>
          <th className="w-[46%]">Nama</th>
          <th className="w-[22%]">NPM</th>
          <th className="w-[24%]">Program Studi</th>
        </tr>
      </thead>
      <tbody>
        {data.mahasiswa.map((m, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td className="whitespace-nowrap overflow-hidden text-left px-2">{m.nama}</td>
            <td>{m.npm}</td>
            <td>{m.prodi}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DataPenelitian({ data }: { data: SuratData }) {
  const style = { gridTemplateColumns: "40mm 6mm auto" };
  return (
    <div className="my-4">
      {data.mahasiswa.map((m, i) => (
        <div key={i} className="grid mb-3" style={style}>
          <span>Nama</span><span>:</span><span>{m.nama}</span>
          <span>NPM</span><span>:</span><span>{m.npm}</span>
          <span>Program Studi</span><span>:</span><span>{m.prodi}</span>
        </div>
      ))}
      <div className="grid" style={style}>
        <span>Lokasi Penelitian</span><span>:</span><span>{data.lokasiPenelitian}</span>
        <span className="self-start">Judul Penelitian</span>
        <span className="self-start uppercase break-words">{data.judulPenelitian}</span>
      </div>
    </div>
  );
}

function TandaTangan() {
  return (
    <div className="ttd-block mt-10" style={{ marginLeft: "55%", lineHeight: 1 }}>
      <div>A.n. Dekan</div>
      <div>Wakil Dekan I,</div>
      <div className="h-[26mm]" />
      <div>Dr. Yuli Candrasari, M.Si.</div>
      <div>NIP 197107302021212003</div>
    </div>
  );
}

interface Props {
  templateId: TemplateId;
  data: SuratData;
}

export default function SuratPaper({ templateId, data }: Props) {
  return (
    <>
      <KopSurat />
      <NomorPerihal templateId={templateId} data={data} />
      <YthBlock data={data} />

      {templateId === "tugas-kuliah" && (
        <>
          <p className="mt-5">
            Dalam rangka tugas mata kuliah {data.mataKuliah} Fakultas Ilmu Sosial, Budaya dan Politik
            Universitas Pembangunan Nasional "Veteran" Jawa Timur diperlukan {data.kegiatan} terkait{" "}
            {data.aspek} untuk menyelesaikan tugas mata kuliah tersebut.
          </p>
          <p className="mt-4">
            Sehubungan dengan perihal tersebut diatas, dengan ini mohon dapatnya diberikan izin kepada
            mahasiswa kami yang bernama :
          </p>
          <TabelMahasiswa data={data} />
          <p>
            Untuk mendapatkan keterangan, informasi dan perizinan pelaksanaan{" "}
            {data.kegiatan.toLowerCase()} sesuai yang dibutuhkan.
          </p>
          <p className="mt-4">Demikian, atas perhatian dan kerja samanya kami sampaikan terima kasih.</p>
        </>
      )}

      {templateId === "magang" && (
        <>
          {/* Poin bernomor: kolom nomor 9mm ≈ nomor + 5 spasi,
              baris lanjutan otomatis lurus sejajar awal teks */}
          <div className="mt-5 flex">
            <span className="w-[9mm] shrink-0">1.</span>
            <p className="flex-1">
              Berdasarkan Buku Pedoman Kurikulum Fakultas Ilmu Sosial, Budaya, dan
              Politik UPN "Veteran" Jawa Timur setiap mahasiswa semester V wajib
              melaksanakan Program Praktek Magang.
            </p>
          </div>

          <div className="mt-4 flex">
            <span className="w-[9mm] shrink-0">2.</span>
            <p className="flex-1">Praktek magang dilaksanakan dengan tujuan :</p>
          </div>
          <div className="flex pl-[9mm]">
            <span className="w-[6mm] shrink-0">a.</span>
            <p className="flex-1">
              Mahasiswa dapat menerapkan dan membandingkan teori dengan kenyataan
              di lapangan.
            </p>
          </div>
          <div className="flex pl-[9mm]">
            <span className="w-[6mm] shrink-0">b.</span>
            <p className="flex-1">
              Sebagai dasar penyusunan skripsi dan pengalaman bekerja.
            </p>
          </div>

          <div className="mt-4 flex">
            <span className="w-[9mm] shrink-0">3.</span>
            <p className="flex-1">
              Sehubungan dengan perihal tersebut diatas, mohon dapatnya diberikan
              ijin kepada mahasiswa kami :
            </p>
          </div>
          <TabelMahasiswa data={data} />
          <p>
            Untuk melaksanakan Praktek Magang di Perusahaan / Instansi Bapak/Ibu
            dengan jangka waktu {data.durasiMagang}.
          </p>

          <div className="mt-4 flex">
            <span className="w-[9mm] shrink-0">4.</span>
            <p className="flex-1">
              Demikian atas perhatian dan kerjasamanya kami sampaikan terima kasih.
            </p>
          </div>
        </>
      )}

      {templateId === "penelitian" && (
        <>
          <p className="mt-5">
            Dalam rangka penyusunan Skripsi sebagai tugas akhir mahasiswa Fakultas Ilmu
            Sosial, Budaya dan Politik Universitas Pembangunan Nasional "Veteran" Jawa Timur,
            diperlukan penelitian.
          </p>
          <p className="mt-4">
            Sehubungan dengan perihal tersebut diatas, dengan ini mohon dapatnya diberikan
            izin kepada mahasiswa kami :
          </p>
          <DataPenelitian data={data} />
          <p>Untuk melaksanakan penelitian guna memperoleh data data yang diperlukan.</p>
          <p className="mt-4">Demikian atas perhatian dan kerja samanya kami sampaikan terima kasih.</p>
        </>
      )}

      <TandaTangan />
    </>
  );
}