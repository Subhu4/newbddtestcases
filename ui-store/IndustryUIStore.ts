import { Page, Locator } from '@playwright/test';

/** Makes plain text safe to use inside a regular expression. */
const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Author: Subham Maharana
 * Class Name: IndustryUIStore
 * Description: UI store for an industry page (e.g. Agricultural Products & Equipment, Textiles, Yarn & Fabrics).
 *              Only locators live here - the actions are in pages/IndustryPage.ts.
 */
export class IndustryUIStore {
  readonly CATEGORY_HEADINGS: Locator;
  readonly BREADCRUMB_BUYERS: Locator;
  readonly PAGE_HEADING: (value: string) => Locator;
  readonly CATEGORY_HEADING: (value: string) => Locator;

  /**
   * Author: Subham Maharana
   * Method Name: constructor
   * Description: Creates all locators of this page.
   * Parameters: page {Page} - Playwright page
   * Return Type: IndustryUIStore
   */
  constructor(private page: Page) {
    // ---------- LOCATORS ----------
    this.CATEGORY_HEADINGS = page.locator('h3');
    this.BREADCRUMB_BUYERS = page.getByRole('link', { name: 'Buyers', exact: true }).last();
    this.PAGE_HEADING = (heading: string) => page.getByRole('heading', { name: heading, exact: true }).first();
    this.CATEGORY_HEADING = (category: string) => page.getByRole('heading', { name: new RegExp(`^${escapeRegex(category)}\\s*\\(`) }).first();
  }
}
