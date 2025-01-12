import puppeteer from "puppeteer";
import mongoose from "mongoose";

import { login } from "./modules/login.js";
import { fetchWhatsHappening } from "./modules/fetchWhatsHappening.js";
import { credentials } from "./modules/credentials.js";
import { Trend } from "./Schema/Trends.js";

const MONGO_DB_URL = `mongodb+srv://${credentials.MONGO_DB_USER}:${credentials.MONGO_DB_PASSWORD}@cluster0.ykcup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let data;

const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: false,
});

const page = await browser.newPage();
page.setDefaultTimeout(120000);
await page.goto("https://x.com");

await login(page);
console.log("Logged in successfully!");

await fetchWhatsHappening(page)
  .then((result) => {
    console.log(result);
    return result;
  })
  .then((result) => {
    mongoose
      .connect(MONGO_DB_URL)
      .then((result) => console.log("Connected to database!"))
      .catch((error) => console.log(error));

    const trend = new Trend({
      title0: data[0].title,
      title1: data[1].title,
      title2: data[2].title,
      title3: data[3].title,
      ipAddress: "Dummy IP Address",
      dateTime: "Dummy DateTime",
    });

    trend
      .save()
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  });
