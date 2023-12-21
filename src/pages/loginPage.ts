import { expect, Locator, Page } from "@playwright/test";
import PlaywrightWrapper from "../utilities/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(60 * 1000 * 15);
export default class LoginPage {

    private base: PlaywrightWrapper;
    readonly cookieBotAllowButton: Locator;
    readonly userNameLocator: Locator;
    readonly companyCodeLocator: Locator;
    readonly passwordLocator: Locator;
    readonly rememberMeLocator: Locator;
    readonly forgotPasswordButton: Locator;
    readonly loginButtonLocator: Locator;
    readonly errorMessageLocator: Locator;
    readonly accountLockedMessage: Locator;
    readonly resetPasswordButton: Locator;
    readonly resetPasswordEmailPopup: Locator;
    readonly lockedOutErrorMessage: Locator;

    //Login withMicrosoft and Google
    readonly loginMicrosoftButton: Locator;
    readonly loginGoogletButton: Locator;

    //Multi Factor Authentication
    readonly smsRadiOButton: Locator;
    readonly emailRadiOButton: Locator;
    readonly authenticatorAppRadiOButton: Locator;
    readonly mobileNumberReadOnlyField: Locator;
    readonly backToLogibButton: Locator;
    readonly sendVerificationCodeButton: Locator;
    readonly verificationCodeButton: Locator;
    readonly codeInputField: Locator;
    readonly mfaLoginButton: Locator;
    readonly closeMFAPopupButton: Locator;

    //Forgot Password
    readonly contactSupportButton: Locator;
    readonly submitButton: Locator;
    readonly closeContactSupprotPopupButton: Locator;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.cookieBotAllowButton = page.locator('[id="CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll"]');
        this.userNameLocator = page.locator('input[name="username"]');
        this.companyCodeLocator = page.locator('input[name="companyCode"]');
        this.passwordLocator = page.locator('input[name="password"]');
        this.rememberMeLocator = page.locator('[class="form-check-label"]');
        this.forgotPasswordButton = page.locator('a[name="forgotPassword"]');
        this.loginButtonLocator = page.locator('#LoginButton');
        this.errorMessageLocator = page.locator('//p[@class="login-page-error login-alert-background-color"]');
        this.accountLockedMessage = page.locator("//p[@class='text-danger login-page-error']");
        this.resetPasswordButton = page.locator('button[class="btn-round mb-3 btn btn-warning btn-block"]');
        this.resetPasswordEmailPopup = page.locator('[class="btn btn-lg btn-primary  "]');
        this.lockedOutErrorMessage = page.locator('[class="btn btn-lg btn-primary  "]');

        //Login with Microsoft and Google
        this.loginMicrosoftButton = page.locator('[id="LoginButton"]');
        this.loginGoogletButton = page.locator('[id="LoginButton"]');

        //Multi Factor Authntication
        this.smsRadiOButton = page.locator('//input[@name="MFAMethod"][@value="Sms"]/parent::label');
        this.emailRadiOButton = page.locator('//input[@name="MFAMethod"][@value="Email"]/parent::label');
        this.authenticatorAppRadiOButton = page.locator('//input[@name="MFAMethod"][@value="TOTP"]/parent::label');
        this.mobileNumberReadOnlyField = page.locator('[placeholder="Mobile Number"]');
        this.backToLogibButton = page.locator('[name="backToLogin"]');
        this.sendVerificationCodeButton = page.locator('//button[normalize-space()="Send verification code"]');
        this.sendVerificationCodeButton = page.locator('//button[normalize-space()="Send verification code"]');
        this.verificationCodeButton = page.locator('//button[normalize-space()="Verification code"]');
        this.codeInputField = page.getByPlaceholder("Code");
        this.mfaLoginButton = page.locator('//button[normalize-space()="Login"]');
        this.closeMFAPopupButton = page.locator('button:has(img[src="/static/media/loginPopupClose.f4a18e58ce664697c6b922e66eba57c1.svg"])');

        //Forgot Password
        this.contactSupportButton = page.locator('//span[normalize-space()="Contact Support"]');
        this.submitButton = page.locator('//button[normalize-space()="Submit"]');
        this.closeContactSupprotPopupButton = page.locator('button[title="Expand"]');
    }

    async navigateToLoginPage(url: string) {
        await this.page.goto(url, { timeout: 100000 });
    }

    async enterUsername(userName: string) {
        await this.userNameLocator.fill(userName);
    }
    async enterCompanyCode(companyCode: string) {
        await this.companyCodeLocator.fill(companyCode);
    }
    async enterPassword(password: string) {
        await this.passwordLocator.fill(password);
    }
    async clickOnLoginButton() {
        await this.loginButtonLocator.click();
        try {
            const element = await this.page.waitForSelector('[data-test-id="MainPageConsentBarAcceptAll"]', { timeout: 1000 });
            await element.click();
        } catch (error) {
        }
        try {
            const element = await this.page.waitForSelector('[data-test-id="InAppNotificationsInAppPopupCardWithToggleAndFunctionButtonsbtnClearAllNewTasksButton"]', { timeout: 1000 });
            await element.click();
        } catch (error) {
        }
    }
    async gotoLoginPage(url: string) {
        await this.page.goto(url);
    }
    async allowCookieBot() {
        await this.cookieBotAllowButton.click();
    }

    async loginToApplication(superUser: string, companyName: string, password: string) {
        await this.page.waitForTimeout(10000);
        await this.userNameLocator.fill(superUser);
        await this.companyCodeLocator.fill(companyName);
        await this.passwordLocator.type(password);
        await this.rememberMeLocator.click();
        await this.loginButtonLocator.click();
        await this.page.locator("//button[.='Accept All']").click();
        try {
            const element = await this.page.waitForSelector('[data-test-id="InAppNotificationsInAppPopupCardWithToggleAndFunctionButtonsbtnClearAllNewTasksButton"]', { timeout: 15000 });
            await element.click();
        } catch (error) {
        }
    }
    async enterLoginDetails(superUser: string, companyName: string, password: string) {
        await this.userNameLocator.fill(superUser);
        await this.companyCodeLocator.fill(companyName);
        await this.passwordLocator.fill(password);
        await this.rememberMeLocator.click();
    }
    async enterEmailId(emailID: string) {
        await this.userNameLocator.fill(emailID);
    }
    //Login with Microsoft and Google
    async clickOnMicrosoftLoginButton() {
        await this.loginMicrosoftButton.click();
    }
    async clickOnGoogleLoginButton() {
        await this.loginGoogletButton.click();
    }
    async verifyLoginMicrosoftButtonIsVisible() {
        expect(this.loginMicrosoftButton).toBeVisible();
    }
    async verifyLoginGoogleButtonIsVisible() {
        expect(this.loginGoogletButton).toBeVisible();
    }


    async pastePassword(password: string) {
        await this.userNameLocator.fill(password);
        await this.userNameLocator.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Control+C');
        await this.passwordLocator.click();
        await this.page.keyboard.press('Control+V');
        await this.userNameLocator.click();
        await this.page.keyboard.press('Control+A+Delete');
    }
    async pasteUserName(userName: string) {
        await this.companyCodeLocator.fill(userName);
        await this.companyCodeLocator.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Control+C');
        await this.userNameLocator.click();
        await this.page.keyboard.press('Control+V');
        await this.companyCodeLocator.click();
        await this.page.keyboard.press('Control+A+Delete');
    }

    async clickOnForgotPasswordButton() {
        await this.forgotPasswordButton.click();
    }

    async resetPassword(userName: string, companyName: string) {
        await this.userNameLocator.fill(userName);
        await this.companyCodeLocator.fill(companyName);
        await this.resetPasswordButton.click();
    }

    async verifyResetPassword(popup: string) {
        const value1 = await this.resetPasswordEmailPopup.textContent();
        expect(value1).toBe(popup);
    }

    async verifyErrorMessage(expectedErrorMessage: string) {
        await this.page.waitForTimeout(3000);
        const actualErrorMessage = await this.errorMessageLocator.textContent();
        expect(actualErrorMessage).toBe(expectedErrorMessage);
    }
    async verifyAccountLockedMessage(accountLockedMessage: string) {
        const value1 = await this.accountLockedMessage.textContent();
        expect(value1).toBe(accountLockedMessage);
    }
    async verifyUsernameAndPasswordField(url: string, username: string, password: string) {

        await this.page.goto(url, { waitUntil: 'networkidle' });

        await this.page.waitForLoadState('networkidle');

        expect(await this.userNameLocator.inputValue()).toBe(username);

    }
    async verifyUserIsLockedOutForSityMinutes(lockedOutMessage: string) {
        expect(await this.page.locator('//P').textContent()).toContain(lockedOutMessage);
    }
    //Multi Factor Authntication
    async clickOnSmsRadioButton() {
        await this.smsRadiOButton.click();
    }
    async clickOnEmailRadioButton() {
        await this.page.waitForTimeout(5000);
        await this.emailRadiOButton.click();
    }
    async clickOnAuthenticatorAppRadioButton() {
        await this.authenticatorAppRadiOButton.click();
    }
    async clickOnSevndVerificationCodeButton() {
        await this.sendVerificationCodeButton.click();
    }
    async clickOnVerificationCodeButton() {
        await this.verificationCodeButton.click();
    }
    async clickOnMFALoginButton() {
        await this.mfaLoginButton.click();
    }
    async clickOnBackToLoginButton() {
        await this.backToLogibButton.click();
    }
    async clickOnCloseMFAPopupButton() {
        await this.closeMFAPopupButton.click();
    }

    async verifyMFAPopupIsVisible() {
        expect(this.closeMFAPopupButton).toBeVisible();
    }

    //Forgot Password
    async clickOnContactSupportButton() {
        await this.contactSupportButton.click();
    }
    async clickOnSubmitButton() {
        await this.submitButton.click();
    }
    async clickOnCloseContactSupportPopupButton() {
        await this.closeContactSupprotPopupButton.click();
    }
    async verifyContactSupprotPopupIsVisible() {
        expect(this.closeContactSupprotPopupButton).toBeVisible();
    }
    async verifyContactSupportPopupIsClosed() {
        expect(this.closeContactSupprotPopupButton).not.toBeVisible();
    }
}

