export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chrome" | "firefox" | "webkit",
            ENV: "staging" | "prod" | "test",
            REG_USER_URL:string,
            BASEURL: string,
            HEAD: "true" | "false"
        }
    }
}