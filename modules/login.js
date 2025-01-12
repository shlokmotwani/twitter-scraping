import { xpaths } from "./xpaths.js";
import { credentials } from "./credentials.js";

async function login(page) {
  try {
    const signInButton = await page.waitForSelector(
      `::-p-xpath(${xpaths.XPATH_SIGN_IN_BUTTON})`
    );
    await signInButton.click();
    console.log("Sign-in button clicked");

    const emailField = await page.waitForSelector(
      `::-p-xpath(${xpaths.XPATH_EMAIL_FIELD})`
    );
    await emailField.type(credentials.TWITTER_EMAIL);
    console.log("Email address entered");

    const nextAfterEmail = await page.waitForSelector(
      `::-p-xpath(${xpaths.XPATH_NEXT_BUTTON_AFTER_EMAIL})`
    );
    await nextAfterEmail.click();
    console.log("Going forward...");

    const usernameField = await page.waitForSelector(
      `::-p-xpath(${xpaths.XPATH_USERNAME_FIELD})`
    );
    if (usernameField) {
      await usernameField.type(credentials.TWITTER_USERNAME);
      console.log("Username entered");
      const nextButton = await page.waitForSelector(
        `::-p-xpath(${xpaths.XPATH_NEXT_BUTTON_AFTER_USERNAME})`
      );
      await nextButton.click();
      console.log("Moving ahead to enter the password");
    }

    const passwordField = await page.waitForSelector(
      `::-p-xpath(${xpaths.XPATH_PASSWORD_FIELD})`
    );
    await passwordField.type(credentials.TWITTER_PASSWORD);
    console.log("Password entered");

    const loginButton = await page.waitForSelector(
      `::-p-xpath(${xpaths.XPATH_LOGIN_BUTTON_AFTER_PASSWORD})`
    );
    await loginButton.click();
    console.log("Login button clicked");

    const popupCloseButton = await page.waitForSelector(
      `::-p-xpath(${xpaths.XPATH_POPUP_CLOSE_BUTTON})`
    );
    if (popupCloseButton) {
      await popupCloseButton.click();
    }
  } catch (error) {
    console.log(error);
  }
}

export { login };
