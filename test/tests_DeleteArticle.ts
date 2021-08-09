import { Browser, DriverType } from '../lib';
import { AllPages } from '../pages';
import { getCurrentTimestamp } from '../lib';

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
        gTitleArticle = 'Article 1';
        gSummaryArticle = 'How to create the automated tests?';
        gContentArticle = ['You have to understand the technology before choose one.'];
        gTagsArticle = ['QA', 'automated-test', 'tools'];

        pages = new AllPages(new Browser(DriverType.CHROME));
        console.log(`[PRECONDITION] Registration as '${gUserName}' user.`);
        await pages.homePage.navigateTo();
        await pages.homePage.register(gUserName,gUserEmail, gPassword);
        console.log(`[PRECONDITION] Adding article.`);
        await pages.homePage.addNewArticle(gTitleArticle, gSummaryArticle, gContentArticle, gTagsArticle);
    });
    afterEach(async function(){
        console.log(`Running the 'After' step.`);
        await pages.logout();
    });
    it('012_Articles_DeletingArticle', async function() {
        console.log(`[Step 01] Clicking on the username link .`);
        console.log(`[Step 02] Clicking on the 'Read more' link for the previously added article.`);
        console.log(`[Step 03] Clicking on the 'Delete Article' button.`);
        await pages.homePage.goToUserProfile();
        await pages.userProfilePage.seeArticle(gTitleArticle, gSummaryArticle);
        await pages.articlePage.clickButtonDelete();

        console.log(`-- Expected result -- Validating whether the article is not displayed on user profile page`);
        await pages.homePage.isVisible(pages.homePage.locators.yourFeedLink, 'Your Feed card');
        await pages.homePage.goToUserProfile();
        await pages.userProfilePage.isVisible(pages.userProfilePage.locators.noArticleText, 'No article are here text');
        await pages.userProfilePage.isNotVisible(pages.userProfilePage.getLocatorLinkArticle(gTitleArticle, gSummaryArticle), 'No article are here text');
    });
})