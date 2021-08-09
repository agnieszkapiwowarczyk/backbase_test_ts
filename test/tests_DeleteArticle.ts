import { Browser, DriverType } from '../lib';
import { AllPages } from '../pages';
import { getCurrentTimestamp, consoleHandler } from '../lib';
import { logging } from 'selenium-webdriver';
import config from '../config';

const logger = new logging.Logger("test", config.globalLogLevel);
let gUserName: string;
let gUserEmail: string;
const gPassword: string = 'Password';
let gTitleArticle: string;
let gSummaryArticle: string;
let gContentArticle: string[];
let gTagsArticle: string[];


describe('Delete article tests', function() {
    let pages: AllPages;
    beforeEach(async function(){
        let timestamp = getCurrentTimestamp(new Date);
        gUserName = 'newuser' + timestamp;
        gUserEmail = 'newuser' + timestamp + '@mail.com';
        gTitleArticle = 'Article_'+ timestamp;
        gSummaryArticle = 'How to create the automated tests?';
        gContentArticle = ['You have to understand the technology before choose one.'];
        gTagsArticle = ['QA', 'automated-test', 'tools'];

        pages = new AllPages(new Browser(DriverType.CHROME));
        logger.addHandler(consoleHandler);

        logger.info(`[PRECONDITION] Registration as '${gUserName}' user.`);
        await pages.homePage.navigateTo();
        await pages.homePage.register(gUserName,gUserEmail, gPassword);
        logger.info(`[PRECONDITION] Adding article.`);
        await pages.homePage.addNewArticle(gTitleArticle, gSummaryArticle, gContentArticle, gTagsArticle);
    });
    afterEach(async function(){
        logger.info(`Running the 'After' step.`);
        await pages.logout();
    });
    it('013_Articles_DeletingArticle', async function() {
        logger.info(`[Step 01] Clicking on the username link.`);
        logger.info(`[Step 02] Clicking on the 'Read more' link for the previously added article.`);
        logger.info(`[Step 03] Clicking on the 'Delete Article' button.`);
        await pages.homePage.goToUserProfile();
        await pages.userProfilePage.seeArticle(gTitleArticle, gSummaryArticle);
        await pages.articlePage.clickButtonDelete();

        logger.debug(`-- Expected result -- Validating whether the article is not displayed on user profile page`);
        await pages.homePage.isVisible(pages.homePage.locators.yourFeedLink, 'Your Feed card');
        await pages.homePage.goToUserProfile();
        await pages.userProfilePage.isVisible(pages.userProfilePage.locators.noArticleText, 'No article are here text');
        await pages.userProfilePage.isNotVisible(pages.userProfilePage.getLocatorLinkArticle(gTitleArticle, gSummaryArticle), 'No article are here text');
    });
})