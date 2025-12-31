"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import clsx from "clsx";

export function Tooltip({ label, children, side = "top" }: { label: string; children: React.ReactNode; side?: "top" | "bottom" | "left" | "right" }) {
  return (
    <TooltipPrimitive.Provider delayDuration={120} skipDelayDuration={80}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            className={clsx(
              "z-50 rounded-lg bg-neutral-900 px-3 py-2 text-xs text-white shadow-lg",
              "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
              "data-[state=delayed-open]:fade-in data-[state=closed]:fade-out"
            )}
            sideOffset={8}
          >
            {label}
            <TooltipPrimitive.Arrow className="fill-neutral-900" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
