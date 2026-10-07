import { catalog } from "./catalog";
export type CartLine = { id: string; quantity: number };
export const CART_KEY = "organik.cart.v1";
export function sanitizeCart(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  const merged = new Map<string, number>();
  for (const line of value)
    if (
      line &&
      typeof line.id === "string" &&
      catalog.some((p) => p.id === line.id) &&
      Number.isInteger(line.quantity) &&
      line.quantity > 0
    )
      merged.set(
        line.id,
        Math.min(99, (merged.get(line.id) || 0) + line.quantity),
      );
  return [...merged].map(([id, quantity]) => ({ id, quantity }));
}
export function addLine(lines: CartLine[], id: string): CartLine[] {
  if (!catalog.some((p) => p.id === id)) return lines;
  return sanitizeCart([...lines, { id, quantity: 1 }]);
}
export function setQuantity(lines: CartLine[], id: string, quantity: number) {
  return sanitizeCart(lines.map((l) => (l.id === id ? { ...l, quantity } : l)));
}
export const cartTotal = (lines: CartLine[]) =>
  lines.reduce(
    (total, l) =>
      total + (catalog.find((p) => p.id === l.id)?.price || 0) * l.quantity,
    0,
  );
