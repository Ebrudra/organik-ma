export type Category = "miel" | "olive" | "argan" | "amlou";
export type Product = {
  id: string;
  category: Category;
  name: string;
  variant: string;
  origin: string;
  price: number;
  size?: string;
  provisional: boolean;
  image: string;
  description: string;
  usage: "alimentaire" | "cosmétique";
};
export const categoryNames: Record<Category, string> = {
  miel: "Miels",
  olive: "Huiles d’olive",
  argan: "Huiles d’argan",
  amlou: "Amlou",
};
const honey: [string, number][] = [
  ["Fleurs", 30],
  ["Oranger", 50],
  ["Eucalyptus", 60],
  ["Thym", 100],
  ["Romarin", 70],
  ["Lavande", 80],
  ["Caroubier", 90],
  ["Jujubier", 150],
  ["Euphorbe", 200],
  ["Montagne", 120],
];
export const catalog: Product[] = [
  ...honey.map(([variant, price], i) => ({
    id: `miel-${i + 1}`,
    category: "miel" as const,
    name: `Miel de ${variant.toLowerCase()}`,
    variant,
    origin: "Origine à confirmer",
    price,
    size: "250 g",
    provisional: true,
    image: "/assets/miel.svg",
    description:
      "Un miel à découvrir à la cuillère, sur une tartine ou dans une recette. La variété, la provenance et le tarif restent à confirmer avant la vente.",
    usage: "alimentaire" as const,
  })),
  ...["Agadir", "Essaouira"].flatMap((origin) =>
    ["Culinaire", "Cosmétique"].map((variant) => ({
      id: `argan-${variant.toLowerCase()}-${origin.toLowerCase()}`,
      category: "argan" as const,
      name: `Huile d’argan ${variant.toLowerCase()}`,
      variant,
      origin,
      price: variant === "Culinaire" ? 180 : 170,
      provisional: false,
      image: "/assets/argan.svg",
      description:
        variant === "Culinaire"
          ? "Une huile destinée à l’alimentation, à utiliser en finition selon les indications du producteur."
          : "Un produit de soin, distinct de l’huile alimentaire. Ne pas ingérer. Suivre les instructions du fabricant.",
      usage:
        variant === "Culinaire"
          ? ("alimentaire" as const)
          : ("cosmétique" as const),
    })),
  ),
  ...["Agadir", "Beni Mellal"].map((origin, i) => ({
    id: `olive-${origin.toLowerCase().replace(" ", "-")}`,
    category: "olive" as const,
    name: "Huile d’olive",
    variant: i ? "Moyen Atlas" : "Haut Atlas",
    origin,
    price: i ? 90 : 100,
    provisional: true,
    image: "/assets/olive.svg",
    description:
      "Une huile à retrouver dans une salade ou à table. L’association région/origine, le conditionnement et le tarif sont à confirmer.",
    usage: "alimentaire" as const,
  })),
  ...["Agadir", "Essaouira"].map((origin) => ({
    id: `amlou-${origin.toLowerCase()}`,
    category: "amlou" as const,
    name: "Amlou",
    variant: "Amlou",
    origin,
    price: 120,
    provisional: true,
    image: "/assets/amlou.svg",
    description:
      "Une invitation au petit déjeuner marocain. Composition, allergènes, conditionnement et prix à confirmer auprès du producteur avant toute vente.",
    usage: "alimentaire" as const,
  })),
];
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
export type Filters = {
  search: string;
  category: string;
  origin: string;
  sort: string;
};
export const defaultFilters: Filters = {
  search: "",
  category: "",
  origin: "",
  sort: "default",
};
export function filterCatalog(filters: Filters) {
  const words = normalize(filters.search).split(/\s+/).filter(Boolean);
  const result = catalog.filter(
    (p) =>
      words.every((w) =>
        normalize(
          `${p.name} ${p.variant} ${p.origin} ${categoryNames[p.category]}`,
        ).includes(w),
      ) &&
      (!filters.category || p.category === filters.category) &&
      (!filters.origin || p.origin === filters.origin),
  );
  return filters.sort === "asc"
    ? result.sort((a, b) => a.price - b.price)
    : filters.sort === "desc"
      ? result.sort((a, b) => b.price - a.price)
      : result;
}
export const money = (n: number) =>
  `${new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 2 }).format(n)} MAD`;
