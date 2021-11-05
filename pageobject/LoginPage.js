import { Selector, t } from 'testcafe';

class LoginPage {
  constructor() {
    this.loginPage = Selector('.page-login');
    this.loginField = Selector('#j_username');
    this.passwordField = Selector('#j_password');
    this.submitButton = Selector('.checkout-formButton--save');
    this.errorAlert = Selector('.alert-info');
  }

  async isAtPage() {
    await t.expect(this.loginPage.exists).ok();
  }

  async loginToMyAccount(userName, password) {
    await t.typeText(this.loginField, userName, { replace: true });
    await t.typeText(this.passwordField, password, { replace: true });
    await t.click(this.submitButton);
  }

  async isLoginFailed() {
    await t.expect(this.errorAlert.exists).ok();
  }
}

export default new LoginPage();
