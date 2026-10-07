import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { chromium } from "@playwright/test";
const executablePath =
  process.env.CHROMIUM_PATH ||
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
const baseURL = process.env.ORGANIK_BASE_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({
  executablePath,
  args: ["--no-sandbox"],
});
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.goto(baseURL);
  await page.locator(".hero-copy h1").waitFor();
  assert.match(await page.locator("h1").innerText(), /douceur/);
  await page.getByRole("button", { name: "Produit suivant" }).click();
  assert.match(await page.locator(".slide-counter").innerText(), /02/);
  await page.goto(`${baseURL}/boutique`);
  await page.getByRole("searchbox").fill("ARGAN cosmetique");
  await page.getByLabel("Origine", { exact: true }).selectOption("Agadir");
  assert.equal(await page.locator(".product-card").count(), 1);
  await page.locator(".product-card button").click();

  assert.match(await page.locator(".cart-total").innerText(), /170 MAD/);
  await page.keyboard.press("Escape");
  await page.goto(`${baseURL}/blog`);
  assert.equal(await page.locator(".article-card").count(), 6);
  await page.goto(`${baseURL}/blog/amlou-maison`);
  await page.getByRole("heading", { name: "Les ingrédients" }).waitFor();
  await page.getByRole("heading", { name: "La préparation" }).waitFor();
  for (const img of await page.locator("img").all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((el) => el.decode());
  }
  assert.deepEqual(errors, []);
  console.log(
    "Smoke passed: hero, combined catalog search, cart price, blog, recipe and images.",
  );
} finally {
  await browser.close();
}
