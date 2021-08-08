import { By} from 'selenium-webdriver';
import { Browser, BasePage } from '../lib';

export class RegisterPage extends BasePage{
    constructor(browser: Browser){
        super(browser);
    }
    private locators = {
        pageTitle: By.xpath('//h1[text()="Sign up"]'),
        userNameInput: By.xpath('//input[@placeholder="Username"]'),
        emailInput: By.xpath('//input[@placeholder="Email"]'),
        passwordInput: By.xpath('//input[@placeholder="Password"]'),
        signUpButton: By.xpath('//button[@type="submit"]')
    }
    public async signUp(pUserName: string, pEmail: string, pPassword: string): Promise<void> {
        try {
            await this.browser.wait(this.locators.pageTitle, 3000);
            await this.browser.findElement(this.locators.userNameInput).sendKeys(pUserName);
            await this.browser.findElement(this.locators.emailInput).sendKeys(pEmail);
            await this.browser.findElement(this.locators.passwordInput).sendKeys(pPassword);
            await this.browser.findElement(this.locators.signUpButton).click();
    } catch(e) {
        console.log('SingUp Error:', e);
    }
    }
}