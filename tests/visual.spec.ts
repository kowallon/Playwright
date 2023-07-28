import { expect, test } from "@playwright/test";



test("Do screens", async({page})=>{
        await page.goto("https://skleptest.pl/")
        await page.screenshot({ path: 'tests/screens/screenshot.png', fullPage: true });
        
})

test("Compare screen", async ({page})=>{
    await page.goto("https://skleptest.pl/")
    const screen = await page.screenshot({ path: 'tests/screens/screenshot2.png',fullPage : true})
    await expect(screen).toMatchSnapshot('tests/screens/screenshot.png')
})