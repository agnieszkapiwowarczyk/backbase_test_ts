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


describe('Add new article tests', function() {
    let pages: AllPages;
    beforeEach(async function(){
        let timestamp = getCurrentTimestamp(new Date);
        gUserName = 'newuser' + timestamp;
        gUserEmail = 'newuser' + timestamp + '@mail.com';

        pages = new AllPages(new Browser(DriverType.CHROME));
        console.log(`[PRECONDITION] Registration as '${gUserName}' user.`);
        await pages.homePage.navigateTo();
        await pages.homePage.register(gUserName,gUserEmail, gPassword);
    });
    afterEach(async function(){
        console.log(`Running the 'After' step.`);
        await pages.articlePage.clickButtonDelete();
        await pages.logout();
    });
    it('001_Articles_AddingArticleWithValidData', async function() {
        gTitleArticle = 'Article 1';
        gSummaryArticle = 'New Article';
        gContentArticle = ['This is new Article.'];
        gTagsArticle = ['QA'];

        console.log(`[Step 01] Clicking on the 'New Article' link.`);
        console.log(`[Step 02] Entering valid Article Title, Summary, and article Content.`);
        console.log(`[Step 03] Entering tag and press Enter.`);
        console.log(`[Step 04] Clicking on the 'Publish Article' button.`);
        await pages.homePage.addNewArticle(gTitleArticle, gSummaryArticle, gContentArticle, gTagsArticle);

        console.log(`-- Expected result -- Validating whether the title of an article is displayed`);
        await pages.articlePage.isVisible(pages.articlePage.locators.titleArticle, 'Article title');
        
    })

    it('002_Articles_AddingArticleWithParagraphs_WithoutTags', async function() {
        gTitleArticle = 'Article 2';
        gSummaryArticle = 'New Article';
        gContentArticle = ['This is new Article.', 'Hello Word', 'The word is beautiful.'];
        gTagsArticle = [];

        console.log(`[Step 01] Clicking on the 'New Article' link.`);
        console.log(`[Step 02] Entering valid valid Title and Summary.`);
        console.log(`[Step 03] Entering many paragraphs to Content.`);
        console.log(`[Step 04] No entering tags`);
        console.log(`[Step 05] Clicking on the 'Publish Article' button.`);
        await pages.homePage.addNewArticle(gTitleArticle, gSummaryArticle, gContentArticle, gTagsArticle);

        console.log(`-- Expected result -- Validating that all elements are diplayed and all fields have valid values`);
        await pages.articlePage.textIsAsExpected(pages.articlePage.locators.titleArticle, gTitleArticle);
        await pages.articlePage.textFromParagraphsIsAsExpected(pages.articlePage.locators.contentArticle, gContentArticle);
        await pages.articlePage.textIsAsExpected(pages.articlePage.locators.authorArticle, gUserName);
        await pages.articlePage.textIsAsExpected(pages.articlePage.locators.dateCreationText, getCurrentTimestamp(new Date(), 'mmmm d, yyyy'));
        await pages.articlePage.isVisible(pages.articlePage.locators.editArticleButton, 'Edit Article button');
        await pages.articlePage.isVisible(pages.articlePage.locators.deleteArticleButton, 'Delete Article button');
        await pages.articlePage.isVisible(pages.articlePage.locators.commentField, 'Coment field');
        await pages.articlePage.isVisible(pages.articlePage.locators.postCommentButton, 'Post Comment button');
        
    })
})