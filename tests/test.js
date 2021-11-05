import { t } from 'testcafe';

export async function resizeWindow() {
  if (config.screenSize) {
    await t.resizeWindow(config.screenSize.width, config.screenSize.height);
  }
}
