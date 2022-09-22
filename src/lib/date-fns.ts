import dayjs, { Dayjs } from "../packages/dayjs";

// converts a date to 2022-04-25 for example.
export const yyyymmdd = (date: Date | Dayjs) =>
  date instanceof Date ? dayjs(date).format("YYYY-MM-DD") : date.format("YYYY-MM-DD");

export const daysInMonth = (date: Date | Dayjs) =>
  date instanceof Date ? dayjs(date).daysInMonth() : date.daysInMonth();
