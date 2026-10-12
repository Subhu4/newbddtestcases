import { Page, Locator } from '@playwright/test';

/**
 * Author: Subham Maharana
 * Class Name: A4SizePaperUIStore
 * Description: UI store for the A4 Size Paper buy leads page.
 *              Only locators live here - the actions are in pages/A4SizePaperPage.ts.
 */
export class A4SizePaperUIStore {
  readonly BREADCRUMB_HOME: Locator;
  readonly BREADCRUMB_BUYERS: Locator;
  readonly CONTACT_BUYER: Locator;
  readonly SHOW_MORE_RESULT: Locator;
  readonly PAGE_HEADING: (value: string) => Locator;

  /**
   * Author: Subham Maharana
   * Method Name: constructor
   * Description: Creates all locators of this page.
   * Parameters: page {Page} - Playwright page
   * Return Type: A4SizePaperUIStore
   */
  constructor(private page: Page) {
    // ---------- LOCATORS ----------
    this.PAGE_HEADING = (heading: string) => page.getByRole('heading', { name: heading }).first();
    this.BREADCRUMB_HOME = page.getByText('Home', { exact: true }).first();
    this.BREADCRUMB_BUYERS = page.getByText('Buyers', { exact: true }).first();
    this.CONTACT_BUYER = page.getByText('Contact Buyer').first();
    this.SHOW_MORE_RESULT = page.getByText('Show More Result', { exact: true }).first();
  }
}
