import { Browser } from "../lib/browser";
import { HomePage } from "./homePage";
import { RegisterPage } from "./registerPage";
import { LoginPage } from "./loginpage";
import { EditorPage } from "./editorPage";
import { ArticlePage } from "./articlePage";

export{
    HomePage,
    RegisterPage,
    LoginPage,
    EditorPage,
    ArticlePage
}

export class AllPages {
    public homePage: HomePage;
    public registerPage: RegisterPage;
    public loginPage: LoginPage;
    public editorPage: EditorPage;
    public articlePage: ArticlePage;

    constructor(public browser: Browser){
        this.homePage = new HomePage(browser);
        this.registerPage = new RegisterPage(browser);
        this.loginPage = new LoginPage(browser);
        this.editorPage = new EditorPage(browser);
        this.articlePage = new ArticlePage(browser);
    }

    public async logout(): Promise<void> {
        await this.browser.close();
    }
}