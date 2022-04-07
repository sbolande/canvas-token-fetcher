const browser = require("./login"),
  getToken = require("./getToken");

module.exports = async function runPuppeteer(input) {
  var page;
  var token = {
    success: false,
    result: "TOKEN_NOT_SET",
    reason: "Token not yet set",
  };
  try {
    page = await browser.login(input.domain, input.username, input.password);
  } catch (e) {
    console.error(e);
    token.success = false;
    token.reason = `Login failed. Please check your username and password are correct.`;
    await browser.close();
    return token;
  }
  try {
    token = await getToken(page, input.domain, input.purpose, input.expires);
  } catch (e) {
    console.error(e);
    token.success = false;
    token.reason = e.message;
  } finally {
    await browser.close();
    return token;
  }
};
