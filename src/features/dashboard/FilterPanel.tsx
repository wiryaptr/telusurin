"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { MAX_SELECTED_REGIONS } from "@/domain/constants";
import { slotForIndex } from "@/features/dashboard/series";

interface FilterPanelProps {
  indicators: { code: string; name: string }[];
  availableYears: number[];
  regions: { code: string; name: string; kind: string }[];
  indicatorCode: string;
  year: number;
  regionCodes: string[];
  notification: string | null;
}

export function FilterPanel({
  indicators,
  availableYears,
  regions,
  indicatorCode,
  year,
  regionCodes,
  notification,
}: FilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<Set<string>>(
    new Set(regionCodes),
  );

  const handleIndicatorChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const code = event.target.value;
      const params = new URLSearchParams(searchParams.toString());
      params.set("i", code);
      params.delete("y");
      params.delete("r");
      router.replace(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const handleYearChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const y = Number(event.target.value);
      const params = new URLSearchParams(searchParams.toString());
      params.set("y", String(y));
      router.replace(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const handleRegionToggle = useCallback(
    (code: string, event: React.ChangeEvent<HTMLInputElement>) => {
      const next = new Set(selected);
      if (event.target.checked) {
        next.add(code);
      } else {
        next.delete(code);
      }

      if (next.size === 0) {
        return;
      }

      if (next.size > MAX_SELECTED_REGIONS) {
        return;
      }

      setSelected(next);

      const params = new URLSearchParams(searchParams.toString());
      params.set("r", [...next].join(","));
      router.replace(`?${params.toString()}`);
    },
    [selected, router, searchParams],
  );

  const disabledCodes = useMemo(() => {
    if (selected.size >= MAX_SELECTED_REGIONS) {
      return new Set(
        regions.map((item) => item.code).filter((code) => !selected.has(code)),
      );
    }
    return new Set<string>();
  }, [selected, regions]);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="indikator" className="text-sm font-medium text-ink">
          Indikator
        </label>
        <select
          id="indikator"
          value={indicatorCode}
          onChange={handleIndicatorChange}
          className="block w-full h-11 px-3 border border-border-control rounded-lg text-sm text-ink bg-white focus:ring-2 focus:ring-accent"
        >
          {indicators.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="tahun" className="text-sm font-medium text-ink">
          Tahun
        </label>
        <select
          id="tahun"
          value={String(year)}
          onChange={handleYearChange}
          className="block w-full h-11 px-3 border border-border-control rounded-lg text-sm text-ink bg-white focus:ring-2 focus:ring-accent"
        >
          {availableYears.map((item) => (
            <option key={item} value={String(item)}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="daerah"
          className="text-sm font-medium text-ink"
        >
          Daerah ({selected.size} dari {MAX_SELECTED_REGIONS})
        </label>
        <div
          id="daerah"
          role="group"
          aria-label="Pilih daerah yang dibandingkan"
          className="max-h-64 overflow-y-auto border border-border-control rounded-lg space-y-1 p-2 bg-white"
        >
          {regions.map((item, index) => {
            const isChecked = selected.has(item.code);
            const isDisabled = disabledCodes.has(item.code) && !isChecked;
            const slot = slotForIndex(index);
            return (
              <label
                key={item.code}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={(event) => handleRegionToggle(item.code, event)}
                  className="rounded border border-border-control text-accent focus:ring-accent"
                  aria-label={`Pilih ${item.name} (${item.kind})`}
                />
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 12 12"
                  fill="none"
                  className="shrink-0"
                >
                  {slot.marker === "circle" ? (
                    <circle cx={6} cy={6} r={3} fill={slot.color} stroke="#ffffff" strokeWidth={1.5} />
                  ) : slot.marker === "square" ? (
                    <rect x={3} y={3} width={6} height={6} fill={slot.color} stroke="#ffffff" strokeWidth={1.5} />
                  ) : slot.marker === "triangle" ? (
                    <polygon points="6,2 10,10 2,10" fill={slot.color} stroke="#ffffff" strokeWidth={1.5} />
                  ) : slot.marker === "diamond" ? (
                    <polygon points="6,2 10,6 6,10 2,6" fill={slot.color} stroke="#ffffff" strokeWidth={1.5} />
                  ) : (
                    <path d="M3,6 L9,6 M6,3 L6,9" stroke={slot.color} strokeWidth={2} strokeLinecap="round" />
                  )}
                </svg>
                <span className="text-sm text-ink">
                  {item.name}
                  {!item.name.toLowerCase().startsWith(item.kind) ? ` (${item.kind})` : ""}
                </span>
              </label>
            );
          })}
        </div>
        {selected.size >= MAX_SELECTED_REGIONS && (
          <p className="text-sm text-ink-muted">
            Batas {MAX_SELECTED_REGIONS} daerah tercapai. Hapus salah satu untuk menambah.
          </p>
        )}
      </div>

      {notification && (
        <div className="text-sm text-ink-muted">
          {notification}
        </div>
      )}
    </section>
  );
}
