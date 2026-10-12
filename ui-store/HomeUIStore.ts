import { Page, Locator } from '@playwright/test';

/**
 * Author: Subham Maharana
 * Class Name: HomeUIStore
 * Description: UI store for the ExportersIndia homepage (search bar and For Buyer menu).
 *              Only locators live here - the actions are in pages/HomePage.ts.
 */
export class HomeUIStore {
  readonly SEARCH_INPUT: Locator;
  readonly FOR_BUYER: Locator;
  readonly POST_BUY_REQUIREMENT_LINK: Locator;
  readonly POST_BUY_REQUIREMENT_TEXT: Locator;

  /**
   * Author: Subham Maharana
   * Method Name: constructor
   * Description: Creates all locators of this page.
   * Parameters: page {Page} - Playwright page
   * Return Type: HomeUIStore
   */
  constructor(private page: Page) {
    // ---------- LOCATORS ----------
    this.SEARCH_INPUT = page.getByPlaceholder('Enter product / service to search').first();
    this.FOR_BUYER = page.getByText('For Buyer', { exact: true }).first();
    this.POST_BUY_REQUIREMENT_LINK = page.locator('a[href*="post-buy-requirement"]:visible').first();
    this.POST_BUY_REQUIREMENT_TEXT = page.getByText('Post Buy Requirement', { exact: true }).first();
  }
}
