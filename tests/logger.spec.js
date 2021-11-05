import { getResponseBody, waitForRequest } from '../utils/RequestLoggerUtils';
import { RequestLogger, t } from 'testcafe';

const productCode = '51010-6132-1243';
const loggerRegexp = new RegExp('productdata');
const logger = RequestLogger(loggerRegexp, {
  logResponseBody: true,
  logResponseHeaders: true,
});

fixture(`Request logger`)
  .before(async () => {
    console.log(`Running tests on ${config.env}`);
  })
  .beforeEach(async () => {
    await t.navigateTo(`https://${config.env}-www.raw-indigo.com/${config.locale}/shop/men/jeans/${productCode}`);
    await waitForRequest(logger);
  })
  .requestHooks(logger)
  .page(`https://${config.env}-www.raw-indigo.com/${config.locale}?gs-origin=email`);

test('check response status code', async () => {
  const productDataRequest = logger.requests[0];
  await t.expect(productDataRequest.response.statusCode).eql(200);
});

test('check response header', async () => {
  const productDataRequest = logger.requests[0];
  const contentEncoding = productDataRequest.response.headers['content-encoding'];
  await t.expect(contentEncoding).eql('gzip');
});

test('check response body', async () => {
  const responseBody = await getResponseBody(logger);
  await t.expect(responseBody.formattedBasePrice).contains('190.00');
});
