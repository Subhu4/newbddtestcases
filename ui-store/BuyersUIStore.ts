import { Page, Locator } from '@playwright/test';

/** Makes plain text safe to use inside a regular expression. */
const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Author: Subham Maharana
 * Class Name: BuyersUIStore
 * Description: UI store for the Buyers (Buy Leads) page: header, For Buyer menu, industries, popular products and latest leads.
 *              Only locators live here - the actions are in pages/BuyersPage.ts.
 */
export class BuyersUIStore {
  readonly BODY: Locator;
  readonly PAGE_HEADING: Locator;
  readonly SEARCH_BUY_LEADS: Locator;
  readonly FOR_BUYER: Locator;
  readonly INDUSTRY_HEADING: Locator;
  readonly LATEST_HEADING: Locator;
  readonly LEAD_CARDS: Locator;
  readonly MASKED_MOBILE_NUMBERS: Locator;
  readonly VERIFIED_INDICATOR_CSS: string;
  readonly TEXT_ON_PAGE: (value: string) => Locator;
  readonly LINK_BY_NAME: (value: string) => Locator;
  readonly POPULAR_PRODUCT_WITH_COUNT: (value: string) => Locator;
  readonly POPULAR_PRODUCT_LINK: (value: string) => Locator;

  /**
   * Author: Subham Maharana
   * Method Name: constructor
   * Description: Creates all locators of this page.
   * Parameters: page {Page} - Playwright page
   * Return Type: BuyersUIStore
   */
  constructor(private page: Page) {
    // ---------- PAGE LOCATORS ----------
    this.BODY = page.locator('body');
    this.PAGE_HEADING = page.getByRole('heading', { name: 'Buy Leads & Trade Leads from Verified Buyers', exact: true }).first();
    this.SEARCH_BUY_LEADS = page.getByText('Search Buy Leads', { exact: true }).first();
    this.FOR_BUYER = page.getByText('For Buyer', { exact: true }).first();
    this.TEXT_ON_PAGE = (text: string) => page.getByText(text, { exact: true }).first();
    this.LINK_BY_NAME = (name: string) => page.getByRole('link', { name, exact: true }).first();

    // ---------- INDUSTRY AND POPULAR PRODUCT LOCATORS ----------
    this.INDUSTRY_HEADING = page.getByRole('heading', { name: 'Explore Buy Leads by Industry', exact: true }).first();
    this.POPULAR_PRODUCT_WITH_COUNT = (product: string) => page.getByRole('link', { name: new RegExp(`^${escapeRegex(product)}\\s*\\(`) }).first();
    this.POPULAR_PRODUCT_LINK = (product: string) => page.getByRole('link', { name: new RegExp(escapeRegex(product)) }).first();

    // ---------- LATEST LEAD LOCATORS ----------
    this.LATEST_HEADING = page.getByRole('heading', { name: /Latest Buy Leads from Verified & Genuine Buyers/i });
    this.LEAD_CARDS = page.locator('div:has(> h3)').filter({ hasText: /Looking for/i });
    this.MASKED_MOBILE_NUMBERS = page.getByText(/\+\d{1,3}-\d{2}\*{6}\d{2}/);
    this.VERIFIED_INDICATOR_CSS = 'img[alt*="verif" i], img[src*="verif" i], [class*="verif" i], [title*="verif" i]';
  }
}
