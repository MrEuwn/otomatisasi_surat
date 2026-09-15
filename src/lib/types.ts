import { todayISO } from "./format";

export interface Mahasiswa {
  nama: string;
  npm: string;
  prodi: string;
}

export interface SuratData {
  tanggal: string;
  ythJabatan: string;
  ythInstansi: string;
  ythAlamat: string;
  mataKuliah: string;
  kegiatan: string;
  aspek: string;
  durasiMagang: string;
  lokasiPenelitian: string;
  judulPenelitian: string;
  mahasiswa: Mahasiswa[];
}

export function emptySurat(): SuratData {
  return {
    tanggal: todayISO(),
    ythJabatan: "",
    ythInstansi: "",
    ythAlamat: "",
    mataKuliah: "",
    kegiatan: "Wawancara, Observasi",
    aspek: "",
    durasiMagang: "minimal 1 (satu) bulan",
    lokasiPenelitian: "",
    judulPenelitian: "",
    mahasiswa: [{ nama: "", npm: "", prodi: "" }],
  };
}