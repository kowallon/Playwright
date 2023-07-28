import { test, expect} from "@playwright/test";
import { ProductPage } from "../POM/productPage";
import { AccountPage } from "../POM/accountPage";
import { BasketPage } from "../POM/basketPage";
//@ts-check

const baseURL = "https://skleptest.pl/";

test.describe("Testy e2e", ()=>{

    test.beforeEach(async ({page})=>{
        await page.goto(baseURL);
    })

    test("First test", async({page})=>{
    
        const siteTitle = await page.locator("//a[@class='site-title']");
        await expect(siteTitle).toContainText("Generic Shop");
    });
    
    
    test("Login @fast", async({page})=>{

        const accountPage = new AccountPage(page)
        
        await page.click("//a[.='Most Wanted']");
        console.log(page.url());
        await expect(page.url()).toContain("/most-wanted");
        await expect(page.locator("//h1")).toContainText("Most Wanted");
        await page.click("//a[contains(@href, 'my-account')]")
        await accountPage.logIn()
        
    })
    
    test("Lost password", async ({page}) => {
       
        await page.click("//a[contains(@href, 'my-account')]")
        await page.click("text=Lost your password", {force:true})
        await expect(page.locator("//h1")).toBeVisible()
        await expect(page.locator("//h1")).toContainText("Lost");
    })

    test("Test with POM", async({page})=>{
        const productPage = new ProductPage(page);

        await productPage.visitProduct('amari-shirt')
        await productPage.descriptionIsDisplayed()
        await page.evaluate(() => {
            window.scrollBy(0, 900);
          });
        await productPage.recommendedSectionDisplayed()
        await productPage.addToBasket()
    })

    test("Add products to basket and update quantity",async ({page}) => {
        const accountPage = new AccountPage(page)
        const productPage = new ProductPage(page);
        const basketPage = new BasketPage(page);
        
        await page.click("//a[.='Most Wanted']");
        console.log(page.url());
        await expect(page.url()).toContain("/most-wanted");
        await expect(page.locator("//h1")).toContainText("Most Wanted");
        await page.click("//a[contains(@href, 'my-account')]")
        await accountPage.logIn()
        await page.locator("//a[@title='Shop']").click()

        await productPage.visitProduct('little-black-top')
        await productPage.descriptionIsDisplayed()

        await productPage.selectQuantity("2");
        await productPage.addToBasket();

        await basketPage.visitBasket();
        await basketPage.modifyBasket();
    })

})






