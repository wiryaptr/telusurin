"use client";

import type { Observation, NullReason } from "@/domain/schemas";
import { nullLabel, formatNumber } from "@/lib/format";
import { slotForIndex } from "@/features/dashboard/series";

interface ComparisonChartProps {
  regions: { code: string; name: string }[];
  regionCodes: string[];
  year: number;
  observations: Observation[];
  allRegionsMean: number | null;
  allRegionsMeanN: number;
  unitShort: string;
  indicatorName: string;
}

function formatValue(value: number | null, nullReason?: NullReason): string {
  if (value === null) {
    return nullLabel(nullReason);
  }
  return formatNumber(value, 2);
}

export function ComparisonChart({
  regions,
  regionCodes,
  year,
  observations,
  allRegionsMean,
  allRegionsMeanN,
  unitShort,
  indicatorName,
}: ComparisonChartProps) {
  if (regionCodes.length === 0) {
    return (
      <section className="bg-white p-6 rounded-2xl border border-rule shadow-sm">
        <h3 className="text-xl font-bold text-ink mb-6">{indicatorName}</h3>
        <p className="text-sm text-ink-muted">Tidak ada data untuk pilihan yang sedang ditampilkan.</p>
      </section>
    );
  }

  const width = 700;
  const barHeight = 24;
  const gap = 16;
  const margin = { top: 44, right: 120, bottom: 12, left: 180 };
  const height = margin.top + margin.bottom + regionCodes.length * (barHeight + gap);
  const plotWidth = width - margin.left - margin.right;

  const items = regionCodes.map((code) => {
    const region = regions.find((item) => item.code === code);
    const observation = observations.find(
      (item) => item.regionCode === code && item.year === year,
    );
    return {
      code,
      name: region?.name ?? code,
      value: observation?.value ?? null,
      nullReason: observation?.nullReason,
      status: observation?.status,
    };
  });

  const validItems = items.filter((item) => item.value !== null);
  const maxValue = validItems.length > 0 ? Math.max(...validItems.map((item) => item.value as number)) : 0;
  const xMax = Math.max(maxValue, allRegionsMean ?? 0) * 1.2 || 100;

  const xScale = (value: number) => margin.left + (value / xMax) * plotWidth;

  return (
    <section className="space-y-4">
      <div className="bg-white p-6 rounded-2xl border border-rule shadow-sm">
        <h3 className="mb-1 text-2xl font-bold text-ink">{indicatorName}</h3>
        <p className="mb-4 text-sm text-ink-muted">Tahun {year} • Satuan: {unitShort}</p>
        
        <div className="relative overflow-x-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-labelledby="comparison-title"
            className="block h-auto w-full min-w-[560px]"
          >
            <title id="comparison-title">{`Perbandingan ${indicatorName} tahun ${year}`}</title>

            {allRegionsMean !== null && (
              <g>
                <line
                  x1={xScale(allRegionsMean)}
                  y1={margin.top - 10}
                  x2={xScale(allRegionsMean)}
                  y2={height - margin.bottom}
                  stroke="#4a5058"
                  strokeWidth={1.5}
                  strokeDasharray="4 2"
                />
                <text
                  x={xScale(allRegionsMean)}
                  y={margin.top - 20}
                  textAnchor="middle"
                  fill="#4a5058"
                  fontSize={10}
                  fontWeight={700}
                >
                  RATA-RATA ({allRegionsMeanN} DAERAH)
                </text>
              </g>
            )}

            {items.map((item, index) => {
              const slot = slotForIndex(index);
              const y = margin.top + index * (barHeight + gap);
              const barWidth = item.value !== null ? (item.value / xMax) * plotWidth : 0;

              return (
                <g key={item.code}>
                  <text x={margin.left - 12} y={y + barHeight/2 + 4} textAnchor="end" fill="#1b1f23" fontSize={11} fontWeight={600}>
                    {item.name}
                  </text>
                  {item.value !== null ? (
                    <rect x={margin.left} y={y} width={barWidth} height={barHeight} fill={slot.color} rx={4} />
                  ) : null}
                  <text x={margin.left + barWidth + 8} y={y + barHeight/2 + 4} fill="#1b1f23" fontSize={11} fontWeight={700} stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
                    {formatValue(item.value, item.nullReason)} {item.status === "contoh" ? "‡" : ""}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="mt-6 text-sm text-ink-muted">
          Cara membaca: Batang yang lebih panjang berarti nilai yang lebih besar. {statusLabelInfo(items)}
        </p>
      </div>
    </section>
  );
}

function statusLabelInfo(items: { status?: string }[]) {
  const hasContoh = items.some(i => i.status === "contoh");
  return hasContoh ? "Simbol ‡ menandakan data contoh." : "";
}