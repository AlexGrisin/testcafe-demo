const devices = {
  iphonex: {
    isMobile: true,
    browserstack: 'browserstack:iPhone X',
    emulation: 'chrome:emulation:device=iPhone X',
  },
  iphone8: {
    isMobile: true,
    browserstack: 'browserstack:iPhone 8',
    emulation: 'chrome:emulation:device=iPhone 6/7/8',
  },
  pixel2: {
    isMobile: true,
    browserstack: 'browserstack:Google Pixel 2',
    emulation: 'chrome:emulation:device=Pixel 2',
  },
  ipad: {
    isMobile: false,
    browserstack: 'browserstack:iPad 8th',
    emulation: 'chrome:emulation:device=iPad',
  },
  custom: {
    isMobile: true,
    browserstack: '',
    emulation: 'chrome:emulation:width=500;height=500;mobile=true;orientation=vertical;touch=true'
  },
};

module.exports = devices;
