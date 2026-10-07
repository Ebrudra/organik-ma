import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  catalog,
  categoryNames,
  defaultFilters,
  filterCatalog,
  money,
  type Category,
  type Product,
} from "./catalog";
import {
  addLine,
  cartTotal,
  CART_KEY,
  sanitizeCart,
  setQuantity,
  type CartLine,
} from "./cart";
import { articles } from "./articles";
import "./style.css";
type ShopState = {
  lines: CartLine[];
  add: (id: string) => void;
  change: (id: string, n: number) => void;
  clear: () => void;
  open: () => void;
  announcement: string;
};
const Shop = createContext<ShopState>(null!);
const useShop = () => useContext(Shop);
const storageRead = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};
function App() {
  const [lines, setLines] = useState<CartLine[]>(() =>
    sanitizeCart(storageRead(CART_KEY)),
  );
  const [visible, setVisible] = useState(false);
  const [announcement, announce] = useState("");
  const [storageWarning, setStorageWarning] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines));
      setStorageWarning(false);
    } catch {
      setStorageWarning(true);
    }
  }, [lines]);
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === CART_KEY) setLines(sanitizeCart(storageRead(CART_KEY)));
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  const add = (id: string) => {
    setLines((l) => addLine(l, id));
    announce(`${catalog.find((p) => p.id === id)?.name} ajouté au panier`);
  };
  return (
    <Shop.Provider
      value={{
        lines,
        add,
        change: (id, n) => setLines((l) => setQuantity(l, id, n)),
        clear: () => setLines([]),
        open: () => setVisible(true),
        announcement,
      }}
    >
      <BrowserRouter>
        <ScrollManager />
        <Header />
        <main id="contenu">
          <Routes>
            <Route path="/" element={<Storefront luna={false} />} />
            <Route path="/luna" element={<Storefront luna />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/produit/:id" element={<ProductPage />} />
            <Route path="/esprit-organik" element={<About />} />
            <Route path="/blog" element={<Journal />} />
            <Route path="/blog/:slug" element={<ArticlePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        {visible && <Cart close={() => setVisible(false)} />}
        <div className="sr-only" role="status" aria-live="polite">
          {announcement}
        </div>
        {storageWarning && (
          <p className="storage-warning" role="status">
            Stockage indisponible : votre panier reste en mémoire pendant cette
            visite.
          </p>
        )}
      </BrowserRouter>
    </Shop.Provider>
  );
}
function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles: Record<string, string> = {
      "/": "Les saveurs du Maroc",
      "/luna": "Luna",
      "/boutique": "La boutique",
      "/esprit-organik": "L’esprit organik",
      "/blog": "Le journal organik",
    };
    document.title = `${titles[pathname] || "Découvrir"} — Organik`;
  }, [pathname]);
  return null;
}
function Header() {
  const shop = useShop();
  const [menu, setMenu] = useState(false);
  const loc = useLocation();
  useEffect(() => setMenu(false), [loc.pathname]);
  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <div className="topbar">
        Les saveurs du Maroc, simplement.{" "}
        <span>Site de démonstration · prix à confirmer</span>
      </div>
      <header className="header">
        <Link to="/" aria-label="Organik, accueil">
          <img
            className="logo"
            src="/assets/logo.svg"
            alt="Organik — les saveurs du Maroc"
          />
        </Link>
        <button
          className="mobile-menu"
          aria-expanded={menu}
          aria-controls="navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Fermer" : "Menu"}
        </button>
        <nav
          id="navigation"
          className={menu ? "nav expanded" : "nav"}
          aria-label="Navigation principale"
        >
          <NavLink to="/" end>
            Accueil
          </NavLink>
          <NavLink to="/boutique">La boutique</NavLink>
          <NavLink to="/esprit-organik">L’esprit organik</NavLink>
          <NavLink to="/blog">Le journal</NavLink>
        </nav>
        <button
          className="cart-button"
          onClick={shop.open}
          aria-label={`Ouvrir le panier, ${shop.lines.reduce((n, l) => n + l.quantity, 0)} articles`}
        >
          <svg width="20" height="24" viewBox="0 0 24 28" aria-hidden="true">
            <path
              d="M4 9h16l2 16H2L4 9Zm4 0V6a4 4 0 0 1 8 0v3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
          <span>Panier</span>
          <b>{shop.lines.reduce((n, l) => n + l.quantity, 0)}</b>
        </button>
      </header>
    </>
  );
}
const heroProducts = [
  catalog[0],
  catalog.find((p) => p.id === "olive-agadir")!,
  catalog.find((p) => p.id === "argan-culinaire-agadir")!,
  catalog.find((p) => p.id === "amlou-agadir")!,
];
const heroCopy = [
  {
    word: "miel",
    eyebrow: "LA DOUCEUR À L’ÉTAT SIMPLE",
    title: "Un peu de douceur.\nBeaucoup de caractère.",
    body: "À la cuillère, sur une tartine, dans vos recettes. Découvrez notre sélection de miels.",
  },
  {
    word: "olive",
    eyebrow: "LE GOÛT DES TERRES MAROCAINES",
    title: "Le soleil s’invite\nà votre table.",
    body: "Un filet d’huile, du pain et le plaisir des choses simples. Explorez les huiles d’olive.",
  },
  {
    word: "argan",
    eyebrow: "UN TRÉSOR À DÉCOUVRIR",
    title: "L’argan,\ntout simplement.",
    body: "Deux usages bien distincts : le goût en cuisine, le geste dans le soin. Choisissez votre argan.",
  },
  {
    word: "amlou",
    eyebrow: "LE PLAISIR DE PARTAGER",
    title: "Les matins ont\nun goût d’amlou.",
    body: "Une invitation à prendre son temps et à réunir tout le monde autour de la table.",
  },
];
function OriginalHero() {
  return <Hero variant="original" />;
}
function LunaHero() {
  return <Hero variant="luna" />;
}
function Hero({ variant }: { variant: "original" | "luna" }) {
  const [slide, setSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const locked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const c = heroCopy[slide],
    p = heroProducts[slide];
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function move(d: number) {
    if (locked.current) return;
    locked.current = true;
    setDirection(d);
    setSlide((n) => (n + d + 4) % 4);
    timer.current = setTimeout(
      () => {
        locked.current = false;
      },
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 80 : 600,
    );
  }
  return (
    <section
      className={`hero ${variant} tone-${p.category}`}
      aria-roledescription="carrousel"
      aria-label={`Sélection de produits — ${variant === "luna" ? "Luna" : "Original"}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          move(e.key === "ArrowRight" ? 1 : -1);
        }
      }}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x,
          dy = e.changedTouches[0].clientY - touch.current.y;
        touch.current = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5)
          move(dx < 0 ? 1 : -1);
      }}
    >
      <span className="hero-word" aria-hidden="true" key={`word-${slide}`}>
        {c.word}
      </span>
      <div className="hero-copy" key={`copy-${slide}`}>
        <p className="eyebrow">{c.eyebrow}</p>
        <h1>
          {c.title.split("\n").map((t, i) => (
            <React.Fragment key={t}>
              {i > 0 && <br />}
              {t}
            </React.Fragment>
          ))}
        </h1>
        <p>{c.body}</p>
        <Link className="button dark" to={`/boutique?category=${p.category}`}>
          Découvrir {categoryNames[p.category].toLowerCase()} <span>↗</span>
        </Link>
      </div>
      <div
        className="hero-visual"
        key={`jar-${slide}`}
        style={{ "--direction": direction } as React.CSSProperties}
      >
        <span className="orbit orbit-one" />
        <span className="orbit orbit-two" />
        <img
          src={p.image}
          alt={`${p.name} — illustration de pot Organik`}
          className="hero-jar"
        />
        <span className="hero-caption">
          {p.variant}
          <br />
          <small>{p.size || p.origin}</small>
        </span>
      </div>
      <div className="hero-bottom">
        <span className="slide-counter">
          0{slide + 1}
          <i />
          04
        </span>
        <div className="slide-dots" aria-hidden="true">
          {heroProducts.map((item, i) => (
            <span key={item.id} className={i === slide ? "selected" : ""} />
          ))}
        </div>
        <div className="hero-controls">
          <button onClick={() => move(-1)} aria-label="Produit précédent">
            ←
          </button>
          <button onClick={() => move(1)} aria-label="Produit suivant">
            →
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {slide + 1} sur 4 : {p.name}
      </p>
    </section>
  );
}
function Storefront({ luna }: { luna: boolean }) {
  return (
    <>
      {luna ? <LunaHero /> : <OriginalHero />}
      <div className="hero-switch">
        <span>Une sélection. Deux façons de la découvrir.</span>
        <Link to={luna ? "/" : "/luna"}>
          {luna ? "Voir le hero Original" : "Découvrir Luna"} ↗
        </Link>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">QUATRE ESSENTIELS, MILLE ENVIES</p>
            <h2>Le Maroc à votre table.</h2>
          </div>
          <Link className="text-link" to="/boutique">
            Toute la boutique ↗
          </Link>
        </div>
        <div className="product-grid">
          {heroProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="story-block">
        <img
          src="/assets/verger.svg"
          alt="Illustration d’un verger marocain, scène de remplacement"
        />
        <div>
          <p className="eyebrow">L’ESPRIT ORGANIK</p>
          <h2>
            Le goût des choses
            <br />
            qui ont du sens.
          </h2>
          <p>
            Des produits simples, une curiosité pour leurs origines et l’envie
            de les partager. Entrez dans l’univers Organik.
          </p>
          <Link className="button dark" to="/esprit-organik">
            Notre démarche ↗
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">RECETTES & INSPIRATIONS</p>
            <h2>Le journal organik.</h2>
          </div>
          <Link className="text-link" to="/blog">
            Tous les articles ↗
          </Link>
        </div>
        <div className="article-grid">
          {articles.slice(0, 3).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </>
  );
}
function ProductCard({ product: p }: { product: Product }) {
  const shop = useShop();
  return (
    <article className="product-card">
      <Link
        to={`/produit/${p.id}`}
        className={`product-picture tone-${p.category}`}
      >
        <span className="product-tag">{categoryNames[p.category]}</span>
        <img
          loading="lazy"
          src={p.image}
          alt={`${p.name}, illustration de remplacement`}
        />
        <span className="picture-arrow">↗</span>
      </Link>
      <div className="product-meta">
        <span>
          {p.origin}
          {p.size && ` · ${p.size}`}
        </span>
        <h3>
          <Link to={`/produit/${p.id}`}>{p.name}</Link>
        </h3>
        <p>{p.variant}</p>
        <div className="product-price">
          <strong>{money(p.price)}</strong>
          <button
            aria-label={`Ajouter ${p.name}, ${p.origin} au panier`}
            onClick={() => shop.add(p.id)}
          >
            +
          </button>
        </div>
        {p.provisional && (
          <small className="provisional">Prix / référence provisoires</small>
        )}
      </div>
    </article>
  );
}
function Boutique() {
  const location = useLocation();
  const initialCategory =
    new URLSearchParams(location.search).get("category") || "";
  const [filters, setFilters] = useState({
    ...defaultFilters,
    category: initialCategory,
  });
  useEffect(() => {
    setFilters({
      ...defaultFilters,
      category: new URLSearchParams(location.search).get("category") || "",
    });
  }, [location.search]);
  const result = filterCatalog(filters);
  const origins = [...new Set(catalog.map((p) => p.origin))];
  return (
    <div className="page section">
      <div className="page-heading">
        <p className="eyebrow">LES ESSENTIELS ORGANIK</p>
        <h1>La boutique.</h1>
        <p>Miels, huiles et amlou. À chacun sa découverte.</p>
        <p className="notice">
          Catalogue de démonstration : 18 références. Les prix signalés et les
          informations non confirmées devront être validés avant la vente.
        </p>
      </div>
      <div className="filters">
        <label className="search-label">
          Rechercher
          <input
            type="search"
            placeholder="Un produit, une origine…"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </label>
        <label>
          Origine
          <select
            aria-label="Origine"
            value={filters.origin}
            onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
          >
            <option value="">Toutes les origines</option>
            {origins.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label>
          Trier par
          <select
            aria-label="Trier par"
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="default">Notre sélection</option>
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
          </select>
        </label>
      </div>
      <div className="filter-bar">
        <div className="category-filters" role="group" aria-label="Catégories">
          <button
            aria-pressed={!filters.category}
            onClick={() => setFilters({ ...filters, category: "" })}
          >
            Tout voir
          </button>
          {(Object.keys(categoryNames) as Category[]).map((c) => (
            <button
              key={c}
              aria-pressed={filters.category === c}
              onClick={() => setFilters({ ...filters, category: c })}
            >
              {categoryNames[c]}
            </button>
          ))}
        </div>
        <button
          className="reset"
          onClick={() => setFilters({ ...defaultFilters })}
        >
          Réinitialiser
        </button>
      </div>
      <p className="result-count" role="status">
        {result.length} {result.length === 1 ? "référence" : "références"}
      </p>
      {result.length ? (
        <div className="product-grid">
          {result.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Aucune référence trouvée.</h2>
          <p>Essayez un autre mot ou une autre origine.</p>
          <button
            className="button dark"
            onClick={() => setFilters({ ...defaultFilters })}
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}
function ProductPage() {
  const { id } = useParams();
  const p = catalog.find((p) => p.id === id);
  const shop = useShop();
  if (!p) return <NotFound />;
  const variants = catalog.filter((item) => item.category === p.category);
  return (
    <div className="page section">
      <Link className="text-link" to="/boutique">
        ← Retour à la boutique
      </Link>
      <div className="product-detail">
        <div className={`detail-picture tone-${p.category}`}>
          <img src={p.image} alt={`${p.name} — illustration de remplacement`} />
        </div>
        <div>
          <p className="eyebrow">
            {categoryNames[p.category]} · {p.usage}
          </p>
          <h1>{p.name}</h1>
          <p className="detail-price">{money(p.price)}</p>
          <p>{p.description}</p>
          <p className="variant-label" id="variant-label">
            Choisir une référence
          </p>
          <div
            className="variant-links"
            role="group"
            aria-labelledby="variant-label"
          >
            {variants.map((v) => (
              <Link
                key={v.id}
                aria-current={v.id === p.id ? "true" : undefined}
                to={`/produit/${v.id}`}
              >
                {v.variant} · {v.origin}
                {v.size && ` · ${v.size}`}
                <small>{money(v.price)}</small>
              </Link>
            ))}
          </div>
          <dl>
            <dt>Origine</dt>
            <dd>{p.origin}</dd>
            {p.size && (
              <>
                <dt>Format</dt>
                <dd>{p.size}</dd>
              </>
            )}
            <dt>Référence</dt>
            <dd>{p.id}</dd>
          </dl>
          <button className="button dark" onClick={() => shop.add(p.id)}>
            Ajouter au panier · {money(p.price)}
          </button>
          <p className="notice">
            {p.provisional
              ? "Prix et référence provisoires. "
              : "Tarif fourni dans le cahier de reconstruction. "}
            Conditionnement, composition, allergènes et disponibilité à
            confirmer. Aucune commande réelle sur ce site.
          </p>
        </div>
      </div>
    </div>
  );
}
function About() {
  return (
    <div className="page">
      <section className="section page-heading">
        <p className="eyebrow">L’ESPRIT ORGANIK</p>
        <h1>
          Simplement bon.
          <br />
          Profondément partagé.
        </h1>
        <p>
          Une sélection inspirée des saveurs marocaines et des moments que l’on
          aime passer à table.
        </p>
      </section>
      <img
        className="about-banner"
        src="/assets/recolte.svg"
        alt="Illustration de paysage marocain ; ne représente pas un fournisseur réel"
      />
      <section className="section about-sections">
        <div>
          <span className="section-number">01</span>
          <h2>Une équipe à découvrir.</h2>
          <p>
            Organik se reconstruit autour d’une idée simple : rendre ces
            produits faciles à découvrir et à choisir. La présentation de
            l’équipe, ses noms et ses portraits seront ajoutés après validation.
          </p>
        </div>
        <div>
          <span className="section-number">02</span>
          <h2>Des origines, des rencontres.</h2>
          <p>
            Agadir, Essaouira, Beni Mellal : ces origines figurent dans le
            catalogue de travail. Les profils des producteurs, les partenariats
            et leurs photos authentiques restent à documenter. Aucune relation
            commerciale n’est affirmée ici.
          </p>
        </div>
        <div>
          <span className="section-number">03</span>
          <h2>Choisir avec attention.</h2>
          <p>
            Miels, huiles d’olive, argan alimentaire et cosmétique, amlou. Notre
            sélection sera accompagnée de compositions, formats et informations
            vérifiés avant toute commercialisation.
          </p>
        </div>
      </section>
      <section className="section">
        <p className="eyebrow">CARNET D’INSPIRATIONS</p>
        <h2>Une terre, mille nuances.</h2>
        <p className="notice">
          Galerie illustrative : ces scènes dessinées ne sont pas des photos de
          notre équipe ou de partenaires.
        </p>
        <div className="gallery">
          {["verger", "atelier", "recolte", "rituel"].map((s, i) => (
            <figure key={s}>
              <img
                loading="lazy"
                src={`/assets/${s}.svg`}
                alt={`Scène illustrative ${["de verger", "de table", "des terres marocaines", "du quotidien"][i]}`}
              />
              <figcaption>
                {
                  [
                    "Au verger",
                    "Autour de la table",
                    "Terres du Maroc",
                    "Les gestes simples",
                  ][i]
                }{" "}
                · Illustration
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
function ArticleCard({ article: a }: { article: (typeof articles)[number] }) {
  return (
    <article className="article-card">
      <Link to={`/blog/${a.slug}`}>
        <img
          loading="lazy"
          src={`/assets/${a.image}.svg`}
          alt="Illustration de remplacement"
        />
        <div className="article-meta">
          <span>
            {a.kicker} · {a.minutes} min
          </span>
          <h3>{a.title}</h3>
          <p>{a.intro}</p>
          <span className="text-link">Lire l’article ↗</span>
        </div>
      </Link>
    </article>
  );
}
function Journal() {
  return (
    <div className="page section">
      <div className="page-heading">
        <p className="eyebrow">RECETTES, GESTES & INSPIRATIONS</p>
        <h1>Le journal organik.</h1>
        <p>À cuisiner, à partager, à découvrir. Prenons le temps.</p>
        <p className="notice">
          Six articles réécrits pour cette reconstruction. Les recettes sont des
          propositions, les données produit restent à confirmer.
        </p>
      </div>
      <div className="article-grid">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  );
}
function ArticlePage() {
  const { slug } = useParams();
  const a = articles.find((a) => a.slug === slug);
  if (!a) return <NotFound />;
  return (
    <article className="page">
      <div className="article-heading section">
        <Link className="text-link" to="/blog">
          ← Le journal organik
        </Link>
        <p className="eyebrow">
          {a.kicker} · {a.minutes} min de lecture
        </p>
        <h1>{a.title}</h1>
        <p>{a.intro}</p>
        <small>Contenu reconstruit · illustration de remplacement</small>
      </div>
      <img
        className="article-banner"
        src={`/assets/${a.image}.svg`}
        alt="Scène illustrative de remplacement"
      />
      <div className="article-body">
        {a.ingredients && (
          <section className="recipe-box">
            <h2>Les ingrédients</h2>
            <ul>
              {a.ingredients.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        )}
        {a.steps && (
          <section>
            <h2>La préparation</h2>
            <ol>
              {a.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </section>
        )}
        {a.sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
          </section>
        ))}
        {a.sources && (
          <section>
            <h2>Pour approfondir</h2>
            <ul>
              {a.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noreferrer" target="_blank">
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      <section className="section">
        <div className="section-heading">
          <h2>À découvrir en boutique.</h2>
          <Link className="text-link" to="/boutique">
            Voir la sélection ↗
          </Link>
        </div>
        <div className="product-grid">
          {a.products
            .map((id) => catalog.find((p) => p.id === id))
            .filter((p): p is Product => !!p)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
    </article>
  );
}
function Cart({ close }: { close: () => void }) {
  const shop = useShop();
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(
    document.activeElement as HTMLElement,
  );
  const [checkout, setCheckout] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const d = dialog.current;
    d?.showModal();
    return () => {
      d?.close();
      opener.current?.focus();
    };
  }, []);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    try {
      const previous = storageRead("organik.requests.v1");
      localStorage.setItem(
        "organik.requests.v1",
        JSON.stringify([
          ...(Array.isArray(previous) ? previous : []),
          {
            createdAt: new Date().toISOString(),
            name: data.get("name"),
            email: data.get("email"),
            lines: shop.lines,
            total: cartTotal(shop.lines),
            demo: true,
          },
        ]),
      );
      setSaved(true);
      shop.clear();
    } catch {
      setError(
        "Le stockage du navigateur est indisponible. La demande n’a pas été enregistrée ni envoyée.",
      );
    }
  }
  return (
    <dialog
      className="cart-dialog"
      aria-labelledby="cart-title"
      ref={dialog}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
    >
      <div className="cart-panel">
        <div className="cart-heading">
          <h2 id="cart-title">
            {saved ? "Demande enregistrée" : "Votre panier"}
          </h2>
          <button
            className="close"
            aria-label="Fermer le panier"
            onClick={close}
          >
            ×
          </button>
        </div>
        {saved ? (
          <div className="empty">
            <span className="success-mark">✓</span>
            <h3>Une démonstration, tout simplement.</h3>
            <p>
              Votre demande est enregistrée uniquement dans ce navigateur. Elle
              n’a pas été envoyée au marchand. Aucun paiement n’a été effectué.
            </p>
            <button className="button dark" onClick={close}>
              Continuer la découverte
            </button>
          </div>
        ) : shop.lines.length === 0 ? (
          <div className="empty">
            <h3>Votre panier attend ses premières découvertes.</h3>
            <Link className="button dark" onClick={close} to="/boutique">
              Explorer la boutique ↗
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {shop.lines.map((l) => {
                const p = catalog.find((p) => p.id === l.id)!;
                return (
                  <div className="cart-line" key={l.id}>
                    <img src={p.image} alt="" />
                    <div>
                      <Link to={`/produit/${p.id}`} onClick={close}>
                        {p.name}
                      </Link>
                      <small>
                        {p.variant} · {p.origin}
                        {p.size && ` · ${p.size}`}
                      </small>
                      <b>{money(p.price)}</b>
                      <div className="quantity">
                        <button
                          aria-label={`Diminuer ${p.name}, ${p.origin}`}
                          onClick={() => shop.change(p.id, l.quantity - 1)}
                        >
                          −
                        </button>
                        <span aria-label="Quantité">{l.quantity}</span>
                        <button
                          disabled={l.quantity >= 99}
                          aria-label={`Augmenter ${p.name}, ${p.origin}`}
                          onClick={() => shop.change(p.id, l.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className="remove"
                          onClick={() => shop.change(p.id, 0)}
                          aria-label={`Retirer ${p.name}, ${p.origin}`}
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                    <strong>{money(p.price * l.quantity)}</strong>
                  </div>
                );
              })}
            </div>
            <div className="cart-total">
              <span>Total indicatif</span>
              <strong>{money(cartTotal(shop.lines))}</strong>
            </div>
            <p className="notice">
              Prix en MAD. Démonstration uniquement : aucun paiement, envoi ou
              traitement commercial. Aucun frais de livraison calculé.
            </p>
            {!checkout ? (
              <button
                className="button dark full"
                onClick={() => setCheckout(true)}
              >
                Préparer une demande démo
              </button>
            ) : (
              <form className="demo-form" onSubmit={submit}>
                <h3>Demande de démonstration</h3>
                <p>
                  Enregistrée seulement dans ce navigateur. Aucun message ne
                  sera envoyé.
                </p>
                <label>
                  Nom
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  E-mail
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={200}
                  />
                </label>
                <label className="checkbox">
                  <input type="checkbox" required /> Je comprends que cette
                  demande reste locale et n’est pas une commande réelle.
                </label>
                {error && <p role="alert">{error}</p>}
                <button className="button dark full" type="submit">
                  Enregistrer dans ce navigateur
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </dialog>
  );
}
function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <Link to="/">
            <img className="logo" src="/assets/logo.svg" alt="Organik" />
          </Link>
          <p>
            Les saveurs du Maroc.
            <br />
            Le plaisir des choses simples.
          </p>
        </div>
        <div>
          <h3>Découvrir</h3>
          <Link to="/boutique">La boutique</Link>
          <Link to="/esprit-organik">L’esprit organik</Link>
          <Link to="/blog">Le journal organik</Link>
          <Link to="/luna">Luna</Link>
        </div>
        <div>
          <h3>En toute transparence</h3>
          <p>
            Site de démonstration.
            <br />
            Catalogue et prix à confirmer.
            <br />
            Aucune commande réelle.
          </p>
          <span className="footer-note">
            Identité et illustrations reconstituées.
          </span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Organik</span>
        <span>Made by SET & GHO</span>
      </div>
    </footer>
  );
}
function NotFound() {
  return (
    <div className="section page empty">
      <p className="eyebrow">404</p>
      <h1>Cette page n’est pas au menu.</h1>
      <Link className="button dark" to="/">
        Retour à l’accueil
      </Link>
    </div>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
