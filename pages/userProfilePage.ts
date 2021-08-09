import { ArticlePage } from '.';
import { By, Locator } from 'selenium-webdriver';
import { Browser, BasePage } from '../lib';

export class UserProfilePage extends BasePage {
    constructor(browser: Browser) {
        super(browser);
    }
    public locators = {
        titleUserName: By.css('div.profile-page h4'),
        noArticleText: By.xpath(`//div[contains(text(),'No articles are here')]`)
    }

    public getLocatorLinkArticle(pTitle: string, pSummary: string): Locator {
        return By.xpath(`//a[./h1[text()='${pTitle}'] and ./p[text()='${pSummary}']]`);
    }

    public async getArticleId(pTitle: string, pSummary: string) {
        try {
            await this.browser.wait(this.getLocatorLinkArticle(pTitle, pSummary));
            const attribute = await this.browser.findElement(this.getLocatorLinkArticle(pTitle, pSummary))
            .getAttribute('href');
            const id = attribute.split('/')[4];
            return id;
        } catch(e) {
            throw new Error(`[GetArticleId Error] ${e}`);
        }
    }


    public async seeArticle(pTitle: string, pSummary: string) {
        const articlePage: ArticlePage = new ArticlePage(this.browser);

        try {
            await this.browser.wait(this.getLocatorLinkArticle(pTitle, pSummary));
            await this.browser.findElement(this.getLocatorLinkArticle(pTitle, pSummary)).click();
            await this.browser.wait(articlePage.locators.titleArticle);
        } catch(e) {
            throw new Error(`[SeeArticle Error] ${e}`);
        }
    }
}