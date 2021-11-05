const setUpBrowserStack = () => {
  // BrowserStack set up
  process.env['BROWSERSTACK_USE_AUTOMATE'] = '1';
  process.env['BROWSERSTACK_FORCE_LOCAL'] = 'true';
  process.env['BROWSERSTACK_LOCAL_IDENTIFIER'] = config.browserStackLocalIdentifier
    ? config.browserStackLocalIdentifier
    : '';
  process.env['BROWSERSTACK_PARALLEL_RUNS'] = '1';
  process.env['BROWSERSTACK_ACCEPT_SSL_CERTS'] = 'true';

  // Test run name
  process.env['BROWSERSTACK_PROJECT_NAME'] = 'TestCafe-Demo-Project';
  process.env['BROWSERSTACK_TEST_RUN_NAME'] = 'TestCafe-Demo-Test-Run';
  process.env['BROWSERSTACK_BUILD_ID'] = 'TestCafe-Demo-Build-Id';

  // Debugging options
  process.env['BROWSERSTACK_NETWORK_LOGS'] = 'true';
  process.env['BROWSERSTACK_CONSOLE'] = 'verbose';
  process.env['BROWSERSTACK_DEBUG'] = 'true';

  // process.env['BROWSERSTACK_CAPABILITIES_CONFIG_PATH'] =
  // './data/browserstack-config.json';

  if (config.screenSize) {
    console.log(`ScreenSize: ${config.screenSize.width}x${config.screenSize.height}`)
    process.env[
      'BROWSERSTACK_DISPLAY_RESOLUTION'
    ] = `${config.screenSize.width}x${config.screenSize.height}`;
  }
};

module.exports = setUpBrowserStack;
