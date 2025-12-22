const puppeteer = require("puppeteer");
const puppeteerCore = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");
const axeSource = require("axe-core").source;
const fs = require("fs");
const path = require("path");

const validateComponent = async (component) => {
  console.log(`Running accessibility tests for ${component.id}`);
  // Optional: Load any fonts you need.
  // detect if we are on a mac
  const isMac = process.platform === "darwin";
  let browser;
  if (isMac) {
    browser = await puppeteer.launch();
  } else {
    browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.default.executablePath(),
      headless: chromium.headless,
    });
  }
  const previews = Object.keys(component.previews);
  const output = [];
  const logOutput = [];
  if(!component.id) {
    throw new Error("Component ID is required. No ID found for component: " + component.title);
  }
  const css = await fs.readFileSync(
    path.join(__dirname, "..", "public/api/component", `${component.id}.css`),
    "utf8"
  );
  for (const preview of previews) {
    const page = await browser.newPage();
    const previewPath = path.join(
      __dirname,
      "..",
      "public/api/component",
      component.previews[preview].url
    );
    console.log("previewPath", previewPath);

    let html = fs.readFileSync(previewPath, "utf8");
    // Load your component HTML in a blank page

    await page.setContent(html, { waitUntil: "load" });
    await page.addStyleTag({
      content: css,
    });
    // Inject axe-core into the page
    await page.evaluate(axeSource);
    const screenshotPath = path.join(
      __dirname,
      "..",
      "public/images/components",
    );
    if (!fs.existsSync(screenshotPath)) {
      fs.mkdirSync(screenshotPath, { recursive: true });
    }
    const screenshotFilePath = path.join(screenshotPath, `${component.id}.png`);
    if (!fs.existsSync(screenshotFilePath)) {
      const selector = await page.$('.preview-body');
      if (selector) {
        const bounding_box = await selector.boundingBox();
        await selector.screenshot({
          path: screenshotFilePath,
          clip: {
            x: bounding_box.x,
            y: bounding_box.y,
            width: Math.min(bounding_box.width, page.viewport().width),
            height: 400,
          }
        });
      }

    }
    // Run axe inside the page context
    const results = await page.evaluate(async () => {
      return await axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa"],
        },
        rules: {
          "document-title": { enabled: false },
          "html-has-lang": { enabled: false },
        },
      });
    });
    // Process violations
    const violations = results?.violations || [];
    logOutput.push({
      component: component.id,
      preview: preview,
      results,
    });

    const a11yPassed = violations.length === 0;
    const a11yMessages =
      violations.length > 0
        ? violations.map(
          (v) =>
            `${v.id
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}: ${v.description}`
        )
        : ["No accessibility issues found"];
    output.push({
      preview: preview,
      passed: a11yPassed,
      messages: a11yMessages,
    });
  }
  await browser.close();
  // Write the log output to a file
  // const logFilePath = path.join(
  //   __dirname,
  //   "..",
  //   "public/api/component",
  //   component.id,
  //   "accessibility_log.json"
  // );
  // fs.writeFileSync(logFilePath, JSON.stringify(logOutput, null, 2));

  const results = {
    passed: output.every((result) => result.passed),
    messages: output
      .map((result) =>
        result.messages.filter((message) => !message.includes("No accessibility issues found")).map((message) => message + ` (preview: ${result.preview})`)
      )
      .flat(),
  };
  return {
    a11y: results,
  };
};

module.exports = {
  validateComponent,
};
