"use client";

import { memo, useEffect, useRef, useState } from "react";
import { ChevronUp, ChevronDown, ExternalLink, Info, MoreHorizontal } from "lucide-react";
import clsx from "clsx";
import { Token } from "@/lib/types";
import { compactNumber, formatCurrency, formatPercent } from "@/lib/format";
import { Popover } from "@/components/ui/Popover";
import { Tooltip } from "@/components/ui/Tooltip";
import { useAppDispatch } from "@/state/hooks";
import { setModalToken } from "@/state/uiSlice";

function TokenRowComponent({ token }: { token: Token }) {
  const dispatch = useAppDispatch();
  const prevPrice = useRef(token.price);
  const [flashClass, setFlashClass] = useState("");

  useEffect(() => {
    const direction = token.price > prevPrice.current ? "up" : token.price < prevPrice.current ? "down" : null;
    prevPrice.current = token.price;

    if (!direction) return undefined;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFlashClass(direction === "up" ? "flash-up" : "flash-down");
    const timeout = setTimeout(() => setFlashClass(""), 650);
    return () => clearTimeout(timeout);
  }, [token.price]);

  return (
    <div
      className={clsx(
        "grid grid-cols-[240px_repeat(8,minmax(0,1fr))] items-center gap-2 rounded-xl px-3 py-3",
        "transition hover:bg-neutral-900/60",
        flashClass
      )}
      style={{ minWidth: "1100px" }}
      onClick={() => dispatch(setModalToken(token.id))}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-neutral-800 to-neutral-900 text-sm font-semibold text-white">
          {token.symbol.slice(0, 3)}
        </div>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            {token.name}
            {token.verified && <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] text-emerald-300">Verified</span>}
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            {token.symbol.toUpperCase()} · {token.chain}
            {token.note && (
              <Tooltip label={token.note}>
                <Info className="h-3.5 w-3.5 text-neutral-500" />
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      <Cell label="Price" valueNode={<span className="tabular-nums text-white">{formatCurrency(token.price)}</span>} className={flashClass} />
      <Cell label="5m" valueNode={<Delta value={token.change5m} />} />
      <Cell label="1h" valueNode={<Delta value={token.change1h} />} className="hidden lg:flex" />
      <Cell label="24h" valueNode={<Delta value={token.change24h} />} className="hidden md:flex" />
      <Cell label="Liquidity" valueNode={<span className="tabular-nums text-neutral-200">{compactNumber(token.liquidity)}</span>} className="col-span-1" />
      <Cell label="Volume" valueNode={<span className="tabular-nums text-neutral-200">{compactNumber(token.volume24h)}</span>} className="col-span-1" />
      <Cell label="FDV" valueNode={<span className="tabular-nums text-neutral-200">{compactNumber(token.fdv)}</span>} className="hidden md:flex" />

      <div className="flex items-center justify-end gap-2">
        <div className="rounded-full bg-neutral-800 px-2 py-1 text-[12px] text-neutral-300">{token.txs} txs</div>
        <Popover
          trigger={
            <button
              aria-label="Actions"
              className="rounded-full p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          }
        >
          <div className="flex flex-col gap-1 text-sm text-neutral-100">
            <ActionRow label="Open in Axiom" icon={<ExternalLink className="h-4 w-4" />} />
            <ActionRow label="View chart" icon={<ChevronUp className="h-4 w-4" />} />
            <ActionRow label="Set alert" icon={<ChevronDown className="h-4 w-4" />} />
          </div>
        </Popover>
      </div>
    </div>
  );
}

export const TokenRow = memo(TokenRowComponent);

function Cell({ label, valueNode, className }: { label: string; valueNode: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("flex flex-col gap-1 text-xs text-neutral-500", className)}>
      <span className="hidden sm:block">{label}</span>
      <span className="text-sm font-medium">{valueNode}</span>
    </div>
  );
}

function Delta({ value }: { value: number }) {
  const color = value >= 0 ? "text-emerald-400" : "text-rose-400";
  const Icon = value >= 0 ? ChevronUp : ChevronDown;
  return (
    <span className={clsx("inline-flex items-center gap-1 tabular-nums", color)}>
      <Icon className="h-3 w-3" />
      {formatPercent(value)}
    </span>
  );
}

function ActionRow({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <button className="flex items-center gap-2 rounded-lg px-2 py-2 text-left text-neutral-200 transition hover:bg-neutral-800">
      <span className="text-neutral-400">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
