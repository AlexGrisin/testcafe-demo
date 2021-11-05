import { Selector, t } from 'testcafe';
import { users } from '../utils/UserUtils';

class AccountPage {
  constructor() {
    this.accountHeader = Selector('.account-headerTitle');
  }

  async isLoggedIn() {
    await t.expect(this.accountHeader.textContent).contains(users.testUser.name);
  }
}

export default new AccountPage();
