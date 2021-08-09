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


describe('Edit article tests', function() {
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
        logger.info(`Running the 'After' step.`)
        await pages.homePage.goToUserProfile();
        await pages.userProfilePage.seeArticle(gTitleArticle, gSummaryArticle);
        await pages.articlePage.clickButtonDelete();
        await pages.logout();
    });
    it('007_Articles_EditingArticle', async function() {

        logger.info(`[Step 01] Clicking on the username link.`);
        logger.info(`[Step 02] Clicking on the 'Read more' link for the previously added article.`);
        logger.info(`[Step 03] Clicking on the 'Edit Article' button.`);
        await pages.homePage.goToUserProfile();
        await pages.userProfilePage.seeArticle(gTitleArticle, gSummaryArticle);
        await pages.articlePage.clickButtonEdit();

        logger.debug(`-- Expected result -- Validating whether the fields have correct values`);
        await pages.editorPage.isVisible(pages.editorPage.locators.publishArticleButton, 'Publish Article button');
        await pages.editorPage.attributeIsAsExpected(pages.editorPage.locators.titleInput, 'value', gTitleArticle);
        await pages.editorPage.attributeIsAsExpected(pages.editorPage.locators.summaryInput, 'value', gSummaryArticle);
        await pages.editorPage.attributeIsAsExpected(pages.editorPage.locators.contentTextbox, 'value', gContentArticle[0]);
        
    });

    it('008_Articles_EditingAndSavingArticle', async function() {
        logger.info(`[Step 01] Clicking on the username link.`);
        logger.info(`[Step 02] Clicking on the 'Read more' link for the previously added article.`);
        logger.info(`[Step 03] Clicking on the 'Edit Article' button.`);
        logger.info(`[Step 04] Changing Article Title, Summary, and Content.`)
        logger.info(`[Step 05] Deleting all tags.`)
        logger.info(`[Step 06] Clicking on the 'Publish Article' button.`);
        await pages.homePage.goToUserProfile();
        let expectedId = await pages.userProfilePage.getArticleId(gTitleArticle, gSummaryArticle);
        await pages.userProfilePage.seeArticle(gTitleArticle, gSummaryArticle);
        await pages.articlePage.clickButtonEdit();
        gTitleArticle = 'New Article';
        gSummaryArticle = 'New Description';
        gContentArticle = ['This is new content'];
        await pages.editorPage.editTitle(gTitleArticle);
        await pages.editorPage.editSummary(gSummaryArticle);
        await pages.editorPage.editContent(gContentArticle);
        for (let tag of gTagsArticle) {
            await pages.editorPage.deleteTag(tag);
        }
        await pages.editorPage.clickButtonPublish();
        await pages.homePage.goToUserProfile();
        let actualId = await pages.userProfilePage.getArticleId(gTitleArticle, gSummaryArticle);
        await pages.userProfilePage.seeArticle(gTitleArticle, gSummaryArticle);

        logger.debug(`-- Expected result -- Validating whether the fields have changed values`);
        pages.articlePage.isEqual(actualId, expectedId);
        await pages.articlePage.textIsAsExpected(pages.articlePage.locators.titleArticle, gTitleArticle);
        await pages.articlePage.textFromParagraphsTagsIsAsExpected(pages.articlePage.locators.contentArticle, gContentArticle);
        await pages.articlePage.isNotVisible(pages.articlePage.locators.tagArticle, 'Tags')
        await pages.articlePage.textIsAsExpected(pages.articlePage.locators.authorArticle, gUserName);
        await pages.articlePage.textIsAsExpected(pages.articlePage.locators.dateCreationText, getCurrentTimestamp(new Date(), 'mmmm d, yyyy'));
        await pages.articlePage.isVisible(pages.articlePage.locators.editArticleButton, 'Edit Article button');
        await pages.articlePage.isVisible(pages.articlePage.locators.deleteArticleButton, 'Delete Article button');
        await pages.articlePage.isVisible(pages.articlePage.locators.commentField, 'Coment field');
        await pages.articlePage.isVisible(pages.articlePage.locators.postCommentButton, 'Post Comment button');
    });
})