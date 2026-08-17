# Axiom Token Discovery Dashboard

A responsive token-discovery interface with live mock market updates, sortable tables, progressive loading, and detailed token views.

[View the live application](https://axiom-trade-token.vercel.app)

## Highlights

- New pairs, final-stretch, and migrated-token views
- Sorting, contextual tooltips, popovers, and token detail modals
- Mock WebSocket-style price and metric updates
- Loading, retry, and error-boundary states
- Responsive layouts down to 320px

## Technology

- Next.js 16 App Router, React 19, and strict TypeScript
- Tailwind CSS 4
- Redux Toolkit for interface state
- TanStack Query for data state
- Radix UI primitives and Lucide icons

## Run locally

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Verify

```bash
npm run lint
npm run build
```

The application uses generated demonstration data and does not execute financial transactions. It is not financial advice.

## Security

Please report vulnerabilities privately as described in [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE)
