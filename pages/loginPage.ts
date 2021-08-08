import { By } from 'selenium-webdriver';
import { Browser, BasePage } from '../lib';

export class LoginPage extends BasePage {
    constructor(browser: Browser) {
        super(browser);
    }
    private locators = {
        pageTitle: By.xpath('//h1[text()="Sign in"]'),
        emailInput: By.xpath('//input[@placeholder="Email"]'),
        passwordInput: By.xpath('//input[@placeholder="Password"]'),
        signInButton: By.xpath('//button[@type="submit"]')
    }
    public async signIn(pEmail: string, pPassword: string): Promise<void> {
        try {
        await this.browser.wait(this.locators.pageTitle, 3000);
        await this.browser.findElement(this.locators.emailInput).sendKeys(pEmail);
        await this.browser.findElement(this.locators.passwordInput).sendKeys(pPassword);
        await this.browser.findElement(this.locators.signInButton).click();
        } catch(e) {
            console.log('SingIn Error:', e);
        }
    }
}