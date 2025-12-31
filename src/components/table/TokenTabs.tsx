"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { setCategory } from "@/state/uiSlice";
import { TokenCategory } from "@/lib/types";

const TABS: { value: TokenCategory; label: string; hint: string }[] = [
  { value: "new", label: "New pairs", hint: "Freshly discovered opportunities" },
  { value: "final", label: "Final Stretch", hint: "Late-stage momentum" },
  { value: "migrated", label: "Migrated", hint: "Bridged or relocated liquidity" },
];

export function TokenTabs() {
  const dispatch = useAppDispatch();
  const active = useAppSelector((s) => s.ui.activeCategory);

  return (
    <Tabs.Root
      value={active}
      onValueChange={(val) => dispatch(setCategory(val as TokenCategory))}
      className="flex flex-col gap-3"
    >
      <Tabs.List className="inline-flex gap-2 rounded-full bg-neutral-900/60 p-1 text-sm font-medium">
        {TABS.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className="group relative overflow-hidden rounded-full px-4 py-2 text-neutral-300 transition data-[state=active]:bg-white data-[state=active]:text-neutral-900"
          >
            <span>{tab.label}</span>
            <span className="block text-[11px] font-normal leading-4 text-neutral-500 group-data-[state=active]:text-neutral-700">
              {tab.hint}
            </span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
