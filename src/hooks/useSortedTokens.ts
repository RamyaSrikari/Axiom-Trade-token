import { useMemo } from "react";
import { Token } from "@/lib/types";
import { useAppSelector } from "@/state/hooks";

export function useSortedTokens(tokens: Token[] | undefined) {
  const { activeCategory, sortColumn, sortDirection } = useAppSelector((s) => s.ui);

  return useMemo(() => {
    if (!tokens) return [] as Token[];
    const filtered = tokens.filter((t) => t.category === activeCategory);

    const sorted = [...filtered].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });

    return sorted;
  }, [tokens, activeCategory, sortColumn, sortDirection]);
}
