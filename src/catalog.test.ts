import { describe, it, expect } from "vitest";
import { catalog, defaultFilters, filterCatalog, normalize } from "./catalog";
import { addLine, cartTotal, sanitizeCart, setQuantity } from "./cart";
describe("typed catalog", () => {
  it("contains 18 unique references and ten 250 g honeys spanning 30–200 MAD", () => {
    expect(catalog).toHaveLength(18);
    expect(new Set(catalog.map((p) => p.id)).size).toBe(18);
    const h = catalog.filter((p) => p.category === "miel");
    expect(h).toHaveLength(10);
    expect(h.every((p) => p.size === "250 g")).toBe(true);
    expect(Math.min(...h.map((p) => p.price))).toBe(30);
    expect(Math.max(...h.map((p) => p.price))).toBe(200);
  });
  it("preserves prior SKU meaning while replacing guessed honey and prices with recovered data", () => {
    expect(catalog.find((p) => p.id === "miel-4")).toMatchObject({
      variant: "Thym",
      price: 135,
    });
    expect(catalog.find((p) => p.id === "miel-tournesol")).toMatchObject({
      variant: "Tournesol",
      price: 60,
    });
    expect(sanitizeCart([{ id: "miel-10", quantity: 1 }])).toEqual([]);
    expect(
      catalog.filter((p) => p.category === "olive").map((p) => p.price),
    ).toEqual([75, 75]);
  });
  it("normalizes accents and case in multi-word searches", () => {
    expect(normalize(" COSMÉTIQUE ")).toBe("cosmetique");
    expect(
      filterCatalog({
        ...defaultFilters,
        search: "ARGAN cosmetique essaouira",
      }).map((p) => p.id),
    ).toEqual(["argan-cosmétique-essaouira"]);
  });
  it("combines category and origin filters and sorts numeric prices", () => {
    const result = filterCatalog({
      ...defaultFilters,
      category: "argan",
      origin: "Agadir",
      sort: "asc",
    });
    expect(result.map((p) => p.price)).toEqual([170, 180]);
    expect(
      filterCatalog({ ...defaultFilters, category: "miel", origin: "Agadir" }),
    ).toEqual([]);
  });
  it("supports empty states and resetting to the full catalog", () => {
    expect(
      filterCatalog({ ...defaultFilters, search: "absent123" }),
    ).toHaveLength(0);
    expect(filterCatalog(defaultFilters)).toHaveLength(18);
  });
});
describe("cart SKU identity", () => {
  it("keeps all argan types and origins separate, merges only same SKU, calculates exact totals", () => {
    let lines = [] as ReturnType<typeof addLine>;
    for (const p of catalog.filter((p) => p.category === "argan"))
      lines = addLine(lines, p.id);
    expect(lines).toHaveLength(4);
    lines = addLine(lines, "argan-culinaire-agadir");
    expect(lines.find((l) => l.id === "argan-culinaire-agadir")?.quantity).toBe(
      2,
    );
    expect(cartTotal(lines)).toBe(880);
    expect(cartTotal(setQuantity(lines, "argan-culinaire-agadir", 3))).toBe(
      1060,
    );
    expect(setQuantity(lines, "argan-culinaire-agadir", 0)).toHaveLength(3);
  });
  it("sanitizes malformed stored carts and caps quantities", () => {
    expect(
      sanitizeCart([
        { id: "fake", quantity: 5 },
        { id: "miel-1", quantity: -1 },
        { id: "miel-1", quantity: 1.5 },
        null,
      ]),
    ).toEqual([]);
    expect(
      sanitizeCart([
        { id: "miel-1", quantity: 70 },
        { id: "miel-1", quantity: 70 },
      ]),
    ).toEqual([{ id: "miel-1", quantity: 99 }]);
    expect(sanitizeCart("bad")).toEqual([]);
  });
});
