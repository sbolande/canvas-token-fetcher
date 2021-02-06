const browser = require('./login'),
      getToken = require('./getToken');

module.exports = async function runPuppeteer(input) {
    var page;
    var token = 'TOKEN_NOT_SET';
    try {
        page = await browser.login(input.domain, input.username, input.password);
        token = await getToken(page, input.domain, input.purpose, input.expires)
    } catch(e) {
        console.error(e);
    } finally {
        await browser.logout();
        return token;
    }
}