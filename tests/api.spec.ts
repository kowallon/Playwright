import { Expect, expect, test } from "@playwright/test";

test.describe("API Tests ", ()=>{
    const baseUrl = "https://jsonplaceholder.typicode.com"
    test("Verify Status code",async ({request}) => {
        const response = await request.get(`${baseUrl}/posts`)
        //console.log(response)
        await expect(response.status()).toBe(200)
    })

    test("Verify first post",async ({request}) => {
        const response = await request.get(`${baseUrl}/posts/1`)
        const responseBody = JSON.parse(await response.text());
        await expect(response.status()).toBe(200)
        console.log(responseBody)
        await expect(responseBody).toHaveProperty('body')
    })

    test("Verify POST",async ({request}) => {
        const response = await request.post(`${baseUrl}/posts`, {
            data: {
                title: "Title of my post",
                body: "Content of my post",
                userId: 2
            }
        })
        await expect(response.status()).toBe(201)  
    })


})