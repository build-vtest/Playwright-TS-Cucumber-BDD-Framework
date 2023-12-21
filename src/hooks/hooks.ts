import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../utilities/browsers/browserManager";
import { getEnv } from "../utilities/env/env";
import { createLogger } from "winston";
import { options } from "../utilities/util/logger";
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before({ timeout: 150000 }, async function ({ pickle }) {
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos",
        },
        geolocation: { longitude: 170.088155, latitude: 75.145800 },
        permissions: ['geolocation']
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle, result }) {
    let videoPath: string;
    let img: Buffer;
    const path = `./test-results/trace/${pickle.id}.zip`;
    if (result?.status == Status.FAILED) {
        img = await fixture.page.screenshot(
            { path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
        videoPath = await fixture.page.video().path();
    }
    await context.tracing.stop({ path: path });
    await fixture.page.close();
    await context.close();
    if (result?.status == Status.FAILED) {
        await this.attach(
            img, "image/png"
        );
        await this.attach(
            fs.readFileSync(videoPath),
            'video/webm'
        );
        const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
        await this.attach(`Trace file: ${traceFileLink}`, 'text/html');

    }

});

AfterAll(async function () {
    await browser.close();
})