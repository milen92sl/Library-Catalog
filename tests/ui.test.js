const { test, expect } = require('@playwright/test');

test('Verify "All Books" link is visible', async ({ page }) => {
    // Await the page navigation to ensure it's completed before moving on.
    await page.goto("http://localhost:3000/");
    // Also await the waitForSelector to ensure the navbar is fully loaded.
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "Login button" is visible', async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForSelector('nav.navbar');
    const LoginLink = await page.$('#guest > a:nth-child(1)');
    const isLinkVisible = await LoginLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Check "Register button" is visible', async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.waitForSelector('nav.navbar');
    const RegisterButton= await page.$('a[href="/register"]');
    const isLinkVisible = await RegisterButton.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "All Books" link is visible for registered users', async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('#login-form > fieldset > input');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});

test('Verify "Logout button" is visible for already loged in users', async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('#login-form > fieldset > input');

    const logoutButton = await page.$('#logoutBtn');
    const isLogoutBtnVisible = await logoutButton.isVisible();
    expect(isLogoutBtnVisible).toBe(true);
});

test('Check is it possible to Add books with registered and logged in user', async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('#login-form > fieldset > input');

    const addBooksButton = await page.$('#user > a:nth-child(3)');
    const isAddBooksBtnVisible = await addBooksButton.isVisible();
    expect(isAddBooksBtnVisible).toBe(true);
});

test('Check is My Books section visible with registered and logged in user', async ({ page }) => {
    await page.goto("http://localhost:3000/login");

    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('#login-form > fieldset > input');

    const myBooksSectionButton = await page.$('#user > a:nth-child(2)');
    const isMyBooksBtnVisible = await myBooksSectionButton.isVisible();
    expect(isMyBooksBtnVisible).toBe(true);
});