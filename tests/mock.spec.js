import { RequestLogger, RequestMock, t } from 'testcafe';
import { waitForRequest } from '../utils/RequestLoggerUtils';

const chatMockedResponseCode = 404;
const chatRequestRegexp = new RegExp('embeddedService/js/chat.js');
const mockChat = RequestMock()
                    .onRequestTo(chatRequestRegexp)
                    .respond('', chatMockedResponseCode);
const loggerChat = RequestLogger(chatRequestRegexp);

fixture(`Mock request`)
  .before(async () => {
    console.log(`Running tests on ${config.env}`);
  })
  .beforeEach(async () => {
    await t.navigateTo(`https://${config.env}-www.raw-indigo.com/${config.locale}/shop/men/jeans/51010-6132-1243`);
    await waitForRequest(loggerChat);
  })
  .requestHooks(loggerChat)
  .page(`https://${config.env}-www.raw-indigo.com/${config.locale}?gs-origin=email`);

test('mock request disabled', async () => {
  const chatRequest = loggerChat.requests[0];
  await t.expect(chatRequest.response.statusCode).eql(200);
});

test.requestHooks(mockChat)('mock request enabled', async () => {
  const chatRequest = loggerChat.requests[0];
  await t.expect(chatRequest.response.statusCode).eql(chatMockedResponseCode);
});
