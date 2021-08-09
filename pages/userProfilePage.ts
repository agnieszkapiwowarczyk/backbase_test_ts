import { ArticlePage } from '.';
import { By, Locator } from 'selenium-webdriver';
import { Browser, BasePage } from '../lib';

export class UserProfilePage extends BasePage {
    constructor(browser: Browser) {
        super(browser);
    }
    public locators = {
        titleUserName: By.css('div.profile-page h4')
    }

    private getLocatorLinkArticle(pTitle: string, pDescription: string): Locator {
        return By.xpath(`//a[./h1[text()='${pTitle}'] and ./p[text()='${pDescription}']]`);
    }

    public async getArticleId(pTitle: string, pDescription: string) {
        try {
            await this.browser.wait(this.getLocatorLinkArticle(pTitle, pDescription));
            const attribute = await this.browser.findElement(this.getLocatorLinkArticle(pTitle, pDescription))
            .getAttribute('href');
            const id = attribute.split('/')[4];
            return id;
        } catch(e) {
            throw new Error(`[GetArticleId Error] ${e}`);
        }
    }


    public async seeArticle(pTitle: string, pDescription: string) {
        const articlePage: ArticlePage = new ArticlePage(this.browser);

        try {
            await this.browser.wait(this.getLocatorLinkArticle(pTitle, pDescription));
            await this.browser.findElement(this.getLocatorLinkArticle(pTitle, pDescription)).click();
            await this.browser.wait(articlePage.locators.titleArticle);
        } catch(e) {
            throw new Error(`[SeeArticle Error] ${e}`);
        }
    }
}