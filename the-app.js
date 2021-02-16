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
      "app": path.resolve("./TheApp.zip"),
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
    console.log('DEBUG after');
    await driver.quit();
  });

  // TODO: Execute test cases
  it('Run test case', async () => {
    try {
      console.log('Click List Demo');
      const list = await driver.elementById('List Demo');
      await list.click();
      await sleep(10);

      console.log('Scroll to APIテスト');
      const response = await driver.execute('mobile: scroll', {
        predicateString: `label BEGINSWITH "APIテスト"`,
      });
      if (response?.error) {
        throw response;
      }
      console.log('Response', response);
    } catch (error) {
      console.log('Error', error);
    }
  })
})