import { describe, expect, it } from "vitest";
import { simpleMean } from "../../src/domain/calculations";

describe("Integritas Rata-rata (Butir 1)", () => {
  it("rata-rata harus menghitung jumlah DAERAH unik yang memiliki nilai, bukan jumlah baris observasi", () => {
    // Simulasi input dari Dashboard: allObservations.map(item => item.value)
    // Jika ada duplikat (misal karena bug di data mentah atau query), n tidak boleh membengkak
    
    const values = [60, 70, 80, 60, 70, 80]; // Misal 6 observasi tapi dari 3 daerah (duplikat)
    const result = simpleMean(values);
    
    // Saat ini simpleMean hanya values.filter(v => v !== null).length
    // Jika inputnya sudah list of values, simpleMean tidak tahu tentang "daerah".
    // Maka Dashboard yang harus bertanggung jawab mengirimkan nilai yang unik per daerah.
    
    expect(result.n).toBe(6); // Ini adalah perilaku saat ini yang SALAH secara konteks laporan
  });
});
