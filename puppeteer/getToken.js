module.exports = async function getToken(page, env, purpose, tokenExp) {
  // element selectors
  const newTokenButton = ".add_access_token_link",
    tokenPurpose = "#access_token_purpose",
    tokenExpires = "#access_token_permanent_expires_at",
    generateButton = ".btn.btn-primary.submit_button.button_type_submit",
    tokenDiv = "#token_details_dialog .visible_token";
  var token = {};

  await page.goto(`https://${env}.instructure.com/profile/settings`, {
    waitUntil: ["load", "domcontentloaded"],
  });
  await page.waitForSelector(newTokenButton).then(() => {
    page.click(newTokenButton);
  });
  await page.waitForSelector(generateButton, { visible: true });
  await page.type(tokenPurpose, purpose);
  await page.type(tokenExpires, tokenExp);
  await page.click(generateButton);
  await page.waitFor(1000);
  token.result = await page.$eval(tokenDiv, (element) => element.innerText);
  token.success = true;

  return token;
};
