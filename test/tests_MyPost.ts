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
let gTitleArticle_2: string;
let gSummaryArticle_2: string;
let gContentArticle_2: string[];
let gTagsArticle_2: string[];


describe('My Post list tests', function() {
    let pages: AllPages;
    beforeEach(async function(){
        let timestamp = getCurrentTimestamp(new Date);
        gUserName = 'newuser' + timestamp;
        gUserEmail = 'newuser' + timestamp + '@mail.com';
        gTitleArticle = 'Article 1';
        gSummaryArticle = 'How to create the automated tests?';
        gContentArticle = ['You have to understand the technology before choose one.'];
        gTagsArticle = ['QA', 'automated-test', 'tools'];

        gTitleArticle_2 = 'Article2';
        gSummaryArticle_2 = 'Summary';
        gContentArticle_2 = ['Article Content.'];
        gTagsArticle_2 = [];

        pages = new AllPages(new Browser(DriverType.CHROME));
        console.log(`[PRECONDITION] Registration as '${gUserName}' user.`);
        await pages.homePage.navigateTo();
        await pages.homePage.register(gUserName,gUserEmail, gPassword);
        console.log(`[PRECONDITION] Adding articles.`);
        await pages.homePage.addNewArticle(gTitleArticle, gSummaryArticle, gContentArticle, gTagsArticle);
        await pages.homePage.addNewArticle(gTitleArticle_2, gSummaryArticle_2, gContentArticle_2, gTagsArticle_2);
    });
    afterEach(async function(){
        console.log(`Running the 'After' step.`);
        await pages.homePage.deleteArticle(gTitleArticle, gSummaryArticle);
        await pages.homePage.deleteArticle(gTitleArticle_2, gSummaryArticle_2);
        await pages.logout();
    });
    it('013_Articles_PostListUI', async function() {
        console.log(`[Step 01] Clicking on the username link.`);
        await pages.homePage.goToUserProfile();

        console.log(`-- Expected result -- Validating that all elements are diplayed and all fields have valid values`);
        // First Article
        let id: string = await pages.userProfilePage.getArticleId(gTitleArticle, gSummaryArticle);
        await pages.userProfilePage.textIsAsExpected(pages.userProfilePage.getLocatorAuthorByArticleId(id), gUserName);
        await pages.userProfilePage.textIsAsExpected(pages.userProfilePage.getLocatorDateCreationByArticleId(id), getCurrentTimestamp(new Date(), 'mmmm d, yyyy'));
        await pages.userProfilePage.textIsAsExpected(pages.userProfilePage.getLocatorTitleByArticleId(id), gTitleArticle);
        await pages.userProfilePage.textIsAsExpected(pages.userProfilePage.getLocatorSummaryByArticleId(id), gSummaryArticle);
        await pages.userProfilePage.isVisible(pages.userProfilePage.getLocatorReadMoreByArticleId(id), 'Read more text');
        await pages.userProfilePage.textFromParagraphsIsAsExpected(pages.userProfilePage.getLocatorTagsByArticleId(id), gTagsArticle);
        // Second Article
        id = await pages.userProfilePage.getArticleId(gTitleArticle_2, gSummaryArticle_2);
        await pages.userProfilePage.textIsAsExpected(pages.userProfilePage.getLocatorAuthorByArticleId(id), gUserName);
        await pages.userProfilePage.textIsAsExpected(pages.userProfilePage.getLocatorDateCreationByArticleId(id), getCurrentTimestamp(new Date(), 'mmmm d, yyyy'));
        await pages.userProfilePage.textIsAsExpected(pages.userProfilePage.getLocatorTitleByArticleId(id), gTitleArticle_2);
        await pages.userProfilePage.textIsAsExpected(pages.userProfilePage.getLocatorSummaryByArticleId(id), gSummaryArticle_2);
        await pages.userProfilePage.isVisible(pages.userProfilePage.getLocatorReadMoreByArticleId(id), 'Read more text');
        await pages.userProfilePage.isNotVisible(pages.userProfilePage.getLocatorTagsByArticleId(id), 'Tag');
    });

    it('014_Articles_OpenArticleFromPostList', async function() {
        console.log(`[Step 01] Clicking on the username link.`);
        console.log(`[Step 02] Clicking on the 'Read more' link for the previously added article.`);
        await pages.homePage.goToUserProfile();
        await pages.userProfilePage.seeArticle(gTitleArticle, gSummaryArticle);

        console.log(`-- Expected result -- Validating that all elements are diplayed and all fields have valid values`);
        await pages.articlePage.textIsAsExpected(pages.articlePage.locators.titleArticle, gTitleArticle);
        await pages.articlePage.textFromParagraphsIsAsExpected(pages.articlePage.locators.contentArticle, gContentArticle);
        await pages.articlePage.textFromParagraphsIsAsExpected(pages.articlePage.locators.tagArticle, gTagsArticle);
        await pages.articlePage.textIsAsExpected(pages.articlePage.locators.authorArticle, gUserName);
        await pages.articlePage.textIsAsExpected(pages.articlePage.locators.dateCreationText, getCurrentTimestamp(new Date(), 'mmmm d, yyyy'));
        await pages.articlePage.isVisible(pages.articlePage.locators.editArticleButton, 'Edit Article button');
        await pages.articlePage.isVisible(pages.articlePage.locators.deleteArticleButton, 'Delete Article button');
        await pages.articlePage.isVisible(pages.articlePage.locators.commentField, 'Coment field');
        await pages.articlePage.isVisible(pages.articlePage.locators.postCommentButton, 'Post Comment button');     
    });
})