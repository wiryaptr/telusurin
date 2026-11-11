export function PageSkeleton() {
  return (
    <div className="min-h-[85vh] px-4 py-16 sm:px-6" aria-busy="true">
        <div className="mx-auto max-w-[1120px] animate-pulse">
          <div className="h-8 w-56 rounded-lg bg-ink/10" />
          <div className="mt-6 h-4 w-80 max-w-full rounded bg-ink/10" />
          <div className="mt-8 h-44 w-full rounded-xl bg-ink/10" />
        </div>
        <span className="sr-only">Memuat halaman</span>
    </div>
  );
}
