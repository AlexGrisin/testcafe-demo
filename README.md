# Demo TestCafe framework

## Documentation

- [TestCafe](https://testcafe.io/documentation/402631/why-testcafe)

### Install TestCafe

Before you get started working with project you have to install dependencies:

- Install Node.js - https://nodejs.org/en/download/
- Install dependencies:

```bash
npm install
```

## E2E Testing

### Execute tests

Running tests on desktop browser:

```bash
npm run e2e:run -- --browsers=chrome --source=tests --env=tst11 --locale=en_us --screenSize=desktop
```

Running tests using emulation:

```bash
npm run e2e:run -- --source=tests --browsers=chrome --env=tst11 --locale=en_us --device=iphonex
```

### Test run arguments

| Option | Description |
| --- | --- |
| --browsers | Comma separated list of browsers that you want to run the tests on (chrome, chrome:headless, firefox) |
| --os | Operation system to run tests (Windows 10, OS X Big Sur, etc.). Used only when running on BrowserStack |
| --env | Name of the environment that you want to run the test on (tst1, acc1, etc.) |
| --locale | Comma separated list of locales (nl_nl, en_us) |
| --source | The test folder path that you want to execute |
| --screenSize | Screen size to run the tests for. This only works for non-mobile devices. The value can either be a string (small, large) |
| --testNameFilter | A string that is used to match against test names to run specific tests |
| --fixtureNameFilter | A string that is used to match against fixture names to run specific tests. |
| --debugOnFail | Screen size to run the tests for. This only works for non-mobile devices. The value can either be a string (small, large) |
| --quarantine | Run the tests in quarantine mode. If a test fails, TestCafé will run it again |
| --testExecutionSpeed | Specifies the test execution speed |
| --concurrency | Specifies that tests should run concurrently |
| --device | Name of the device to run the tests on. Defaults to local |
| --video | Used to enable testcafe run video recording |
| --browserstack | Used to run testcafe tests on browserstack |

## Debugging

- use `e2e:runner-debug` instead of `e2e:runner`
- `--debugMode=true` - Specify this option to run tests in the debug mode. In this mode, test execution is paused
- `--debugOnFail=true` - Specify this option to enter debug mode when a test fails.

## BrowserStack

### Execute tests on BrowserStack

- export BrowserStack credentials

```bash
export BROWSERSTACK_USERNAME="<user name>"
export BROWSERSTACK_ACCESS_KEY="<access key>"
```

- run tests with `browserstack` flag set to true

Desktop:
```bash
npm run e2e:run -- --browsers=safari --os='OS X Big Sur' --source=tests --env=tst11 --locale=en_us --screenSize=desktop --fixtureNameFilter=login --browserstack=true
```

Device:
```bash
npm run e2e:run -- --source=tests --env=tst11 --locale=en_us --device='iphonex' --fixtureNameFilter=login --browserstack=true
```

For more info: https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/testcafe#executing-tests-on-browserstack

### Debugging

- BrowserStack debugging options (https://www.browserstack.com/docs/automate/selenium/debugging-options)

### Useful info

- Browsers & Mobile devices list: https://www.browserstack.com/list-of-browsers-and-platforms/automate
- Capabilities: https://www.browserstack.com/automate/capabilities
- Screen resolution: https://www.browserstack.com/docs/automate/selenium/change-screen-resolution