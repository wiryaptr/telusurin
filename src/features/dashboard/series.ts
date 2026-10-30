export const SERIES_SLOTS = [
  {
    slot: 1,
    color: "#0072B2",
    lineDash: "solid",
    marker: "circle",
  },
  {
    slot: 2,
    color: "#C2500A",
    lineDash: "6 4",
    marker: "square",
  },
  {
    slot: 3,
    color: "#007A5C",
    lineDash: "1 4",
    marker: "triangle",
  },
  {
    slot: 4,
    color: "#A33C78",
    lineDash: "8 3 1 3",
    marker: "diamond",
  },
  {
    slot: 5,
    color: "#6B5B00",
    lineDash: "12 4",
    marker: "cross",
  },
] as const;

export type SeriesSlot = (typeof SERIES_SLOTS)[number];

export function slotForIndex(index: number): SeriesSlot {
  return SERIES_SLOTS[index % SERIES_SLOTS.length];
}
