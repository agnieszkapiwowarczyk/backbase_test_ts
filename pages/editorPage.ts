import { BasePage, Browser } from "../lib";
import { By, Key, Locator} from 'selenium-webdriver';

export class EditorPage extends BasePage{
    constructor(browser: Browser){
        super(browser);
    }

    private locators = {
        titleInput: By.css('input[formcontrolname=title]'),
        descriptionInput: By.css('input[formcontrolname=description]'),
        contentTextbox: By.css('textarea[formcontrolname=body]'),
        tagsInput: By.css('input[placeholder$=tags]'),
        publishArticleButton: By.css('button[type=button]')
    }
    private getLocatorTag(pTagName: string): Locator {
        return By.xpath(`//span/li[text()="${pTagName}"]`);
    }

    public async addArticle(pTitle: string, pDescription: string, pContent: string[], pTags: string[]) {
        try {
            let content = pContent.join(' \n \n ')
            await this.browser.findElement(this.locators.titleInput).sendKeys(pTitle);
            await this.browser.findElement(this.locators.descriptionInput).sendKeys(pDescription);
            await this.browser.findElement(this.locators.contentTextbox).sendKeys(content);
            for (let tag of pTags){ 
                await this.addTag(tag);
            }
            await this.browser.findElement(this.locators.publishArticleButton).click();
        } catch(e) {
            console.log('AddArticle Error:', e);
    }
    }

    public async addTag(pTag: string): Promise<void> {
        try {
            await this.browser.findElement(this.locators.tagsInput).sendKeys(pTag);
            await this.browser.findElement(this.locators.tagsInput).sendKeys(Key.ENTER);
            //TO DO
            // czy moge tu dodac jakas walidacje tagow?
        } catch(e) {
            console.log('AddTag Error:', e);
    }
    }

}