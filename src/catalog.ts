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
const honey: [string, number, string][] = [
  ["Fleurs", 30, "miel-1"],
  ["Oranger", 45, "miel-2"],
  ["Eucalyptus", 55, "miel-3"],
  ["Tournesol", 60, "miel-tournesol"],
  ["Romarin", 75, "miel-5"],
  ["Caroubier", 90, "miel-7"],
  ["Lavande", 110, "miel-6"],
  ["Thym", 135, "miel-4"],
  ["Euphorbe", 165, "miel-9"],
  ["Jujubier", 200, "miel-8"],
];
export const catalog: Product[] = [
  ...honey.map(([variant, price, id]) => ({
    id,
    category: "miel" as const,
    name: `Miel de ${variant.toLowerCase()}`,
    variant,
    origin: "Origine à confirmer",
    price,
    size: "250 g",
    provisional: true,
    image: "/assets/original/miel.png",
    description:
      "Un miel à découvrir à la cuillère, sur une tartine ou dans une recette. La variété, la provenance et le tarif restent à confirmer avant la vente.",
    usage: "alimentaire" as const,
  })),
  ...["Agadir", "Essaouira"].flatMap((origin) =>
    ["Culinaire", "Cosmétique"].map((variant) => ({
      id: `argan-${variant.toLowerCase()}-${origin.toLowerCase()}`,
      category: "argan" as const,
      name: `Huile d’argan ${variant.toLowerCase()}`,
      variant: variant === "Culinaire" ? "Alimentaire" : variant,
      origin,
      price: variant === "Culinaire" ? 180 : 170,
      provisional: false,
      size: "250 ml",
      image: "/assets/original/argan.png",
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
    price: 75,
    provisional: true,
    size: "250 ml",
    image: "/assets/original/olive.png",
    description:
      "Une huile à retrouver dans une salade ou à table. L’association région/origine, le conditionnement et le tarif sont à confirmer.",
    usage: "alimentaire" as const,
  })),
  ...["Agadir", "Essaouira"].map((origin) => ({
    id: `amlou-${origin.toLowerCase()}`,
    category: "amlou" as const,
    name: "Amlou",
    variant: "Amandes, miel & argan",
    origin,
    price: 120,
    provisional: true,
    size: "250 g",
    image: "/assets/original/amlou.png",
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
