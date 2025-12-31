import { SortDirection } from "./types";

const numberFormatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

export const compactNumber = (value: number) => {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);
};

export const formatCurrency = (value: number) => currencyFormatter.format(value);

export const formatNumber = (value: number, maximumFractionDigits = 2) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);

export const formatPercent = (value: number) => {
  const formatted = numberFormatter.format(value);
  return `${value >= 0 ? "+" : ""}${formatted}%`;
};

export const formatDirection = (dir: SortDirection) => (dir === "asc" ? "Ascending" : "Descending");
