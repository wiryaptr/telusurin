import type { DataStatus } from "@/domain/schemas";

export interface StatusInfo {
  label: string;
  colorClass: string;
  bgClass: string;
  iconLabel: string;
  sign: string;
}

export const STATUS_MAP: Record<DataStatus, StatusInfo> = {
  resmi: {
    label: "Resmi",
    colorClass: "text-status-resmi-fg",
    bgClass: "bg-status-resmi-bg",
    iconLabel: "Terverifikasi",
    sign: "",
  },
  belum_terverifikasi: {
    label: "Belum terverifikasi",
    colorClass: "text-status-belum-fg",
    bgClass: "bg-status-belum-bg",
    iconLabel: "Peringatan",
    sign: "†",
  },
  contoh: {
    label: "Contoh",
    colorClass: "text-status-contoh-fg",
    bgClass: "bg-status-contoh-bg",
    iconLabel: "Simulasi",
    sign: "‡",
  },
};

export function getStatusInfo(status: DataStatus): StatusInfo {
  return STATUS_MAP[status] ?? STATUS_MAP.belum_terverifikasi;
}
