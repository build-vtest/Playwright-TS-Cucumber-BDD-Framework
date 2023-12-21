# Playwright-TS-Cucumber-BDD-Framework

## Overview

This repository contains a robust and feature-rich Playwright framework implemented in TypeScript with Cucumber for Behavior Driven Development (BDD). The framework is designed to facilitate end-to-end testing of web applications with features such as screenshot capture on failure, video recording on failure, detailed traces, and a beautiful HTML report.

## Features

- **Playwright**: Utilizes the power of Playwright to automate browser interactions.
- **TypeScript**: The framework is implemented using TypeScript for a more structured and maintainable codebase.
- **Cucumber BDD**: Follows Behavior Driven Development principles using Cucumber for clear and expressive feature descriptions.
- **Screenshot on Failure**: Automatically captures screenshots when a test step fails for better debugging.
- **Video on Failure**: Records a video of the test execution when a failure occurs.
- **Detailed Traces**: Provides detailed traces for better insights into test execution.
- **HTML Report**: Generates a beautiful HTML report to visualize test results.

## Prerequisites

- Node.js and npm installed on your machine.

## Getting Started

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/build-vtest/Playwright-TS-Cucumber-BDD-Framework.git

2. Install dependencies:
   ```bash
   npm install

3. INstall all the browsers(Chromium, Firefox and Webkit):
   ```bash
   npx playwright install

4. Execute all the test cases at once:
   ```bash
   cross-env ENV=uat FORCE_COLOR=0 cucumber-js --config=config/cucumber.js

5. To run a particular test change  
   ```
     paths: [
               "src/test/features/featurename.feature"
            ] 
   ```
6. Use tags to run a specific or collection of specs
   ```
   npm run uat-test --TAGS="@smoke or @regression"
   ```
   
## Project structure
- `src` -> Contains all the features & Typescript code
- `test-results` -> Contains all the reports related file

### Folder structure
1. `src\pages` -> All the page (UI screen)
2. `src\test\features` -> write your features here
3. `src\test\steps` -> Your step definitions goes here
4. `src\hooks\hooks.ts` -> Browser setup and teardown logic
5. `src\hooks\pageFixture.ts` -> Simple way to share the page objects to steps
6. `src\utilities\env` -> Multiple environments are handled
7. `src\utilities\types` -> To get environment code suggestions
8. `src\utilities\report` -> To generate the report
9. `config/cucumber.js` -> One file to do all the magic
10. `package.json` -> Contains all the dependencies
11. `src\utilities\auth` -> Storage state (Auth file)
12. `src\utilities\util` -> Read test data from json & logger

## Browser Initialization 
   ### Hooks : `src/hooks/hooks.ts`
   ```
      - `BeforeAll hook` (Will execute only once before first scenario is executed) In this hook we are
setting the environment using `getEnv()` funtion and invoking the browser using `invokeBrowser()` function.
   ```
   ```
      - `Before hook` (Will execute once before each scenario) In this hook we are creating the
browser context and configuring the context for various configurations and then creating the page out
of this configured context and assigning it to the pageFixture from where we are distributing this
common page fixture to every page and step definition classses.
   ```
   ```
      - `After hook` (Will execute once after each scenario) In this hook we are attaching the
screenshots, videos and traces to the reports only when scenarios get failed.
   ```
   ```
      - `AfterAll hook` (Will execute only once after last scenario is executed) In this
hook we are closing our browser.
   ```
## Reports

1. Mutilple Cucumber Report:

   ![image](https://github.com/build-vtest/Playwright-TS-Cucumber-BDD-Framework/assets/98380372/60806e7c-22fa-4e1c-b61d-84016234b836)

   ![image](https://github.com/build-vtest/Playwright-TS-Cucumber-BDD-Framework/assets/98380372/dd2645e7-5fb0-4d6e-ab75-90f7abb861e5)

2. Default Cucumber report:

   ![image](https://github.com/build-vtest/Playwright-TS-Cucumber-BDD-Framework/assets/98380372/1854ac75-b83d-49bb-a95d-09be9223c9fa)

3. Logs
4. Screenshots on failure
5. Test videos on failure
6. Trace on failure

# How to add your test cases : 

## 1. Create a New Page Class:
Implement a new TypeScript class for your page, following the existing structure.
Ensure the page class encapsulates the functionality and elements of the corresponding page in your application.
   ```typescript
      // Example: LoginPage.ts
   export default class LoginPage {
       // Implement your page methods and elements here
   }

   ```
## 2. Adding New Feature Files
   1. Navigate to src/test/features directory:
   2. Create a New Feature File:
         Implement a new Cucumber feature file, using Gherkin syntax to describe your scenarios.
      Reference the steps that you will define in the step definitions.
   ```gherkin
       # Example: login.feature
   Feature: Login feature

  Scenario: Login to the application
    Given I navigate to the login page
    When I enter login credentials "DemoSuperUser"
    And I click on login button
    Then I confirm user registration is success


   ```
## 3. Adding New Step Definitions
   1. Navigate to src/test/step-definitions directory
      ```bash
      cd src/test/step-definitions
      
   2. Create a New Step Definitions File:
         Implement a new TypeScript file for your step definitions.
      Write step definitions for the scenarios described in the corresponding feature file.
   ```typescript
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
   ```
