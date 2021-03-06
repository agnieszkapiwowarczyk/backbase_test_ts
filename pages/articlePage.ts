import { HomePage, EditorPage } from '.';
import { By } from 'selenium-webdriver';
import { Browser, BasePage } from '../lib';

export class ArticlePage extends BasePage {
    constructor(browser: Browser) {
        super(browser);
    }
    public locators = {
        titleArticle: By.css('div.article-page h1'),
        contentArticle: By.css('div.container.page p'),
        tagArticle: By.css('ul.tag-list li'),
        authorArticle: By.css('a.author'),
        dateCreationText: By.css('span.date'),
        editArticleButton: By.css('a.btn-outline-secondary'),
        deleteArticleButton: By.css('button.btn-outline-danger'),
        commentField: By.css('div.card-block textarea'),
        postCommentButton: By.css('button[type=submit]')
    }

    public async clickButtonDelete() {
        const homePage: HomePage = new HomePage(this.browser);
        
        try {
            await this.browser.findElement(this.locators.deleteArticleButton).click();
            await this.browser.wait(homePage.locators.yourFeedLink);
        } catch(e) {
            console.log(`[ClickButtonDelete Error] ${e}`);
        }
    }

    public async clickButtonEdit() {
        const editorPage: EditorPage = new EditorPage(this.browser);
        
        try {
            await this.browser.findElement(this.locators.editArticleButton).click();
            await this.browser.wait(editorPage.locators.publishArticleButton);
        } catch(e) {
            console.log(`[ClickButtonDelete Error] ${e}`);
        }
    }
}