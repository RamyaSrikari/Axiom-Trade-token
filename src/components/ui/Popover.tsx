"use client";

import * as PopoverPrimitive from "@radix-ui/react-popover";
import clsx from "clsx";

export function Popover({ trigger, children, align = "end" }: { trigger: React.ReactNode; children: React.ReactNode; align?: "center" | "start" | "end" }) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          sideOffset={10}
          className={clsx(
            "z-40 w-56 rounded-xl border border-neutral-800 bg-neutral-950/95 p-3 shadow-2xl",
            "backdrop-blur-md ring-1 ring-neutral-800/60"
          )}
        >
          {children}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
