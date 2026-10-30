import Link from "next/link";
import { resolveDatasetDir, getSources } from "@/server/data/DataRepository";

export async function SiteFooter() {
  const sources = await getSources(resolveDatasetDir());
  const source = sources[0];

  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-2">
            <h4 className="text-lg font-bold mb-6 text-white">Telusurin</h4>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              Bandingkan indikator layanan publik antardaerah dengan sumber dan batas data yang jelas.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/50">Navigasi</h4>
            <ul className="space-y-4">
              <li><Link href="/dashboard" className="text-sm text-white/80 hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/metodologi" className="text-sm text-white/80 hover:text-white transition-colors">Metodologi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-white/50">Sumber Data</h4>
            <ul className="space-y-4">
              <li><a href={source?.url ?? "#"} target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">{source?.name ?? "-"}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-white/40">
          <p>Telusurin bukan produk BPS dan tidak didukung BPS.</p>
          <p className="mt-2">© 2026 Tim Telusurin.</p>
        </div>
      </div>
    </footer>
  );
}
