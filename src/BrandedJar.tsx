import type { Category } from "./catalog";
export const productTitles: Record<Category, string> = {
  miel: "Miel",
  olive: "Huile d’olive",
  argan: "Huile d’argan",
  amlou: "Amlou",
};
export const productThemes: Record<
  Category,
  { background: string; color: string }
> = {
  miel: { background: "#ead09a", color: "#47371c" },
  olive: { background: "#c5ce9d", color: "#2c3e22" },
  argan: { background: "#e4b88a", color: "#513225" },
  amlou: { background: "#cfb29f", color: "#463126" },
};
export function BrandedJar({
  category,
  className = "",
  eager = false,
}: {
  category: Category;
  className?: string;
  eager?: boolean;
}) {
  return (
    <span
      className={`branded-jar ${className}`}
      role="img"
      aria-label={`Pot organik ${productTitles[category]}`}
    >
      <span className="jar-square">
        <img
          className="jar-photo"
          alt=""
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          src={`/assets/original/${category}.png`}
          draggable={false}
        />
        <span className={`jar-paper jar-paper-${category}`}>
          <img src="/assets/original/logo.png" alt="" />
          <span>{productTitles[category]}</span>
        </span>
      </span>
    </span>
  );
}
