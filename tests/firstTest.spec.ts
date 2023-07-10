import { test, expect} from "@playwright/test";

const baseURL = "https://skleptest.pl/";

test("First test", async({page})=>{
    await page.goto(baseURL);
    const siteTitle = await page.locator("//a[@class='site-title']");
    await expect(siteTitle).toContainText("Generic Shop");
});


test.only("Visit most wanted category", async({page})=>{
    await page.goto(baseURL);
    await page.click("//a[.='Most Wanted']");
    //console.log(page.url());
    await expect(page.url()).toContain("/most-wanted");
    await expect(page.locator("//h1")).toContainText("Most Wanted");
    await page.click("//a[contains(@href, 'my-account')]")
    await page.click("//input[@name='login']");
    await expect(page.locator(".woocommerce-error")).toBeVisible();
})