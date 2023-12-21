import { LaunchOptions, chromium, firefox, webkit, devices } from "@playwright/test";

const options: LaunchOptions = {
    headless: !true,
}
export const invokeBrowser = async function () {
    const browserType = process.env.BROWSER || "chrome";
    switch (browserType) {
        case "chrome":
            return await chromium.launch(options);
        case "firefox":
            return await firefox.launch(options);
        case "webkit":
            return await webkit.launch(options);
        default:
            throw new Error("Please set the proper browser!")
    }

}