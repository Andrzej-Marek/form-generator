export const DATE_FORMATS = ["dd/MM/yyyy", "yyyy/MM/dd"] as const;

export type DateFormat = typeof DATE_FORMATS[number];
