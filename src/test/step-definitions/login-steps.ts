import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import RegisterPage from "../../pages/loginPage";
import { fixture } from "../../hooks/pageFixture";
import Assert from "../../utilities/wrapper/assert";
// import * as data from "../../utilities/testdata/uat/login.json";
const data = require(`../../utilities/testdata/${process.env.ENV || 'uat'}/login.json`) as Record<string, any>;

import LoginPage from "../../pages/loginPage";

let loginPage: LoginPage;
let assert: Assert;
// setDefaultTimeout(60 * 1000 * 15);

Given('I navigate to the login page', async function () {
    loginPage = await new RegisterPage(fixture.page);
    assert = new Assert(fixture.page);
    await loginPage.navigateToLoginPage(process.env.BASEURL);
});

When('I enter login credentials {string}', async function (userName) {
    // const username = data.userName + Date.now().toString();
    await loginPage.enterUsername(userName);
    await loginPage.enterCompanyCode(data.companyCode);
    await loginPage.enterPassword(data.password);
});
When('I click on login button', async function () {
    // const username = data.userName + Date.now().toString();
    await loginPage.clickOnLoginButton();
});

Then('I confirm user registration is success', async function () {
});