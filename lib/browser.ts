import { Builder, Locator, ThenableWebDriver, WebElementPromise, until, WebElement } from 'selenium-webdriver';

export const enum DriverType {
    CHROME = 'chrome',
    FIREFOX = 'firefox'
}

export class Browser {
    private driver: ThenableWebDriver;
    constructor(private pBrowserName: DriverType) {
        this.driver = new Builder().forBrowser(pBrowserName).build();
        this.driver.manage().window().maximize();
    }
    public  async navigate(pUrl:string): Promise<void> {
        await this.driver.get(pUrl);
    }

    public findElement(pSelector: Locator): WebElementPromise {
        return this.driver.findElement(pSelector);
    }

    public findElements(pSelector: Locator): Promise<WebElement[]> {
        return this.driver.findElements(pSelector);
    }

    public async wait(pSelector: Locator, pTimeout: number = 6000): Promise<void> {
        await this.driver.wait(until.elementLocated(pSelector), pTimeout);
    }

    public async close(): Promise<void> {
        await this.driver.quit();
    }
}