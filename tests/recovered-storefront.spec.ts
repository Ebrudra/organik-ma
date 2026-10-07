import { test, expect } from "@playwright/test";

test("recovered home variants update hero price and keep usage/origin cart identity", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const argan = page
    .locator(".collection .product")
    .filter({
      has: page.getByRole("heading", { name: "Huile d’argan", exact: true }),
    });
  await argan.getByLabel("Choisir le type d’argan").selectOption("cosmétique");
  await argan
    .getByLabel("Choisir l’origine de l’argan")
    .selectOption("Essaouira");
  await expect(argan.locator(".price")).toHaveText("170 MAD");
  await page.getByRole("button", { name: "Afficher Huile d’argan" }).click();
  await expect(page.locator(".current .hero-buy")).toContainText("170 MAD");
  await expect(page.locator(".current .hero-buy")).toContainText("Essaouira");
  await page
    .locator(".current")
    .getByRole("button", { name: "Choisir mon produit" })
    .click();
  const detail = page.getByRole("dialog");
  await expect(detail.getByLabel("Choisir le type d’argan")).toHaveValue(
    "cosmétique",
  );
  await expect(detail).toContainText("Ne pas ingérer");
  await detail.getByRole("button", { name: /Ajouter au panier/ }).click();
  await expect(page.locator(".cart-line")).toHaveCount(1);
  await expect(page.locator(".cart-total")).toContainText("170 MAD");
  await page.keyboard.press("Escape");
  await argan.getByLabel("Choisir le type d’argan").selectOption("alimentaire");
  await argan
    .getByRole("button", { name: "Ajouter Huile d’argan au panier" })
    .click();
  await expect(page.locator(".cart-line")).toHaveCount(2);
  await expect(page.locator(".cart-total")).toContainText("350 MAD");
});

test("six-second autoplay pauses after manual interaction on both heroes", async ({
  page,
}) => {
  await page.clock.install();
  for (const route of ["/", "/luna"]) {
    await page.goto(route);
    await expect(page.locator(".slide-counter")).toContainText("01");
    await page.clock.runFor(6100);
    await expect(page.locator(".slide-counter")).toContainText("02");
    await page.clock.runFor(1600);
    await page.getByRole("button", { name: "Produit suivant" }).click();
    await expect(page.locator(".slide-counter")).toContainText("03");
    await expect(
      page.getByRole("button", { name: "Reprendre le défilement" }),
    ).toBeVisible();
    await page.clock.runFor(13000);
    await expect(page.locator(".slide-counter")).toContainText("03");
  }
});
