import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { catalog, money, type Category, type Product } from "./catalog";
import { BrandedJar, productTitles, productThemes } from "./BrandedJar";
import { useShop } from "./shop";
const categories: Category[] = ["miel", "olive", "argan", "amlou"];
const defaults: Record<Category, string> = {
  miel: "miel-1",
  olive: "olive-agadir",
  argan: "argan-culinaire-agadir",
  amlou: "amlou-agadir",
};
const copy: Record<
  Category,
  { subtitle: string; description: string; notes: string }
> = {
  miel: {
    subtitle: "La douceur à l’état pur.",
    description:
      "Une touche dorée pour vos tartines, vos infusions et vos petits-déjeuners.",
    notes: "Doux · Rond · Délicat",
  },
  olive: {
    subtitle: "Le goût des choses simples.",
    description:
      "L’essentiel de votre cuisine, de la première tartine à la dernière touche sur une salade.",
    notes: "Fruitée · Végétale · Intense",
  },
  argan: {
    subtitle: "À table ou en soin.",
    description:
      "Deux usages, deux huiles : choisissez l’argan alimentaire pour vos recettes ou l’argan cosmétique pour votre rituel de soin.",
    notes: "Agadir · Essaouira",
  },
  amlou: {
    subtitle: "Le rituel des matins heureux.",
    description:
      "La rencontre des amandes, du miel et de l’huile d’argan. Une cuillère, et le matin prend son temps.",
    notes: "Amande · Miel · Argan",
  },
};
const familyNotes: Record<Category, string> = {
  miel: "10 variétés",
  olive: "2 origines",
  argan: "Alimentaire & cosmétique",
  amlou: "2 origines",
};
export function Plus({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5v14" />
    </svg>
  );
}
function Chevron({ previous = false }: { previous?: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={previous ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}
export function VariantChooser({
  product: p,
  onChange,
}: {
  product: Product;
  onChange: (id: string) => void;
}) {
  const variants = catalog.filter((v) => v.category === p.category);
  if (p.category === "argan")
    return (
      <div className="variant-chooser">
        <label>
          <span>Usage</span>
          <select
            className="variant-trigger"
            aria-label="Choisir le type d’argan"
            value={p.usage}
            onChange={(e) => {
              const v = variants.find(
                (v) => v.origin === p.origin && v.usage === e.target.value,
              );
              if (v) onChange(v.id);
            }}
          >
            <option value="alimentaire">Alimentaire · 180 MAD</option>
            <option value="cosmétique">Cosmétique · 170 MAD</option>
          </select>
        </label>
        <label>
          <span>Origine</span>
          <select
            className="variant-trigger"
            aria-label="Choisir l’origine de l’argan"
            value={p.origin}
            onChange={(e) => {
              const v = variants.find(
                (v) => v.origin === e.target.value && v.usage === p.usage,
              );
              if (v) onChange(v.id);
            }}
          >
            {["Agadir", "Essaouira"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>
    );
  const label =
    p.category === "miel"
      ? "Variété"
      : p.category === "olive"
        ? "Terroir"
        : "Origine";
  return (
    <div className="variant-chooser">
      <label>
        <span>{label}</span>
        <select
          className="variant-trigger"
          aria-label={`Choisir ${label.toLowerCase()} — ${productTitles[p.category]}`}
          value={p.id}
          onChange={(e) => onChange(e.target.value)}
        >
          {variants.map((v) => (
            <option key={v.id} value={v.id}>
              {p.category === "amlou"
                ? v.origin
                : `${v.variant} · ${money(v.price)}`}
            </option>
          ))}
        </select>
      </label>
      {p.category === "olive" && <p className="origin">Origine : {p.origin}</p>}
    </div>
  );
}
export default function Storefront({ luna }: { luna: boolean }) {
  const [selection, setSelection] = useState(defaults);
  const [detail, setDetail] = useState<Category | null>(null);
  const shop = useShop();
  const products = categories.map((c) =>
    catalog.find((p) => p.id === selection[c])!,
  );
  const choose = (category: Category, id: string) =>
    setSelection((s) => ({ ...s, [category]: id }));
  return (
    <div
      className={`storefront ${luna ? "luna-page" : "original-page"} luna-ready`}
    >
      {luna ? (
        <LunaHero products={products} onChoose={setDetail} />
      ) : (
        <OriginalHero products={products} onChoose={setDetail} />
      )}
      <div className="principles">
        <span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10ZM2 21c0-3 2-5.4 5-6C9.5 14.5 12 13 13 12" />
          </svg>{" "}
          Des saveurs à partager
        </span>
        <span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="m12 2 9 5v10l-9 5-9-5V7L12 2Zm0 10v10M3 7l9 5 9-5M7.5 4.5l9 5" />
          </svg>{" "}
          Une collection en pots de verre
        </span>
        <span>Du petit-déjeuner à votre table</span>
      </div>
      <section className="collection" id="collection">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LE GARDE-MANGER ORGANIK</span>
            <h2>
              Les bonnes choses,
              <br />
              <em>tout simplement.</em>
            </h2>
          </div>
          <p>
            Quatre saveurs pour les petits rituels
            <br />
            qui rendent le quotidien meilleur.
          </p>
        </div>
        <div className="catalog">
          {products.map((p, i) => (
            <article className="product" key={p.category}>
              <button
                className="product-image"
                style={{ background: productThemes[p.category].background }}
                aria-label={`Découvrir ${productTitles[p.category]}`}
                onClick={() => setDetail(p.category)}
              >
                <span className="product-index">0{i + 1} / ORGANIK</span>
                <BrandedJar category={p.category} />
                <span className="view">Découvrir le produit</span>
              </button>
              <div className="product-info">
                <div>
                  <h3>
                    <button onClick={() => setDetail(p.category)}>
                      {productTitles[p.category]}
                    </button>
                  </h3>
                  <p>
                    {familyNotes[p.category]} · {p.size}
                  </p>
                </div>
                <button
                  className="add"
                  aria-label={`Ajouter ${productTitles[p.category]} au panier`}
                  onClick={() => shop.add(p.id)}
                >
                  <Plus />
                </button>
              </div>
              <VariantChooser
                product={p}
                onChange={(id) => choose(p.category, id)}
              />
              <strong className="price">{money(p.price)}</strong>
            </article>
          ))}
        </div>
        <p className="demo-note">
          Liste de miels et prix provisoires : 10 variétés de 250 g, de 30 à 200
          MAD. Prix olive et amlou, formats et compositions à confirmer avant
          ouverture des ventes.
        </p>
      </section>
      <section className="story">
        <div className="story-label">
          <span className="eyebrow">L’ESPRIT ORGANIK</span>
          <span className="story-number">04</span>
          <span>SAVEURS ESSENTIELLES</span>
        </div>
        <div>
          <h2>
            Moins de superflu.
            <br />
            <em>Plus de goût.</em>
          </h2>
          <p>
            Un morceau de pain. Un filet d’huile. Une cuillère d’amlou. Nous
            aimons ces plaisirs simples qui invitent à ralentir et à partager.
          </p>
          <Link to="/boutique" className="text-link">
            Composer mon panier
          </Link>
        </div>
      </section>
      {detail && (
        <ProductDialog
          product={products.find((p) => p.category === detail)!}
          choose={(id) => choose(detail, id)}
          close={() => setDetail(null)}
        />
      )}
    </div>
  );
}
export function OriginalHero(props: HeroProps) {
  return <Hero {...props} luna={false} />;
}
export function LunaHero(props: HeroProps) {
  return <Hero {...props} luna />;
}
type HeroProps = {
  products: Product[];
  onChoose: (category: Category) => void;
};
function Hero({ products, onChoose, luna }: { luna: boolean } & HeroProps) {
  const [slide, setSlide] = useState(0),
    [old, setOld] = useState<number | null>(null),
    [direction, setDirection] = useState(1),
    [moving, setMoving] = useState(false);
  const [entered, setEntered] = useState(!luna);
  useEffect(() => {
    if (!luna) return;
    setEntered(false);
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [luna, slide]);
  const [playing, setPlaying] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const lock = useRef(false),
    timer = useRef<ReturnType<typeof setTimeout> | null>(null),
    touch = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const changed = () => {
      setReduced(media.matches);
      if (media.matches) setPlaying(false);
    };
    media.addEventListener("change", changed);
    return () => media.removeEventListener("change", changed);
  }, []);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function go(index: number, manual = true) {
    if (manual) setPlaying(false);
    if (lock.current || index === slide) return;
    lock.current = true;
    setDirection(index === (slide + 3) % 4 ? -1 : 1);
    setOld(slide);
    setSlide(index);
    setMoving(true);
    timer.current = setTimeout(
      () => {
        lock.current = false;
        setOld(null);
        setMoving(false);
      },
      reduced ? 80 : luna ? 1500 : 1000,
    );
  }
  useEffect(() => {
    if (!playing || reduced) return;
    const interval = setInterval(() => {
      if (!document.hidden) go((slide + 1) % 4, false);
    }, 6000);
    return () => clearInterval(interval);
  }, [playing, reduced, slide]);
  const p = products[slide];
  function content(product: Product, index: number, previous = false) {
    const c = copy[product.category];
    const title = productTitles[product.category];
    return (
      <>
        <div className="backword" aria-hidden="true">
          {product.category.toUpperCase()}
        </div>
        <div className="hero-copy">
          <span className="eyebrow">LES ESSENTIELS ORGANIK · 0{index + 1}</span>
          {previous ? (
            <div className="hero-title">
              {title}
              <span>{c.subtitle}</span>
            </div>
          ) : (
            <h1>
              {title}
              <span>{c.subtitle}</span>
            </h1>
          )}
          <p>{c.description}</p>
          <div className="hero-buy">
            <button
              className="primary"
              disabled={previous}
              onClick={() => {
                setPlaying(false);
                onChoose(product.category);
              }}
            >
              Choisir mon produit <Plus size={17} />
            </button>
            <span>
              {money(product.price)}
              <small>
                {product.size} ·{" "}
                {product.category === "miel" ? product.variant : product.origin}
              </small>
            </span>
          </div>
          <span className="hero-notes">{c.notes}</span>
        </div>
        <div className="hero-visual">
          <div className="jar-shadow" />
          <BrandedJar category={product.category} className="hero-jar" eager />
          <span className="jar-caption">UN POT. UN PETIT PLAISIR.</span>
        </div>
      </>
    );
  }
  return (
    <section
      className={`hero ${moving ? "moving" : ""} ${entered ? "" : "entering"}`}
      style={{ "--slide-direction": direction } as React.CSSProperties}
      aria-roledescription="carrousel"
      aria-label={`Nos quatre produits — ${luna ? "Luna" : "Original"}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (
          e.target === e.currentTarget &&
          (e.key === "ArrowRight" || e.key === "ArrowLeft")
        ) {
          e.preventDefault();
          go((slide + (e.key === "ArrowRight" ? 1 : 3)) % 4);
        }
      }}
      onTouchStart={(e) => {
        if (
          e.touches.length !== 1 ||
          (e.target as HTMLElement).closest("button,a,input,select")
        ) {
          touch.current = null;
          return;
        }
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchMove={(e) => {
        if (!touch.current) return;
        if (e.touches.length !== 1) {
          touch.current = null;
          return;
        }
        const dx = e.touches[0].clientX - touch.current.x,
          dy = e.touches[0].clientY - touch.current.y;
        if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx))
          touch.current = null;
      }}
      onTouchCancel={() => {
        touch.current = null;
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x,
          dy = e.changedTouches[0].clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5)
          go((slide + (dx < 0 ? 1 : 3)) % 4);
      }}
    >
      {old !== null && (
        <div
          className="slide old"
          aria-hidden="true"
          inert
          style={productThemes[products[old].category]}
        >
          {content(products[old], old, true)}
        </div>
      )}
      <div
        className="slide current"
        key={slide}
        style={productThemes[p.category]}
      >
        {content(p, slide)}
      </div>
      <div className="hero-bottom">
        <span className="slide-count slide-counter">
          0{slide + 1}
          <span> / 04</span>
        </span>
        <div
          className="product-tabs"
          role="group"
          aria-label="Choisir un produit"
        >
          {products.map((p, i) => (
            <button
              key={p.category}
              className={i === slide ? "selected" : ""}
              aria-label={`Afficher ${productTitles[p.category]}`}
              aria-pressed={i === slide}
              onClick={() => go(i)}
            >
              <span>0{i + 1}</span>
              {productTitles[p.category]}
            </button>
          ))}
        </div>
        <div className="slide-controls">
          <button
            className="pause"
            aria-label={
              playing
                ? "Mettre le défilement en pause"
                : "Reprendre le défilement"
            }
            onClick={() => setPlaying(!playing)}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 16 16"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
            >
              <path d={playing ? "M5 3v10M11 3v10" : "m5 3 7 5-7 5Z"} />
            </svg>
          </button>
          <button
            aria-label="Produit précédent"
            onClick={() => go((slide + 3) % 4)}
          >
            <Chevron previous />
          </button>
          <button
            aria-label="Produit suivant"
            onClick={() => go((slide + 1) % 4)}
          >
            <Chevron />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live={playing ? "off" : "polite"}>
        {slide + 1} sur 4 : {productTitles[p.category]}
      </p>
    </section>
  );
}
function ProductDialog({
  product: p,
  choose,
  close,
}: {
  product: Product;
  choose: (id: string) => void;
  close: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null),
    opener = useRef(document.activeElement as HTMLElement | null);
  const shop = useShop();
  useEffect(() => {
    const el = dialog.current;
    el?.showModal();
    return () => {
      el?.close();
      opener.current?.focus();
    };
  }, []);
  return (
    <dialog
      className="reference-detail"
      ref={dialog}
      aria-labelledby="product-dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
    >
      <button
        className="detail-close close"
        onClick={close}
        aria-label="Fermer la fiche produit"
      >
        ×
      </button>
      <div className="reference-detail-grid">
        <div
          className="detail-image"
          style={{ background: productThemes[p.category].background }}
        >
          <BrandedJar category={p.category} eager />
        </div>
        <div>
          <span className="eyebrow">ORGANIK · {p.usage}</span>
          <h2 id="product-dialog-title" className="detail-title">
            {productTitles[p.category]}
          </h2>
          <VariantChooser product={p} onChange={choose} />
          <p className="detail-use">{p.description}</p>
          <strong>{money(p.price)}</strong>
          <button
            className="primary full"
            onClick={() => {
              shop.add(p.id);
              close();
            }}
          >
            Ajouter au panier · {money(p.price)} <Plus size={17} />
          </button>
          <p className="demo-note">
            Démonstration uniquement. Référence, format, composition et
            disponibilité à confirmer.
          </p>
          <Link
            className="text-link detail-route"
            to={`/produit/${p.id}`}
            onClick={close}
          >
            Voir la fiche complète
          </Link>
        </div>
      </div>
    </dialog>
  );
}
