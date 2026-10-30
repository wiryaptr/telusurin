"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-[var(--container)] flex-1 px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-serif font-semibold text-ink">Halaman tidak ditemukan</h1>
      <p className="mt-4 text-lg text-ink">Halaman yang Anda cari tidak tersedia.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 border border-accent bg-transparent text-accent text-sm font-medium rounded px-4 py-2 hover:bg-accent hover:text-on-accent transition-colors"
      >
        Kembali ke beranda
      </Link>
    </main>
  );
}
