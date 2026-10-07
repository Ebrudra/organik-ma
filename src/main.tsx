import React, { useEffect, useRef, useState } from "react";
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
import { Shop, useShop } from "./shop";
import Storefront from "./Storefront";
import { BrandedJar, productTitles, productThemes } from "./BrandedJar";
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
    setVisible(true);
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
function Arrow() {
  return (
    <svg
      className="arrow-icon"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path
        d="M3 13 13 3M3 3h10v10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
function Header() {
  const shop = useShop();
  const [menu, setMenu] = useState(false);
  const loc = useLocation();
  useEffect(() => setMenu(false), [loc.pathname]);
  return (
    <>
      <a className="skip" href="#contenu">
        Aller au contenu
      </a>
      <div className="announcement">
        Quatre essentiels. Toute une gourmandise.
      </div>
      <header>
        <Link className="brand" to="/" aria-label="Organik, accueil">
          <img src="/assets/original/logo.png" alt="organik.ma" />
        </Link>
        <nav
          id="navigation"
          className={menu ? "nav open" : "nav"}
          aria-label="Navigation principale"
        >
          <NavLink to="/" end>
            Original
          </NavLink>
          <NavLink to="/luna">Luna</NavLink>
          <NavLink to="/boutique">La boutique</NavLink>
          <NavLink to="/blog">Le journal</NavLink>
          <NavLink to="/esprit-organik">L’esprit organik</NavLink>
        </nav>
        <div className="header-actions">
          <span className="locale">MAROC / MAD</span>
          <button
            className="bag"
            onClick={shop.open}
            aria-label={`Ouvrir le panier, ${shop.lines.reduce((n, l) => n + l.quantity, 0)} articles`}
          >
            <svg
              width="20"
              height="24"
              viewBox="0 0 24 28"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <path d="M4 9h16l2 16H2L4 9Zm4 0V6a4 4 0 0 1 8 0v3" />
            </svg>
            <span className="bag-label">Panier</span>
            <b>{shop.lines.reduce((n, l) => n + l.quantity, 0)}</b>
          </button>
          <button
            className="mobile-menu"
            aria-label={menu ? "Fermer le menu" : "Menu"}
            aria-expanded={menu}
            aria-controls="navigation"
            onClick={() => setMenu(!menu)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                d={menu ? "m6 6 12 12M6 18 18 6" : "M4 5h16M4 12h16M4 19h16"}
              />
            </svg>
          </button>
        </div>
      </header>
    </>
  );
}
function ProductCard({ product: p }: { product: Product }) {
  const shop = useShop();
  return (
    <article className="product product-card">
      <Link
        to={`/produit/${p.id}`}
        className="product-image"
        style={{ background: productThemes[p.category].background }}
        aria-label={`Découvrir ${p.name}, ${p.origin}`}
      >
        <BrandedJar category={p.category} />
      </Link>
      <div className="variant-card-copy">
        <span className="eyebrow">{productTitles[p.category]}</span>
        <h2>
          <Link to={`/produit/${p.id}`}>{p.variant}</Link>
        </h2>
        <p>
          {p.size}
          {p.category !== "miel" && ` · ${p.origin}`}
        </p>
        <strong>{money(p.price)}</strong>
        <button
          className="primary full"
          aria-label={`Ajouter ${p.name}, ${p.origin} au panier`}
          onClick={() => shop.add(p.id)}
        >
          Ajouter au panier
        </button>
      </div>
    </article>
  );
}
function Boutique() {
  const location = useLocation();
  const initialCategory =
    new URLSearchParams(location.search).get("categorie") ||
    new URLSearchParams(location.search).get("category") ||
    "";
  const [filters, setFilters] = useState({
    ...defaultFilters,
    category: initialCategory,
  });
  useEffect(() => {
    setFilters({
      ...defaultFilters,
      category:
        new URLSearchParams(location.search).get("categorie") ||
        new URLSearchParams(location.search).get("category") ||
        "",
    });
  }, [location.search]);
  const result = filterCatalog(filters);
  const origins = [...new Set(catalog.map((p) => p.origin))];
  return (
    <div className="shop-page">
      <div className="page-intro">
        <p className="eyebrow">LE GARDE-MANGER ORGANIK</p>
        <h1>La boutique</h1>
        <p>
          Miels, huiles et amlou : trouvez votre variété, votre usage et votre
          origine.
        </p>
        <p className="demo-note">
          Catalogue de démonstration : 18 références. Les prix signalés et les
          informations non confirmées devront être validés avant la vente.
        </p>
      </div>
      <div className="shop-filters">
        <label className="shop-search">
          Rechercher
          <input
            type="search"
            placeholder="Thym, argan, Essaouira…"
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
        <div className="catalog variant-catalog">
          {result.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="shop-empty">
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
          <BrandedJar category={p.category} eager />
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
    <section className="about-page" id="esprit">
      <div className="page-intro">
        <span className="eyebrow">L’ESPRIT ORGANIK</span>
        <h1>
          Des produits simples.
          <br />
          <em>Des liens qui comptent.</em>
        </h1>
        <p>
          Du miel sur du pain chaud, un filet d’huile d’olive, une cuillère
          d’amlou. Organik réunit quatre essentiels pour ces petits rituels du
          quotidien.
        </p>
      </div>
      <div className="about-grid">
        <article>
          <span className="eyebrow">01 · L’ÉQUIPE</span>
          <h2>Les personnes derrière organik</h2>
          <p>
            Choisir les produits, préparer les commandes, répondre à vos
            questions : notre projet se construit autour de ces attentions
            concrètes.
          </p>
          <p className="content-pending">
            À compléter : noms, rôles, histoire de l’équipe et portrait
            collectif.
          </p>
        </article>
        <article>
          <span className="eyebrow">02 · LES FOURNISSEURS</span>
          <h2>Une origine à connaître</h2>
          <p>
            Le catalogue distingue Agadir et Essaouira pour l’argan et l’amlou,
            ainsi qu’Agadir et Béni Mellal pour les huiles d’olive. Chaque
            référence affiche l’origine renseignée.
          </p>
          <p className="content-pending">
            À compléter : producteurs et coopératives partenaires, lieux de
            production et informations de traçabilité.
          </p>
        </article>
      </div>
      <section className="selection-section">
        <span className="eyebrow">03 · NOTRE GRILLE DE SÉLECTION</span>
        <h2>Comprendre ce qui entre dans le pot</h2>
        <p>
          Avant de référencer un produit, nous souhaitons documenter trois
          éléments. Les informations confirmées seront ensuite ajoutées aux
          fiches.
        </p>
        <div className="selection-grid">
          {[
            [
              "L’origine",
              "Identifier le producteur, la région et la provenance de chaque lot.",
            ],
            [
              "La composition",
              "Préciser les ingrédients, les allergènes et l’usage alimentaire ou cosmétique.",
            ],
            [
              "Le goût et la conservation",
              "Décrire le profil du produit, son conditionnement et les conseils pour le conserver.",
            ],
          ].map(([h, p]) => (
            <article key={h}>
              <h3>{h}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="gallery-section">
        <span className="eyebrow">04 · LA GALERIE</span>
        <h2>Au fil des ingrédients</h2>
        <p>
          Images d’ambiance illustratives de remplacement. Les photographies de
          l’équipe et des partenaires seront ajoutées lorsqu’elles seront
          disponibles.
        </p>
        <div className="about-gallery">
          {[
            ["recolte", "Autour du miel"],
            ["verger", "Le monde de l’olive"],
            ["atelier", "Argan, amandes et amlou"],
          ].map(([src, caption]) => (
            <figure key={src}>
              <img
                src={`/assets/${src}.svg`}
                alt={`Illustration de remplacement : ${caption}`}
                loading="lazy"
              />
              <figcaption>{caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <Link className="primary" to="/boutique">
        Découvrir la boutique
      </Link>
    </section>
  );
}
function ArticleCard({ article: a }: { article: (typeof articles)[number] }) {
  return (
    <article className="article-card journal-card">
      <Link to={`/blog/${a.slug}`}>
        <img
          loading="lazy"
          src={`/assets/${a.image}.svg`}
          alt="Illustration de remplacement"
        />
        <div className="journal-card-copy article-meta">
          <span>
            {a.kicker} · {a.minutes} min
          </span>
          <h3>{a.title}</h3>
          <p>{a.intro}</p>
          <span className="text-link">
            Lire l’article <Arrow />
          </span>
        </div>
      </Link>
    </article>
  );
}
function Journal() {
  return (
    <div className="journal-page">
      <div className="page-intro">
        <p className="eyebrow">RECETTES, GESTES & INSPIRATIONS</p>
        <h1>Le journal organik.</h1>
        <p>À cuisiner, à partager, à découvrir. Prenons le temps.</p>
        <p className="notice">
          Six articles réécrits pour cette reconstruction. Les recettes sont des
          propositions, les données produit restent à confirmer.
        </p>
      </div>
      <div className="journal-grid">
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
                    {s.label} <Arrow />
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
            Voir la sélection <Arrow />
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
              Explorer la boutique <Arrow />
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
                        <span>
                          <span className="sr-only">Quantité : </span>
                          {l.quantity}
                        </span>
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
      <Link to="/" className="footer-brand">
        <img src="/assets/original/logo.png" alt="organik.ma" />
      </Link>
      <p>Miel. Olive. Argan. Amlou.</p>
      <span>© {new Date().getFullYear()} organik.ma</span>
      <span className="made-by">Made by SET &amp; GHO</span>
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
