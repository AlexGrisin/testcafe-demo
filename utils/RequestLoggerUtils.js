import { t } from 'testcafe';
import zlib from 'zlib';

export async function waitForRequest(logger) {
  let tries = 0;
  let success = logger.requests.length > 0;

  while (!success && tries < 10) {
    success = logger.requests.length > 0;
    await t.wait(1000);
    tries++;
  }

  await t.expect(success).ok(`No request found:\n${JSON.stringify(logger)}`);
}

export async function getResponseBody(logger) {
  const responseBodyBuffer = logger.requests[0].response.body;
  return new Promise((resolve, reject) => {
    zlib.gunzip(responseBodyBuffer, (error, buffer) => {
      if (error !== null) {
        return reject(error);
      }
      try {
        resolve(JSON.parse(buffer.toString()));
      } catch (e) {
        reject(e.message);
      }
    });
  });
}
