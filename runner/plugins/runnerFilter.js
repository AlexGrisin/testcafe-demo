const testRunFilter = (runner, config) => {
  const testNameFilter = config.testNameFilter ? config.testNameFilter : '';
  const fixtureNameFilter = config.fixtureNameFilter ? config.fixtureNameFilter : '';

  runner.filter(async (testName, fixtureName, fixturePath, testMeta, fixtureMeta) => {
    return testName.match(testNameFilter) && fixtureName.match(fixtureNameFilter);
  });
};

module.exports = testRunFilter;
