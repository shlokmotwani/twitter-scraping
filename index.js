import puppeteer from "puppeteer";
import { xpaths } from "./xpaths.js";
import { credentials } from "./credentials.js";

let data;

const browser = await puppeteer.launch({
  headless: true,
  defaultViewport: false,
});

const page = await browser.newPage();
page.setDefaultTimeout(120000);
await page.goto("https://x.com");

async function login() {
    try {
      const signInButton = await page.waitForSelector(
        `::-p-xpath(${xpaths.XPATH_SIGN_IN_BUTTON})`
      );
      await signInButton.click();
      console.log("Sign-in button clicked");
  
      const emailField = await page.waitForSelector(
        `::-p-xpath(${xpaths.XPATH_EMAIL_FIELD})`
      );
      await emailField.type(credentials.email);
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
        await usernameField.type(credentials.username);
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
      await passwordField.type(credentials.password);
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
  
  async function whatsHappening() {
    // Extract the content of "What's Happening"
    const sectionData = await page.evaluate(() => {
      const sectionElements = document.querySelectorAll(
        'div[data-testid="trend"]'
      );
      let data = [];
  
      sectionElements.forEach((element) => {
        const category = element.querySelector("div > div:nth-child(1) > span")
          ? element.querySelector("div > div:nth-child(1) > span").innerText
          : "";
        const title = element.querySelector("div > div:nth-child(2) > span")
          ? element.querySelector("div > div:nth-child(2) > span").innerText
          : "";
        const postsCount = element.querySelector("div > div:nth-child(3) > span")
          ? element.querySelector("div > div:nth-child(3) > span").innerText
          : "";
        data.push({ category, title, postsCount });
      });
  
      return data;
    });
  
    return sectionData;
  }
  

await login();
console.log("Logged in successfully!");

data = await whatsHappening();
console.log(data);