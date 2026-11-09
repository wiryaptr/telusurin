"use client";

import type { Insight } from "@/domain/insights";
import type { Source } from "@/domain/schemas";

interface InsightListProps {
  insights: Insight[];
  sources: Source[];
  decimals: number;
}

export function InsightList({ insights, sources }: InsightListProps) {
  if (!insights.length) return null;

  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl border border-rule shadow-sm space-y-4 animate-fade-in-up">
      <h2 className="font-sans text-xl font-bold text-ink">Insight otomatis</h2>
      <p className="text-sm text-ink-muted">
        Insight dibangun dari aturan deterministik, hanya memproses observasi berstatus <code>resmi</code>.
        Setiap insight menyertakan bukti perhitungan (formula, nilai, keterbatasan).
      </p>
      <div className="space-y-3">
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} sources={sources} />
        ))}
      </div>
    </section>
  );
}

function InsightCard({ insight, sources }: { insight: Insight; sources: Source[] }) {
  const e = insight.evidence;
  const source = sources.find((s) => e.sourceIds.includes(s.id)) ?? sources[0];
  return (
    <details className="group border border-rule/50 rounded-xl p-4 bg-white transition hover:border-rule">
      <summary className="flex items-start gap-3 cursor-pointer list-none">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-ink leading-relaxed">{insight.text}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-ink-muted">
            <span>Rule: <code className="bg-ink/5 px-1 rounded">{e.ruleId}</code></span>
            <span>Sumber: <span className="underline decoration-dotted underline-offset-1">{source?.name ?? "-"}</span></span>
          </div>
        </div>
        <svg
          className="w-5 h-5 shrink-0 text-ink-muted group-open:rotate-180 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="mt-4 space-y-3 text-xs text-ink-muted border-t border-rule/30 pt-4">
        <div className="space-y-1">
          <p className="font-medium text-ink">Bukti perhitungan</p>
          <p><strong>Formula:</strong> {e.formula}</p>
          <p><strong>Makna:</strong> {e.meaning}</p>
          <p><strong>Keterbatasan:</strong> {e.limitation}</p>
          {e.n !== undefined && <p><strong>Jumlah data (n):</strong> {e.n}</p>}
          {e.reason && <p className="text-accent"><strong>Catatan:</strong> {e.reason}</p>}
        </div>
        <details className="border-t border-rule/30 pt-3">
          <summary className="cursor-pointer text-accent hover:underline">Lihat nilai mentah</summary>
          <pre className="mt-2 p-3 bg-ink/[0.03] rounded text-[10px] overflow-x-auto">
            {JSON.stringify(
              {
                indicatorCode: e.indicatorCode,
                unit: e.unit,
                years: e.years,
                regionCodes: e.regionCodes,
                values: e.values,
              },
              null,
              2,
            )}
          </pre>
        </details>
      </div>
    </details>
  );
}