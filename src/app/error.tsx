"use client";

export default function Error() {
  return (
    <main className="mx-auto w-full max-w-[var(--container)] flex-1 px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-serif font-semibold text-ink">Terjadi kesalahan</h1>
      <p className="mt-4 text-lg text-ink">Data tidak dapat dimuat. Coba lagi nanti.</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-8 inline-flex items-center gap-2 border border-accent bg-transparent text-accent text-sm font-medium rounded px-4 py-2 hover:bg-accent hover:text-on-accent transition-colors"
      >
        Muat ulang
      </button>
    </main>
  );
}
