import { Locator, WebElement } from 'selenium-webdriver';
import { Browser } from './browser';
import { expect } from 'chai';

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
        try {
            await this.browser.navigate(this.url);
            await this.browser.wait(pSelector);
        } catch(e) {
            console.log(`[Navigate Error] ${e}`);
        }
    }

    public isEqual(pActual: string, pExpected: string){
            expect(pActual).to.equal(pExpected);
    }

    public async isVisible(pSelector: Locator, pElementName: string) {
        let isVisible: boolean;
        await this.browser.findElement(pSelector).isDisplayed()
        .then(()=>{ isVisible = true }).catch((err=> { if(err.name=== "NoSuchElementError") isVisible = false;
        throw new Error (" No such element")}))
        if (!isVisible){
            throw new Error(`[assert isVisible] Element '${pElementName}' is not visible.`);
        }
    }

    public async isNotVisible(pSelector: Locator, pElementName: string) {
        let isVisible: boolean;

        await this.browser.findElement(pSelector).isDisplayed()
        .then(()=>{ isVisible = true }).catch((err=> { if(err.name=== "NoSuchElementError") isVisible = false;}))
        if (isVisible){
            throw new Error(`[assert isNotVisible] Element '${pElementName}' is visible.`);
        }
    }

    public async textIsAsExpected(pSelector: Locator, pExpected: string) {
        let actual: string = await this.browser.findElement(pSelector).getText();
        if (actual.trim() !== pExpected.trim()) {
            let errorMessage = `The actual value was  '${actual}' rather than the expected '${pExpected}'.`;
            throw new Error(`[assert textIsAsExpected] ${errorMessage}`);
        }
    }

    public async attributeIsAsExpected(pSelector: Locator, pAttribute: string,  pExpected: string) {
        let actual: string = await this.browser.findElement(pSelector).getAttribute(pAttribute);
        if (actual.trim() !== pExpected.trim()) {
            let errorMessage = `The actual value attribute '${pAttribute}' was '${actual}' rather than the expected '${pExpected}'.`;
            throw new Error(`[assert attributeIsAsExpected] ${errorMessage}`);
        }
    }

    public async textFromParagraphsTagsIsAsExpected(pSelector: Locator, pExpected: string[]) {
        let elements: WebElement[] = await this.browser.findElements(pSelector);
        let actual: string;
        let expected: string;
        let i = 0;
        for (let element of elements) {
            actual = await element.getText();
            expected = pExpected[i];
            if (actual.trim() !== expected.trim()) {
                let errorMessage = `The actual value was  '${actual}' rather than the expected '${expected}'.`;
                throw new Error(`[assert textIsAsExpected] ${errorMessage}`);
            }
            i++;
        }       
    }
}
