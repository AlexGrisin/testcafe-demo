const createTestCafe = require('testcafe');
const testRunFilter = require('./plugins/runnerFilter');
const prepareDevice = require('./plugins/testDeviceConfig');
const config = require('minimist')(process.argv.slice(2));
const setUpBrowserStack = require('./plugins/browserStackPlugin');

global.config = config;

const run = async () => {
  const testcafe = await createTestCafe('localhost', 1337, 1338);

  // Set up test device config
  const testStage = prepareDevice();
  if (!testStage) {
    throw Error('Not supported device. Please check input parameters.');
  }
  console.log(`TestStage: ${testStage}`);

  // Set up BrowserStack config
  if (config.browserstack) {
    setUpBrowserStack();
  }

  // Test execution parameters
  const source = config.source ? config.source : 'tests';
  const quarantineConfig = config.quarantine ? { successThreshold: 1, attemptLimit: 3 } : false;
  const testExecutionSpeed = config.testExecutionSpeed ? config.testExecutionSpeed : 1;
  const concurrency = config.concurrency ? config.concurrency : 1;

  console.log(`Running tests using config: ${JSON.stringify(config)}`);

  let failedCount;

  try {
    const testcafe = await createTestCafe('bs-local.com');
    const runner = testcafe.createRunner();

    runner.src([source]).browsers(testStage).concurrency(concurrency).screenshots({
      path: 'artifacts/screenshots',
      takeOnFails: true,
      fullPage: true,
      pathPattern: '${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.png',
    });

    if (config.video === 'true') {
      runner
        // TestCafe cannot adjust the video resolution during recording
        .screenshots({
          fullPage: false,
        })
        .video('artifacts/videos', {
          singleFile: true,
          failedOnly: true,
          pathPattern: '${TEST_INDEX}/${USERAGENT}/${FILE_INDEX}.mp4',
        });
    }

    testRunFilter(runner, config);

    failedCount = await runner.run({
      skipJsErrors: true,
      speed: testExecutionSpeed,
      debugOnFail: config.debugOnFail || false,
      debugMode: config.debugMode || false,
      quarantineMode: quarantineConfig,
    });

    console.log('Tests failed: ' + failedCount);
  } catch (error) {
    console.error(error);
  } finally {
    const exitCode = failedCount > 0 ? 1 : 0;
    await testcafe.close();
    process.exit(exitCode);
  }
};

run();
