import { z } from "zod";

export const DataStatusSchema = z.enum(["resmi", "belum_terverifikasi", "contoh"]);

export const FieldIdSchema = z.enum(["pendidikan", "kesehatan", "infrastruktur_dasar"]);

export const ValueKindSchema = z.enum(["percent", "years", "ratio", "count"]);

export const NullReasonSchema = z.enum(["belum_dilaporkan", "tidak_tersedia"]);

export const RegionSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  kind: z.enum(["kabupaten", "kota"]),
});

export const SourceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  publisher: z.string().min(1),
  url: z.string().url().refine((u) => u.startsWith("https://"), "wajib https"),
  retrievedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  termsStatus: z.enum(["diperiksa", "belum_diperiksa"]),
  termsNote: z.string(),
  citation: z.string().min(1),
});

export const IndicatorSchema = z.object({
  code: z.string().regex(/^[a-z0-9_]+$/),
  name: z.string().min(1),
  field: FieldIdSchema,
  valueKind: ValueKindSchema,
  unit: z.string().min(1),
  unitShort: z.string(),
  decimals: z.number().int().min(0).max(3),
  definition: z.string().min(1),
  sourceIds: z.array(z.string()).min(1),
  transformNote: z.string().optional(),
});

export const ObservationSchema = z.object({
  regionCode: z.string(),
  indicatorCode: z.string(),
  year: z.number().int().min(1990).max(2100),
  value: z.number().nullable(),
  nullReason: NullReasonSchema.optional(),
  status: DataStatusSchema,
  sourceId: z.string(),
});

export const DatasetMetaSchema = z.object({
  id: z.string(),
  version: z.string(),
  title: z.string(),
  province: z.object({ code: z.string(), name: z.string() }),
  regionCodeSystem: z.string(),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  years: z.object({ from: z.number().int(), to: z.number().int() }),
  sources: z.array(SourceSchema).min(1),
  limitations: z.array(z.string()).min(1),
  changelog: z
    .array(
      z.object({
        version: z.string(),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
        change: z.string(),
      }),
    )
    .min(1),
});

export const DashboardQuerySchema = z.object({
  i: z.string().regex(/^[a-z0-9_]+$/).optional(),
  y: z.coerce.number().int().optional(),
  r: z.string().optional(),
});

export type DataStatus = z.infer<typeof DataStatusSchema>;
export type FieldId = z.infer<typeof FieldIdSchema>;
export type ValueKind = z.infer<typeof ValueKindSchema>;
export type NullReason = z.infer<typeof NullReasonSchema>;
export type Region = z.infer<typeof RegionSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type Indicator = z.infer<typeof IndicatorSchema>;
export type Observation = z.infer<typeof ObservationSchema>;
export type DatasetMeta = z.infer<typeof DatasetMetaSchema>;
export type DashboardQuery = z.infer<typeof DashboardQuerySchema>;
