"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck, ExternalLink, LineChart, ShieldAlert } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { compactNumber, formatCurrency, formatPercent } from "@/lib/format";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setModalToken } from "@/state/uiSlice";
import { tokenKeys } from "@/lib/queryKeys";
import { fetchTokens } from "@/services/tokenData";

export function TokenModal() {
  const dispatch = useAppDispatch();
  const modalId = useAppSelector((s) => s.ui.modalTokenId);
  const { data } = useQuery({ queryKey: tokenKeys.all, queryFn: fetchTokens });
  const token = useMemo(() => data?.find((t) => t.id === modalId), [modalId, data]);

  return (
    <Modal
      open={Boolean(token)}
      onOpenChange={(open) => dispatch(setModalToken(open ? modalId : null))}
      title={token ? `${token.name} · ${token.symbol}` : "Token"}
    >
      {!token ? null : (
        <div className="space-y-4 text-sm text-neutral-200">
          <div className="flex flex-wrap items-center gap-2 text-neutral-300">
            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs">Chain: {token.chain}</span>
            <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs">Category: {token.category}</span>
            {token.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600/20 px-3 py-1 text-xs text-emerald-300">
                <BadgeCheck className="h-4 w-4" /> Verified
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 text-sm md:grid-cols-3">
            <Metric label="Price" value={formatCurrency(token.price)} />
            <Metric label="5m" value={formatPercent(token.change5m)} tone={token.change5m} />
            <Metric label="1h" value={formatPercent(token.change1h)} tone={token.change1h} />
            <Metric label="24h" value={formatPercent(token.change24h)} tone={token.change24h} />
            <Metric label="Liquidity" value={compactNumber(token.liquidity)} />
            <Metric label="Volume 24h" value={compactNumber(token.volume24h)} />
            <Metric label="FDV" value={compactNumber(token.fdv)} />
            <Metric label="Txs" value={`${token.txs}`} />
          </div>

          <div className="flex flex-wrap gap-2">
            <ModalButton icon={<ExternalLink className="h-4 w-4" />} label="Open in explorer" />
            <ModalButton icon={<LineChart className="h-4 w-4" />} label="View depth" />
            <ModalButton icon={<ShieldAlert className="h-4 w-4" />} label="Set risk alert" />
          </div>
        </div>
      )}
    </Modal>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: number }) {
  const toneClass = tone === undefined ? "text-neutral-100" : tone >= 0 ? "text-emerald-300" : "text-rose-300";
  return (
    <div className="flex flex-col gap-1 rounded-lg bg-neutral-950/60 p-3">
      <span className="text-xs uppercase tracking-wide text-neutral-500">{label}</span>
      <span className={`text-sm font-semibold ${toneClass}`}>{value}</span>
    </div>
  );
}

function ModalButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-lg bg-neutral-800 px-3 py-2 text-neutral-100 transition hover:bg-neutral-700">
      <span className="text-neutral-400">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
