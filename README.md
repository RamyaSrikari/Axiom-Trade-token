## Axiom Trade · Token Discovery Table

Pixel-focused recreation of Axiom Pulse’s token discovery table with realtime mock price feeds, tooltips/popovers/modals, sorting, skeleton/progressive loading, and error boundaries. Built with Next.js 14 (App Router), TypeScript (strict), Tailwind CSS, Redux Toolkit, React Query, and Radix UI.

## Stack
- Next.js 14 App Router, TypeScript, Tailwind CSS (v4)
- State: Redux Toolkit (UI), React Query (data)
- UI primitives: Radix Tooltip/Popover/Dialog/Tabs, lucide-react icons
- Mock data + WebSocket-style price deltas

## Features
- Three categories: New pairs, Final Stretch, Migrated
- Sorting, hover tooltips, row click modal, popover actions
- Live price/metric updates with smooth flash transitions
- Skeleton + shimmer, progressive row reveal, error retry state
- Responsive with horizontal scroll support down to 320px

## Local Development
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Quality
- Lint: `npm run lint`
- Build: `npm run build`

## Deployment (Vercel)
- Connect the repo on Vercel, set framework to Next.js. Defaults are sufficient.
- Ensure `NODE_ENV=production` build: Vercel will run `npm install && npm run build`.

## Deliverables checklist
- Code in GitHub with clean commits
- Vercel deployment (add URL here once deployed)
- 1–2 min public YouTube demo (add link here once recorded)
- Responsive snapshots (320px upward) to be attached/linked here after capture
