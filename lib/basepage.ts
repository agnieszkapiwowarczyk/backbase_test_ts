import { Locator, WebElement } from 'selenium-webdriver';
import { Browser } from './browser';
import { Assertion, expect } from 'chai';

export interface NewablePage<T extends BasePage> {
    new(browser: Browser): T;
}

export abstract class BasePage {
    private url: string;

    protected setUrl(url: string) {
        this.url = url;
    }

    public constructor(protected browser: Browser) {

    }

    public async navigate(pSelector: Locator): Promise<void> {
        await this.browser.navigate(this.url);
        await this.browser.wait(pSelector);
    }
    //Asserts
    public async isVisible(pSelector: Locator, pElementName: string) {
        if (! await this.browser.findElement(pSelector).isDisplayed()){
            throw new Error(`[assert isVisible] Element ${pElementName} is visible`);
        }
    }

    public async textIsAsExpected(pSelector: Locator, pExpected: string) {
        let actual: string = await this.browser.findElement(pSelector).getText();
        let errorMessage = `The actual value was  ' ${actual} ' rather than the expected '${pExpected}'.`;
        if (actual.trim() !== pExpected.trim()) {
            throw new Error(`[assert textIsAsExpected]` + errorMessage);
        }
    }

    public async textFromParagraphsIsAsExpected(pSelector: Locator, pExpected: string[]) {
        let elements: WebElement[] = await this.browser.findElements(pSelector);
        let actual: string;
        let expected: string;
        let i = 0;
        for (let element of elements) {
            actual = await element.getText();
            expected = pExpected[i];
            if (actual.trim() !== expected.trim()) {
                let errorMessage = `The actual value was  ' ${actual} ' rather than the expected '${expected}'.`;
                throw new Error(`[assert textIsAsExpected]` + errorMessage);
            }
            i++;
        }       
    }
}
