import type { Mahasiswa } from "../lib/types";

export const PRODI_LIST = [
  "Adm. Publik",
  "Adm. Bisnis",
  "Ilmu Komunikasi",
  "Hub. Internasional",
  "Pariwisata",
  "Linguistik",
  "Bispro",
];

const inputCls =
  "mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

interface Props {
  value: Mahasiswa[];
  onChange: (m: Mahasiswa[]) => void;
}

export default function MahasiswaRows({ value, onChange }: Props) {
  const update = (i: number, patch: Partial<Mahasiswa>) =>
    onChange(value.map((m, idx) => (idx === i ? { ...m, ...patch } : m)));
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));
  const add = () => onChange([...value, { nama: "", npm: "", prodi: "" }]);

  return (
    <div className="space-y-3">
      {value.map((m, i) => (
        <div key={i} className="relative rounded-lg border border-gray-200 bg-gray-50 p-3">
          {value.length > 1 && (
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute right-2 top-2 text-xs font-medium text-red-500 hover:text-red-700"
            >
              Hapus
            </button>
          )}
          <div className="mb-2 text-xs font-semibold text-gray-500">Mahasiswa {i + 1}</div>
<label className="block">
  <span className="text-sm font-medium text-gray-700">Nama lengkap</span>
  <input
    className={inputCls}
    placeholder="Nama lengkap"
    maxLength={32}
    value={m.nama}
    onChange={(e) => update(i, { nama: e.target.value })}
  />
  <span className="mt-0.5 block text-xs text-gray-400">
    {m.nama.length}/32 karakter
  </span>
</label>
          <input className={inputCls} placeholder="NPM" inputMode="numeric" value={m.npm}
            onChange={(e) => update(i, { npm: e.target.value })} />
          <select className={inputCls} value={m.prodi}
            onChange={(e) => update(i, { prodi: e.target.value })}>
            <option value="" disabled>Pilih Program Studi</option>
            {PRODI_LIST.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      ))}
      <button type="button" onClick={add}
        className="w-full rounded-lg border-2 border-dashed border-gray-300 py-2 text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600">
        + Tambah mahasiswa
      </button>
    </div>
  );
}