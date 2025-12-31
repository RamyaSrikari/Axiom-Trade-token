import { Token } from "@/lib/types";

type TokenUpdate = Partial<Omit<Token, "id">> & { id: string };

type UpdateHandler = (update: TokenUpdate) => void;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function startMockPriceFeed(getTokens: () => Token[] | undefined, onUpdate: UpdateHandler) {
  const pick = () => {
    const tokens = getTokens() ?? [];
    if (!tokens.length) return null;
    const idx = Math.floor(Math.random() * tokens.length);
    return tokens[idx];
  };

  const interval = setInterval(() => {
    const token = pick();
    if (!token) return;

    const drift = 1 + (Math.random() * 0.012 - 0.006); // +/- 0.6%
    const nextPrice = Number((token.price * drift).toFixed(4));
    const pctMove = ((nextPrice - token.price) / token.price) * 100;
    const liquidityDrift = 1 + (Math.random() * 0.003 - 0.0015);
    const volumeBump = token.volume24h * (0.0008 + Math.random() * 0.0012);

    onUpdate({
      id: token.id,
      price: nextPrice,
      change5m: clamp(token.change5m + pctMove * 0.4, -20, 20),
      change1h: clamp(token.change1h + pctMove * 0.2, -40, 40),
      change6h: clamp(token.change6h + pctMove * 0.05, -80, 80),
      change24h: clamp(token.change24h + pctMove * 0.02, -120, 120),
      liquidity: Math.max(50_000, Math.round(token.liquidity * liquidityDrift)),
      volume24h: Math.max(20_000, Math.round(token.volume24h + volumeBump)),
      fdv: Math.max(5_000_000, Math.round(token.fdv * (1 + pctMove * 0.0005))),
      txs: Math.max(120, Math.round(token.txs + 5 + Math.random() * 10)),
    });
  }, 1400 + Math.random() * 800);

  return () => clearInterval(interval);
}
