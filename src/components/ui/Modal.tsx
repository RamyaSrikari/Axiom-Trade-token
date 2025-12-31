"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import clsx from "clsx";

export function Modal({ open, onOpenChange, title, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; children: React.ReactNode }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content
          className={clsx(
            "fixed left-1/2 top-1/2 z-50 w-[min(640px,92vw)] -translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border border-neutral-800 bg-neutral-950/90 p-6 shadow-2xl backdrop-blur-xl",
            "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out"
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-white">{title}</Dialog.Title>
            <Dialog.Close className="rounded-full p-1 text-neutral-400 transition hover:bg-neutral-800 hover:text-white" aria-label="Close">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
