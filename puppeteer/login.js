const puppeteer = require('puppeteer');
const usernameInput = '#pseudonym_session_unique_id';
const passwordInput = '#pseudonym_session_password';
const button = 'button[type=submit]';
var browser;

async function login(env, username, password) {
    // set the view window for puppeteer
    browser = await puppeteer.launch({
        headless: true,
        // headless: false,
        defaultViewport: {
            width: 1920,
            height: 1080
        },
        args: ['--start-maximized']
    });

    var pages = await browser.pages();
    // set the default amount of pages opened to one
    var page = pages[0];

    // go to the canvas login and input the login and password
    await page.goto(`https://${env}.instructure.com/login/canvas`, {
        waitUntil: ['load', 'domcontentloaded']
    });
    await page.waitForSelector(usernameInput)
    await page.type(usernameInput, username);
    await page.type(passwordInput, password);

    await Promise.all([page.waitForSelector('.ic-Dashboard-header__title'), page.click(button)]);
    return page;
}

// close the browser, killing the session when done.
async function logout() {
    await browser.close();
}

module.exports = {
    login: login,
    logout: logout
}