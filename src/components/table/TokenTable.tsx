"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, ArrowDownUp, RefreshCcw, Shield } from "lucide-react";
import clsx from "clsx";
import { fetchTokens } from "@/services/tokenData";
import { tokenKeys } from "@/lib/queryKeys";
import { useLiveTokenUpdates } from "@/hooks/useLiveTokenUpdates";
import { useSortedTokens } from "@/hooks/useSortedTokens";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setSort } from "@/state/uiSlice";
import { SortColumn } from "@/lib/types";
import { TokenRow } from "./TokenRow";
import { TableSkeleton } from "@/components/loading/TableSkeleton";
import { Tooltip } from "@/components/ui/Tooltip";

const columns: { key: SortColumn; label: string; tooltip: string; align?: string; hideOn?: string }[] = [
  { key: "price", label: "Price", tooltip: "Last traded price" },
  { key: "change5m", label: "5m", tooltip: "Change over last 5 minutes" },
  { key: "change1h", label: "1h", tooltip: "Change over last hour", hideOn: "hidden lg:flex" },
  { key: "change24h", label: "24h", tooltip: "Change over last day", hideOn: "hidden md:flex" },
  { key: "liquidity", label: "Liquidity", tooltip: "Current pooled liquidity" },
  { key: "volume24h", label: "Volume", tooltip: "24h traded volume" },
  { key: "fdv", label: "FDV", tooltip: "Fully diluted valuation", hideOn: "hidden md:flex" },
  { key: "txs", label: "Txs", tooltip: "Recent transaction count" },
];

export function TokenTable() {
  const dispatch = useAppDispatch();
  const { sortColumn, sortDirection } = useAppSelector((s) => s.ui);
  const { data, isLoading, error, refetch } = useQuery({ queryKey: tokenKeys.all, queryFn: fetchTokens });
  const sortedTokens = useSortedTokens(data);
  const [visible, setVisible] = useState(0);

  useLiveTokenUpdates(data);

  useEffect(() => {
    if (!sortedTokens?.length) return;
    const length = sortedTokens.length;

    const tick = () =>
      setVisible((prev) => {
        const baseline = prev === 0 ? Math.min(6, length) : prev;
        if (baseline >= length) return baseline;
        return Math.min(length, baseline + 3);
      });

    const id = setInterval(tick, 600);
    tick();
    return () => clearInterval(id);
  }, [sortedTokens?.length]);

  const content = (() => {
    if (isLoading) return <TableSkeleton rows={8} />;
    if (error) {
      return (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-rose-900/60 bg-rose-950/40 p-6 text-sm text-rose-200">
          <div className="flex items-center gap-2 text-rose-200">
            <AlertCircle className="h-4 w-4" />
            <span>Feed temporarily unavailable.</span>
          </div>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-white transition hover:bg-rose-500"
          >
            <RefreshCcw className="h-4 w-4" /> Retry
          </button>
        </div>
      );
    }

    if (!sortedTokens?.length) return null;

    return (
      <div className="flex flex-col divide-y divide-neutral-900/70">
        {sortedTokens.slice(0, visible).map((token) => (
          <TokenRow key={token.id} token={token} />
        ))}
      </div>
    );
  })();

  return (
    <div className="rounded-2xl border border-neutral-900/70 bg-neutral-950/70 p-4 shadow-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm text-neutral-300">
          <Shield className="h-4 w-4 text-emerald-400" />
          Live token discovery · Zeroed for latency
        </div>
        <div className="flex items-center gap-1 text-xs text-neutral-500">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Live price feed
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="space-y-2" style={{ minWidth: "1100px" }}>
          <div className="grid grid-cols-[240px_repeat(8,minmax(0,1fr))] items-center gap-2 rounded-xl bg-neutral-900/60 px-3 py-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
            <span className="text-neutral-300">Token</span>
            {columns.map((col) => (
              <HeaderCell
                key={col.key}
                label={col.label}
                tooltip={col.tooltip}
                active={sortColumn === col.key}
                direction={sortDirection}
                onClick={() => dispatch(setSort(col.key))}
                className={col.hideOn}
              />
            ))}
            <span className="text-right text-neutral-400">Actions</span>
          </div>

          {content}
        </div>
      </div>
    </div>
  );
}

function HeaderCell({
  label,
  tooltip,
  active,
  direction,
  onClick,
  className,
}: {
  label: string;
  tooltip: string;
  active: boolean;
  direction: "asc" | "desc";
  onClick: () => void;
  className?: string;
}) {
  return (
    <div className={clsx("flex items-center gap-1", className)}>
      <Tooltip label={tooltip}>
        <button
          className={clsx(
            "inline-flex items-center gap-1 rounded-full px-2 py-1 transition hover:bg-neutral-800",
            active ? "text-white" : "text-neutral-400"
          )}
          onClick={onClick}
        >
          {label}
          {active && <ArrowDownUp className="h-3.5 w-3.5" />}
          {!active && <ArrowDownUp className="h-3.5 w-3.5 text-neutral-500" />}
        </button>
      </Tooltip>
      {active && <span className="text-[10px] uppercase text-neutral-500">{direction}</span>}
    </div>
  );
}
