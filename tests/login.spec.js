import accountPage from '../pageobject/AccountPage';
import homePage from '../pageobject/HomePage';
import loginPage from '../pageobject/LoginPage';
import { users } from '../utils/UserUtils';
import { resizeWindow } from './test';

fixture(`My Account login`)
  .before(async () => {
    console.log(`Running tests on ${config.env}`);
  })
  .beforeEach(async () => {
    await resizeWindow();
    await homePage.goToMyAccount();
  })
  .after(async () => {
    console.log('This is done after tests are done');
  })
  .page(`https://${config.env}-www.raw-indigo.com/${config.locale}?gs-origin=email`);

test('log in with supervalid credentials', async () => {
  await loginPage.isAtPage();
  await loginPage.loginToMyAccount(users.testUser.login, users.testUser.password);

  await accountPage.isLoggedIn();
});

test('log in with invalid credentials', async () => {
  await loginPage.isAtPage();
  await loginPage.loginToMyAccount(users.testUser.login, 'invalid_password');

  await loginPage.isLoginFailed();
});
