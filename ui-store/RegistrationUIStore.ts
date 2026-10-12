import { Page, Locator } from '@playwright/test';

/**
 * Author: Subham Maharana
 * Class Name: RegistrationUIStore
 * Description: UI store for the seller registration page (Register your Company FREE).
 *              Only locators live here - the actions are in pages/RegistrationPage.ts.
 */
export class RegistrationUIStore {
  readonly PAGE_HEADING: Locator;
  readonly SUB_HEADING: Locator;
  readonly VISIBLE_INPUTS: Locator;
  readonly CREATE_ACCOUNT: Locator;

  /**
   * Author: Subham Maharana
   * Method Name: constructor
   * Description: Creates all locators of this page.
   * Parameters: page {Page} - Playwright page
   * Return Type: RegistrationUIStore
   */
  constructor(private page: Page) {
    // ---------- LOCATORS ----------
    this.PAGE_HEADING = page.getByRole('heading', { name: 'Register your Company FREE', exact: true }).first();
    this.SUB_HEADING = page.getByRole('heading', { name: 'Get Verified Buyers for your Product, FREE!', exact: true }).first();
    this.VISIBLE_INPUTS = page.locator('input:visible');
    this.CREATE_ACCOUNT = page.getByRole('button', { name: 'Create Account', exact: true }).first();
  }
}
