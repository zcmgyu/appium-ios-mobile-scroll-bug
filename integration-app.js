const wd = require('wd');
const path = require("path");

async function sleep(secs) {
  return new Promise(resolve => setTimeout(resolve, secs * 1000));
}

describe('TestSuite', async () => {
  let driver;

  // TODO: Before all
  before(async () => {
    const caps = {
      "platformName": "ios",
      "deviceName": "iPhone 11",
      "platformVersion": "14.3",
      "app": path.resolve("./IntegrationApp.zip"),
      "automationName": "XCUITest",
      "newCommandTimeout": 0,
      "connectHardwareKeyboard": false,
      "useNewWDA": true,
      "clearSystemFiles": true,
      "shouldUseSingletonTestManager": false,
      "wdaStartupRetries": 4,
      "wdaStartupRetryInterval": 20000,
      "iosInstallPause": 8000,
      "showXcodeLog": true
    }

    driver = await wd.promiseChainRemote('http://localhost:4723/wd/hub');

    await driver.init(caps);
  });

  // TODO: After all
  after(async () => {
    console.log('Quit');
    await driver.quit();
  });

  // TODO: Execute test cases
  it('Run test case', async () => {
    try {
      console.log('Click scrolling');
      const scrolling = await driver.element(
        '-ios predicate string',
        `label == "Scrolling" AND name == "Scrolling" AND value == "Scrolling"`
      );
      await scrolling.click();

      console.log('Click table view');
      const TableView = await driver.element(
        '-ios predicate string',
        `label == "TableView" AND name == "TableView" AND value == "TableView"`
      );
      await TableView.click();

      console.log('Scroll until 32');
      const response = await driver.execute('mobile: scroll', {
        predicateString: `label == "32"`,
      });
      if (response?.error) {
        throw response;
      }
      console.log('DEBUG response', response);
    } catch (error) {
      console.log('Error', error);
    }
  })
})