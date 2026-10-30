"use client";

import type { Observation } from "@/domain/schemas";
import { slotForIndex } from "@/features/dashboard/series";

interface TrendChartProps {
  regions: { code: string; name: string }[];
  regionCodes: string[];
  years: number[];
  observations: Observation[];
  unit: string;
  indicatorName: string;
  decimals: number;
}

function regionObservations(
  observations: Observation[],
  regionCode: string,
): Record<number, number | null> {
  const map: Record<number, number | null> = {};
  for (const observation of observations) {
    if (observation.regionCode === regionCode) {
      map[observation.year] = observation.value;
    }
  }
  return map;
}

export function TrendChart({
  regions,
  regionCodes,
  years,
  observations,
  unit,
  indicatorName,
  decimals,
}: TrendChartProps) {
  if (years.length === 0 || regionCodes.length === 0) {
    return null;
  }

  const width = 700;
  const height = 300;
  const margin = { top: 60, right: 160, bottom: 40, left: 60 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const allValues: number[] = [];
  for (const regionCode of regionCodes) {
    const byYear = regionObservations(observations, regionCode);
    for (const year of years) {
      const value = byYear[year];
      if (value !== null) {
        allValues.push(value);
      }
    }
  }

  const minValue = allValues.length ? Math.min(...allValues) : 0;
  const maxValue = allValues.length ? Math.max(...allValues) : 1;
  const range = maxValue - minValue || 1;
  const yMin = minValue - range * 0.1;
  const yMax = maxValue + range * 0.1;

  const xScale = (year: number) => {
    const index = years.indexOf(year);
    return margin.left + (index / (years.length - 1 || 1)) * plotWidth;
  };

  const yScale = (value: number) => {
    return margin.top + plotHeight - ((value - yMin) / (yMax - yMin)) * plotHeight;
  };

  const formatValue = (value: number) => value.toLocaleString("id-ID", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <section className="space-y-4">
      <div className="bg-white p-6 rounded-2xl border border-rule shadow-sm">
        <h3 className="text-xl font-bold text-ink mb-6">
          Tren {indicatorName} per tahun
        </h3>
        <div className="relative w-full overflow-x-auto">
          <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-labelledby="trend-title"
            className="block mx-auto"
          >
            <title id="trend-title">{`Grafik tren ${indicatorName} per tahun`}</title>

            {/* Sumbu X */}
            {years.map((year) => {
              const x = xScale(year);
              return (
                <g key={year} transform={`translate(${x},${margin.top + plotHeight + 6})`}>
                  <line x1={0} y1={0} x2={0} y2={4} stroke="#d9d4c7" strokeWidth={1} />
                  <text x={0} y={16} textAnchor="middle" fill="#4a5058" fontSize={11}>{year}</text>
                </g>
              );
            })}

            {/* Sumbu Y */}
            {Array.from({ length: 5 }).map((_, i) => {
              const value = yMin + (i / 4) * (yMax - yMin);
              const y = yScale(value);
              return (
                <g key={i}>
                  <line x1={margin.left - 4} y1={y} x2={margin.left} y2={y} stroke="#d9d4c7" strokeWidth={1} />
                  <text x={margin.left - 8} y={y + 4} textAnchor="end" fill="#4a5058" fontSize={11}>{formatValue(value)}</text>
                </g>
              );
            })}

            {/* Unit Label */}
            <text x={margin.left} y={margin.top - 12} textAnchor="start" fill="#4a5058" fontSize={11} fontWeight={600}>{unit}</text>

            {/* Garis per daerah */}
            {regionCodes.map((regionCode, slotIndex) => {
              const region = regions.find((item) => item.code === regionCode);
              const slot = slotForIndex(slotIndex);
              const byYear = regionObservations(observations, regionCode);

              const points: string[] = [];
              let lastPoint: { x: number; y: number } | null = null;
              let hasData = false;

              for (const year of years) {
                const value = byYear[year];
                if (value === null) {
                  lastPoint = null;
                  continue;
                }
                hasData = true;
                const x = xScale(year);
                const y = yScale(value);
                points.push(`${x},${y}`);
                lastPoint = { x, y };
              }

              if (!hasData || !lastPoint) return null;

              return (
                <g key={regionCode}>
                  <polyline
                    points={points.join(" ")}
                    fill="none"
                    stroke={slot.color}
                    strokeWidth={2}
                    strokeDasharray={slot.lineDash === "solid" ? undefined : slot.lineDash}
                  />
                  {years.map((year) => {
                    const value = byYear[year];
                    if (value === null) return null;
                    const x = xScale(year);
                    const y = yScale(value);
                    const marker = slot.marker === "circle" ? (
                      <circle cx={0} cy={0} r={4} fill={slot.color} stroke="#ffffff" strokeWidth={1.5} />
                    ) : slot.marker === "square" ? (
                      <rect x={-4} y={-4} width={8} height={8} fill={slot.color} stroke="#ffffff" strokeWidth={1.5} />
                    ) : slot.marker === "triangle" ? (
                      <polygon points="0,-5 5,5 -5,5" fill={slot.color} stroke="#ffffff" strokeWidth={1.5} />
                    ) : slot.marker === "diamond" ? (
                      <polygon points="0,-5 5,0 0,5 -5,0" fill={slot.color} stroke="#ffffff" strokeWidth={1.5} />
                    ) : (
                      <path d="M-4,0 L4,0 M0,-4 L0,4" stroke={slot.color} strokeWidth={2} strokeLinecap="round" />
                    );
                    return <g key={year} transform={`translate(${x},${y})`}>{marker}</g>;
                  })}
                  {lastPoint && region && (
                    <text x={lastPoint.x + 10} y={lastPoint.y + 4} fill={slot.color} fontSize={11} fontWeight={700}>{region.name}</text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        <p className="mt-6 text-sm text-ink-muted">
          Cara membaca: Setiap garis adalah satu daerah. Titik yang hilang berarti data tidak tersedia.
        </p>
      </div>
    </section>
  );
}
