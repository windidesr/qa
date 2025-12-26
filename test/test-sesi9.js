const {Builder, By, until} = require('selenium-webdriver');
const assert = require('assert');

describe('Google Search Test', function(){
let driver;

it ('visit Saucedemo and cek page title', async function(){
    driver = await new Builder().forBrowser('chrome').build();

    await driver.get('https://www.saucedemo.com/');

    let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
    let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
    let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
    await inputUsername.sendKeys('standard_user')
    await inputPassword.sendKeys('secret_sauce')
    await buttonLogin.click()

    let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')), 
            10000
        );
        await driver.wait(until.elementIsVisible(buttonCart), 5000, 'Shopping cart harus tampil');
        
        await buttonCart.isDisplayed()

        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.strictEqual(logotext, 'Swag Labs')


        let dropdownSort = await driver.findElement(By.xpath('//select[@data-test="product-sort-container"]'))
        await dropdownSort.click()
        let option = await driver.findElement(By.xpath('//option[text()="Name (A to Z)"]'));
        await option.click();


    await driver.quit();
})
});