"use client";

import { ErrorBoundary } from "@/components/system/ErrorBoundary";
import { TokenModal } from "@/components/table/TokenModal";
import { TokenTable } from "@/components/table/TokenTable";
import { TokenTabs } from "@/components/table/TokenTabs";

export function TokenClient() {
  return (
    <ErrorBoundary
      fallback={<div className="rounded-xl border border-rose-900/50 bg-rose-950/60 p-6 text-rose-100">Something went wrong loading tokens.</div>}
    >
      <div className="space-y-4">
        <TokenTabs />
        <TokenTable />
        <TokenModal />
      </div>
    </ErrorBoundary>
  );
}
