async function fetchWhatsHappening(page) {
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

export { fetchWhatsHappening };
