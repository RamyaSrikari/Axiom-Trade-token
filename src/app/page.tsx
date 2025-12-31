import { TokenClient } from "./token-client";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-black px-4 pb-16 pt-12 text-white md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300 ring-1 ring-emerald-500/30">
              Live · Token discovery pulse
            </div>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">Axiom Trade · Token Trading Table</h1>
            <p className="max-w-2xl text-sm text-neutral-400 md:text-base">
              Pixel-focused replica with realtime deltas, hover/click interactions, popovers, tooltips, modals, and graceful loading states.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden />
            <span>Feed healthy</span>
          </div>
        </header>

        <section className="space-y-4 rounded-3xl border border-neutral-900/70 bg-neutral-900/40 p-5 backdrop-blur-xl">
          <TokenClient />
        </section>
      </div>
    </main>
  );
}
