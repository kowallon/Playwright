import { expect, type Locator, type Page } from "@playwright/test";

export class BasketPage{
    readonly page: Page;
    readonly basketBtn: Locator;
    readonly basketheader: Locator;
    readonly updateBtn: Locator;
    readonly increaseBtn: Locator;
    readonly totalPriceBox: Locator;
    readonly totalPrice: Locator;

    constructor(page: Page){
        this.page = page;
        this.basketBtn = page.locator(".top-cart")
        this.basketheader = page.locator("//h1[.='Cart']")
        this.increaseBtn = page.locator("//a[@data-increment='up']")
        this.updateBtn = page.locator("//input[@name='update_cart']")
        this.totalPrice = this.page.locator(".product-subtotal").last();
    }

    async visitBasket(){
        await this.basketBtn.click();
        await expect(this.basketheader).toBeVisible();
        await expect(this.updateBtn).toBeDisabled();
    }

    async modifyBasket(){
        await expect(this.totalPrice).toBeVisible()
        const oldPriceElement = await this.totalPrice.locator('.woocommerce-Price-amount');
        const oldPriceText = await oldPriceElement.innerText();

        const oldPriceValue = parseInt(oldPriceText, 10);
        
        await this.increaseBtn.click()
        await this.updateBtn.click()
        await this.page.waitForTimeout(3000)
        

        const newPriceElement= await this.totalPrice.locator('.woocommerce-Price-amount');
        const newPriceText = await newPriceElement.innerText();

        const newPriceValue = parseInt(newPriceText, 10);

        await expect(newPriceValue).toBeGreaterThan(oldPriceValue); 
    }

}