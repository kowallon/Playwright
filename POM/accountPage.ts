import { expect, type Locator, type Page } from "@playwright/test";

export class AccountPage{
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passInput: Locator;
    readonly login: string;
    readonly pass: string;
    readonly submitBtn: Locator;
    readonly myAccountHeader: Locator;

    constructor(page: Page){
        this.page = page;
        this.emailInput = page.locator("//input[@id='username']");
        this.passInput = page.locator("//input[@id='password']");
        this.login = "Test@playwright.pl";
        this.pass ="Playwright123!"
        this.submitBtn = page.locator("//input[@name='login']")
        this.myAccountHeader = page.locator("//h1[.='My account']")
    }

    async logIn(){
        await this.emailInput.type(this.login);
        await this.passInput.type(this.pass);
        await this.submitBtn.click()

        await expect(this.myAccountHeader).toBeVisible();

    }


}