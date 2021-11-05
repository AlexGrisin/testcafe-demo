import { Selector, t } from 'testcafe';

const mockedGeolocation = `navigator.geolocation.getCurrentPosition = success =>
success({
  coords: { latitude: 52.52, longitude: 13.4 },
  timestamp: Date.now(),
});`;

fixture(`clientscript`)
  .beforeEach(async () => {
    await t.navigateTo(`https://${config.env}-www.raw-indigo.com/${config.locale}/find-a-store`);
  })
  .page(`https://${config.env}-www.raw-indigo.com/${config.locale}?gs-origin=email`);

test('clientscript disabled', async () => {
  const citySelector = Selector('.storeFinder-bar-list-item .city');
  await t.expect(citySelector.nth(0).textContent).notEql('BERLIN');
});

test.clientScripts({
  content: mockedGeolocation,
})('clientscript enabled', async () => {
  const citySelector = Selector('.storeFinder-bar-list-item .city');
  await t.expect(citySelector.nth(0).textContent).eql('BERLIN');
});
