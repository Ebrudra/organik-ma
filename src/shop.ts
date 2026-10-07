import { createContext, useContext } from "react";
import type { CartLine } from "./cart";
export type ShopState = {
  lines: CartLine[];
  add: (id: string) => void;
  change: (id: string, n: number) => void;
  clear: () => void;
  open: () => void;
  announcement: string;
};
export const Shop = createContext<ShopState>(null!);
export const useShop = () => useContext(Shop);
