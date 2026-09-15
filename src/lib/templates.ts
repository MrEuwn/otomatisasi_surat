export type TemplateId = "tugas-kuliah" | "magang" | "penelitian";

export interface TemplateInfo {
  label: string;
  short: string;   // untuk nama file
  icon: string;
  kode: string;    // kode surat resmi
  perihal: string;
  desc: string;
}

export const TEMPLATES: Record<TemplateId, TemplateInfo> = {
  "tugas-kuliah": {
    label: "Surat Pengantar Tugas Mata Kuliah",
    short: "Pengantar-Tugas-Kuliah",
    icon: "📘",
    kode: "PEL.01.02",
    perihal: "Pengantar Tugas Mata Kuliah",
    desc: "Wawancara / observasi dalam rangka tugas mata kuliah.",
  },
  magang: {
    label: "Surat Program Magang Mahasiswa",
    short: "Magang",
    icon: "💼",
    kode: "PEL.01.05",
    perihal: "Program Magang Mahasiswa",
    desc: "Pengantar magang ke perusahaan / instansi.",
  },
  penelitian: {
    label: "Surat Izin Penelitian Skripsi",
    short: "Izin-Penelitian",
    icon: "🔬",
    kode: "PEL.03.08",
    perihal: "Ijin Penelitian Skripsi",
    desc: "Izin penelitian skripsi, bisa lebih dari satu mahasiswa.",
  },
};