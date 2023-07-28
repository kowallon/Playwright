import { expect, type Locator, type Page } from "@playwright/test";

export class ProductPage{
    readonly page: Page;
    readonly description: Locator;
    readonly addBtn: Locator;
    readonly recomennded: Locator;

    constructor(page: Page){
        this.page = page;
        this.description = page.locator("//div[contains(@class, 'short-description')]")
        this.addBtn = page.locator("//button[@name= 'add-to-cart']")
        this.recomennded = page.locator("//section[@class='related products']")
    }

    async visitProduct(product){
       await this.page.goto(`https://skleptest.pl/product/${product}/`)
    }

    async descriptionIsDisplayed(){
        await expect(this.description).toBeVisible()
    }

    async recommendedSectionDisplayed(){
        await expect(this.recomennded).toBeVisible()
        }

    async addToBasket(){
        await this.addBtn.click()
    }

    async selectQuantity(quantity : string){
        await this.page.locator("//input[@name='quantity']").clear()
        await this.page.locator("//input[@name='quantity']").type(quantity)
    }

}