export type TokenCategory = "new" | "final" | "migrated";

export type SortColumn =
  | "price"
  | "change5m"
  | "change1h"
  | "change6h"
  | "change24h"
  | "volume24h"
  | "liquidity"
  | "fdv"
  | "txs";

export type SortDirection = "asc" | "desc";

export type Token = {
  id: string;
  name: string;
  symbol: string;
  chain: string;
  category: TokenCategory;
  price: number;
  change5m: number;
  change1h: number;
  change6h: number;
  change24h: number;
  volume24h: number;
  liquidity: number;
  fdv: number;
  txs: number;
  verified?: boolean;
  note?: string;
};
