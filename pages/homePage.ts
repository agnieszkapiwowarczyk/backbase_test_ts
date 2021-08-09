import { UserProfilePage } from './userProfilePage';
import { By, Locator } from 'selenium-webdriver';
import { Browser, BasePage } from '../lib';
import { EditorPage, RegisterPage, LoginPage } from '.';
import config from '../config'


export class HomePage extends BasePage{
    constructor(browser: Browser){
        super(browser);
        this.setUrl(`${config.baseURL}/`);
    }
    public locators = {
        pageTitle: By.xpath('//h1[text()="conduit"]'),
        signInLink: By.xpath('//a[text()=" Sign in "]'),
        signUpLink: By.xpath('//a[text()=" Sign up "]'),
        newArticleLink: By.xpath('//a[contains(text(),"New Article")]'),
        userNameLink: By.css('a.nav-link[href*=profile]'),
        yourFeedLink: By.xpath('//a[text()=" Your Feed "]'),
    }

    private getLocatorUserNameLink(pUserName: string): Locator {
        return By.css(`a.nav-link[href*=${pUserName}]`);
    }
    
    public async navigateTo(): Promise<void> {
        this.navigate(this.locators.pageTitle);
    }

    public async login(pEmail: string, pPassword: string) {
        const loginPage: LoginPage = new LoginPage(this.browser);

        try {
            await this.browser.findElement(this.locators.signInLink).click();
            await loginPage.signIn(pEmail, pPassword);
        } catch(e) {
            console.log(`[Login Error] ${e}`);
        }
    }

    public async register(pUserName: string, pEmail: string, pPassword: string) {
        const registerPage: RegisterPage = new RegisterPage(this.browser);

        try {
            await this.browser.findElement(this.locators.signUpLink).click();
            await registerPage.signUp(pUserName, pEmail, pPassword);
            await this.browser.wait(this.getLocatorUserNameLink(pUserName), 5000);
            
        } catch(e) {
            console.log(`[Register Error] ${e}`);
        }
    }

    public async addNewArticle(pTitle: string, pDescription: string, pContent: string[], pTags: string[]) {
        const editorPage: EditorPage = new EditorPage(this.browser);

        try {
            await this.browser.findElement(this.locators.newArticleLink).click();
            await editorPage.addArticle(pTitle, pDescription, pContent, pTags);
        } catch(e) {
            console.log(`[AddNewArticle Error] ${e}`);
        }
    }

    public async goToUserProfile() {
        const userProfilePage: UserProfilePage = new UserProfilePage(this.browser);
        
        try {
            await this.browser.findElement(this.locators.userNameLink).click();
            await this.browser.wait(userProfilePage.locators.titleUserName);
        } catch(e) {
            console.log(`[goToUserProfile Error] ${e}`);
        }
    }
}