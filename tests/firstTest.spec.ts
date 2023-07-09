import { test, expect} from "@playwright/test";

test("First test", async({page})=>{
    await page.goto("https://skleptest.pl/");
    const siteTitle = await page.locator("//a[@class='site-title']");
    await expect(siteTitle).toHaveText("Generic Shop");
})