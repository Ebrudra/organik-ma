import AxeBuilder from "@axe-core/playwright";
import { test, expect, type Page } from "@playwright/test";
async function checkImages(page: Page) {
  for (const img of await page.locator("img").all())
    await img.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((imgs) =>
          imgs.every(
            (i) =>
              (i as HTMLImageElement).complete &&
              (i as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
}
async function checkOverflow(page: Page) {
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
}
const routes = [
  "/",
  "/luna",
  "/boutique",
  "/esprit-organik",
  "/blog",
  "/blog/amlou-maison",
  "/blog/salade-pois-chiches",
  "/blog/poires-au-miel",
  "/blog/argan-culinaire-mode-emploi",
  "/blog/bienfaits-usages-quotidiens",
  "/blog/argan-cosmetique-rituel",
  "/produit/argan-culinaire-agadir",
];
test("direct routes, images, console, overflow and article links", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    await checkImages(page);
    await checkOverflow(page);
  }
  await page.goto("/blog/amlou-maison");
  await expect(
    page.getByRole("heading", { name: "Les ingrédients" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "La préparation" }),
  ).toBeVisible();
  await page.locator(".product-card a").first().click();
  await expect(page).toHaveURL(/\/produit\//);
  await page.goto("/");
  await page.waitForTimeout(800);
  await checkImages(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: `test-results/${info.project.name}-home.png`,
    fullPage: true,
  });
  await page.goto("/boutique");
  await page.waitForTimeout(800);
  await checkImages(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: `test-results/${info.project.name}-boutique.png`,
    fullPage: true,
  });
  expect(errors).toEqual([]);
});
test("navigation, keyboard and both hero controls guard rapid input", async ({
  page,
}, info) => {
  await page.goto("/");
  if (info.project.name === "mobile")
    await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "La boutique" })
    .click();
  await expect(page).toHaveURL(/boutique/);
  for (const route of ["/", "/luna"]) {
    await page.goto(route);
    const hero = page.locator(".hero");
    await expect(hero.locator(".hero-copy h1")).toContainText("douceur");
    await hero.focus();
    await page.keyboard.press("ArrowRight");
    await expect(hero.locator(".hero-copy h1")).toContainText("soleil");
    await page.waitForTimeout(700);
    await page.getByRole("button", { name: "Produit précédent" }).click();
    await expect(hero.locator(".hero-copy h1")).toContainText("douceur");
    await page.waitForTimeout(700);
    await page
      .getByRole("button", { name: "Produit suivant" })
      .evaluate((b: HTMLButtonElement) => {
        b.click();
        b.click();
        b.click();
      });
    await expect(hero.locator(".slide-counter")).toContainText("02");
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/luna");
  await page.getByRole("button", { name: "Produit suivant" }).click();
  await expect(page.locator(".hero-copy h1")).toContainText("soleil");
  expect(
    await page
      .locator(".hero-jar")
      .evaluate((e) => parseFloat(getComputedStyle(e).animationDuration)),
  ).toBeLessThan(0.01);
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Aller au contenu" }),
  ).toBeFocused();
});
test("horizontal gestures advance and reverse while vertical gestures preserve slide", async ({
  page,
}) => {
  await page.goto("/luna");
  const hero = page.locator(".hero");
  async function swipe(dx: number, dy: number) {
    await hero.evaluate(
      (el, { dx, dy }) => {
        el.dispatchEvent(
          new TouchEvent("touchstart", {
            bubbles: true,
            touches: [
              new Touch({
                identifier: 1,
                target: el,
                clientX: 200,
                clientY: 300,
              }),
            ],
          }),
        );
        el.dispatchEvent(
          new TouchEvent("touchend", {
            bubbles: true,
            changedTouches: [
              new Touch({
                identifier: 1,
                target: el,
                clientX: 200 + dx,
                clientY: 300 + dy,
              }),
            ],
          }),
        );
      },
      { dx, dy },
    );
  }
  await swipe(-100, 5);
  await expect(hero.locator(".slide-counter")).toContainText("02");
  await page.waitForTimeout(700);
  await swipe(100, 5);
  await expect(hero.locator(".slide-counter")).toContainText("01");
  await page.waitForTimeout(700);
  await swipe(-10, 150);
  await expect(hero.locator(".slide-counter")).toContainText("01");
  expect(await hero.evaluate((e) => getComputedStyle(e).touchAction)).toBe(
    "pan-y",
  );
});
test("accent-insensitive search, combined filters, prices, empty and reset", async ({
  page,
}) => {
  await page.goto("/boutique");
  await expect(page.getByRole("status").first()).toHaveText("18 références");
  await page.getByRole("searchbox").fill("ARGAN cosmetique");
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByLabel("Origine", { exact: true }).selectOption("Agadir");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await expect(page.locator(".product-card")).toContainText("170 MAD");
  await page.getByRole("button", { name: "Miels", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Aucune référence trouvée." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Réinitialiser les filtres" }).click();
  await expect(page.locator(".product-card")).toHaveCount(18);
  await page.getByLabel("Trier par").selectOption("desc");
  await expect(page.locator(".product-card").first()).toContainText("200 MAD");
  await page.getByLabel("Trier par").selectOption("asc");
  await expect(page.locator(".product-card").first()).toContainText("30 MAD");
});
test("variant identity, prices, quantities, removal, persistence and demo request", async ({
  page,
}) => {
  await page.goto("/produit/argan-culinaire-agadir");
  await expect(page.locator(".detail-price")).toHaveText("180 MAD");
  await page
    .getByRole("button", { name: "Ajouter au panier · 180 MAD" })
    .click();
  await page
    .locator(".variant-links")
    .getByRole("link", { name: /Cosmétique · Agadir/ })
    .click();
  await expect(page.locator(".detail-price")).toHaveText("170 MAD");
  await page
    .getByRole("button", { name: "Ajouter au panier · 170 MAD" })
    .click();
  await page
    .locator(".variant-links")
    .getByRole("link", { name: /Culinaire · Essaouira/ })
    .click();
  await page
    .getByRole("button", { name: "Ajouter au panier · 180 MAD" })
    .click();
  await page.reload();
  await page.getByRole("button", { name: /Ouvrir le panier/ }).click();
  await expect(page.locator(".cart-line")).toHaveCount(3);
  await expect(page.locator(".cart-total")).toContainText("530 MAD");
  await page
    .getByRole("button", {
      name: "Augmenter Huile d’argan culinaire, Agadir",
      exact: true,
    })
    .click();
  await expect(page.locator(".cart-total")).toContainText("710 MAD");
  await page
    .getByRole("button", {
      name: "Diminuer Huile d’argan culinaire, Agadir",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", {
      name: "Retirer Huile d’argan culinaire, Essaouira",
      exact: true,
    })
    .click();
  await expect(page.locator(".cart-line")).toHaveCount(2);
  await expect(page.locator(".cart-total")).toContainText("350 MAD");
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: /Ouvrir le panier/ }),
  ).toBeFocused();
  await page.goto("/blog");
  await page.getByRole("button", { name: /Ouvrir le panier/ }).click();
  await expect(page.locator(".cart-line")).toHaveCount(2);
  await page.getByRole("button", { name: "Préparer une demande démo" }).click();
  await page.getByLabel("Nom", { exact: true }).fill("Visiteur démo");
  await page.getByLabel("E-mail", { exact: true }).fill("demo@example.test");
  await page.getByRole("checkbox").check();
  const outgoing: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") outgoing.push(r.url());
  });
  await page
    .getByRole("button", { name: "Enregistrer dans ce navigateur" })
    .click();
  await expect(
    page.getByRole("heading", { name: "Demande enregistrée" }),
  ).toBeVisible();
  await expect(page.locator(".cart-panel")).toContainText(
    "Elle n’a pas été envoyée au marchand",
  );
  expect(outgoing).toEqual([]);
  expect(
    await page.evaluate(
      () =>
        JSON.parse(localStorage.getItem("organik.requests.v1") || "[]")[0]
          .total,
    ),
  ).toBe(350);
  await page.getByRole("button", { name: "Continuer la découverte" }).click();
  await page.getByRole("button", { name: /Ouvrir le panier/ }).click();
  await expect(page.locator(".cart-panel")).toContainText(
    "premières découvertes",
  );
});

test("accessible page and dialog names, contrast and structure", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/boutique",
    "/produit/argan-culinaire-agadir",
    "/blog/amlou-maison",
  ]) {
    await page.goto(route);
    await page.waitForTimeout(800);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
  await page.getByRole("button", { name: /Ouvrir le panier/ }).click();
  await page.waitForTimeout(800);
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
});
