import { Selector, t } from 'testcafe';

class HomePage {
  constructor() {
    this.myAcccountLink = Selector('.topNavigation-account--login');
    this.topNavigationTriggerIcon = Selector('.topNavigation-sideNavTrigger-icon');
    this.sideNavigation = Selector('.sideNav-scrollContainer');
    this.sideNavigationLoginLink = Selector('.sideNav-bottom-item--login');
  }

  async goToMyAccount() {
    if (config.isMobile) {
      await this.goToMyAccountMobile();
    } else {
      await this.goToMyAccountDesktop();
    }
  }

  async goToMyAccountDesktop() {
    await t.click(this.myAcccountLink);
  }

  async goToMyAccountMobile() {
    await t.click(this.topNavigationTriggerIcon);
    await t.expect(this.sideNavigation.visible).ok();
    await t.click(this.sideNavigationLoginLink);
  }
}

export default new HomePage();
