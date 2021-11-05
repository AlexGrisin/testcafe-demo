const devices = require('../../config/devices');
const screenSizes = require('../../config/screenSizes');

const prepareDevice = () => {
  if (config.device) {
    return getDeviceConnectionString();
  } else {
    setScreenSize();
    return getBrowserConnectionString(config.browsers);
  }
};

function getDeviceConnectionString() {
  if (devices[config.device]) {
    const device = devices[config.device];
    config.isMobile = device.isMobile;
    const os = config.os ? `@${config.os}` : '';
    return config.browserstack ? `${device.browserstack}${os}` : device.emulation;
  }
}

function getBrowserConnectionString() {
  if (config.browserstack) {
    const browser = config.browsers ? config.browsers.split(',')[0] : 'chrome:headless';
    const os = config.os ? config.os : 'Windows 10';
    return `browserstack:${browser}:${os}`;
  } else {
    return config.browsers ? config.browsers.split(',') : ['chrome:headless'];
  }
}

function setScreenSize() {
  if (config.screenSize) {
    config.screenSize = screenSizes[config.screenSize];
  }
}

module.exports = prepareDevice;
