import type { NullReason } from "../domain/schemas";

const NULL_LABELS: Record<NullReason, string> = {
  belum_dilaporkan: "Belum dilaporkan",
  tidak_tersedia: "Belum tersedia",
};

export function nullLabel(nullReason?: NullReason): string {
  if (!nullReason) {
    return "Belum tersedia";
  }
  return NULL_LABELS[nullReason];
}

export function formatNumber(value: number, decimals: number): string {
  const rounded = Number(value.toFixed(decimals));
  return rounded.toLocaleString("id-ID", { maximumFractionDigits: decimals });
}

export function formatValue(value: number | null, decimals: number, nullReason?: NullReason): string {
  if (value === null) {
    return nullLabel(nullReason);
  }
  return formatNumber(value, decimals);
}
