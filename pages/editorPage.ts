import { BasePage, Browser } from '../lib';
import { By, Key, Locator } from 'selenium-webdriver';
import { ArticlePage } from '.';

export class EditorPage extends BasePage{
    constructor(browser: Browser){
        super(browser);
    }

    public locators = {
        titleInput: By.css(`input[formcontrolname=title]`),
        summaryInput: By.css(`input[formcontrolname=description]`),
        contentTextbox: By.css(`textarea[formcontrolname=body]`),
        tagsInput: By.css(`input[placeholder$=tags]`),
        publishArticleButton: By.css(`button[type=button]`)
    }
    private getLocatorTag(pTagName: string): Locator {
        return By.xpath(`//span[text()=' ${pTagName} ']`);
    }

    private getLocatorLinkDeleteTag(pTagName: string): Locator {
        return By.xpath(`//span[text()=' ${pTagName} ']/i`);
    }

    public async addArticle(pTitle: string, pSummary: string, pContent: string[], pTags: string[]) {
        try {
            let content = pContent.join(' \n \n ');
            await this.browser.findElement(this.locators.titleInput).sendKeys(pTitle);
            await this.browser.findElement(this.locators.summaryInput).sendKeys(pSummary);
            await this.browser.findElement(this.locators.contentTextbox).sendKeys(content);
            for (let tag of pTags){ 
                await this.addTag(tag);
            }
            await this.clickButtonPublish();
        } catch(e) {
            console.log(`[AddArticle Error] ${e}`);
        }
    }

    public async addTag(pTag: string): Promise<void> {
        try {
            await this.browser.findElement(this.locators.tagsInput).sendKeys(pTag);
            await this.browser.findElement(this.locators.tagsInput).sendKeys(Key.ENTER);
        } catch(e) {
            throw new Error(`[AddTag Error] ${e}`);
        }
    }

    public async deleteTag(pTag: string): Promise<void> {
        try {
            await this.browser.findElement(this.getLocatorLinkDeleteTag(pTag)).click();
        } catch(e) {
            throw new Error(`[DeleteTag Error] ${e}`);
        }
    }

    public async editTitle(pTitle: string): Promise<void> {
        try {
            await this.browser.findElement(this.locators.titleInput).clear();
            await this.browser.findElement(this.locators.titleInput).sendKeys(pTitle);
        } catch(e) {
            console.log(`[EditTitle Error] ${e}`);
        }
    }

    public async editSummary(pSummary: string): Promise<void> {
        try {
            await this.browser.findElement(this.locators.summaryInput).clear();
            await this.browser.findElement(this.locators.summaryInput).sendKeys(pSummary);
        } catch(e) {
            console.log(`[EditSummary Error] ${e}`);
        }
    }

    public async editContent(pContent: string[]): Promise<void> {
        try {
            let content = pContent.join(' \n \n ');
            await this.browser.findElement(this.locators.contentTextbox).clear();
            await this.browser.findElement(this.locators.contentTextbox).sendKeys(content);
        } catch(e) {
            console.log(`[EditContent Error] ${e}`);
        }
    }

    public async clickButtonPublish(): Promise<void> {
        const articlePage: ArticlePage = new ArticlePage(this.browser);
        
        try {
            await this.browser.findElement(this.locators.publishArticleButton).click();
            await this.browser.wait(articlePage.locators.titleArticle);
        } catch(e) {
            console.log(`[ClickButtonPublish Error] ${e}`);
        }
    }

}