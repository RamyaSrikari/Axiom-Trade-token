"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Token } from "@/lib/types";
import { tokenKeys } from "@/lib/queryKeys";
import { startMockPriceFeed } from "@/services/mockSocket";

export function useLiveTokenUpdates(tokens: Token[] | undefined) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!tokens || tokens.length === 0) return;

    const stop = startMockPriceFeed(
      () => queryClient.getQueryData<Token[]>(tokenKeys.all),
      (update) => {
        queryClient.setQueryData<Token[]>(tokenKeys.all, (prev) => {
          if (!prev) return prev;
          return prev.map((t) => (t.id === update.id ? { ...t, ...update } : t));
        });
      }
    );

    return stop;
  }, [queryClient, tokens]);
}
