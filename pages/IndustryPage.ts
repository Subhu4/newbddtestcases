import { Page } from '@playwright/test';
import { expect } from '../utils/hooks';
import { IndustryUIStore } from '../ui-store/IndustryUIStore';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';
import { Screenshot } from '../utils/screenshot';
import { BuyersPage } from './BuyersPage';

/**
 * Author: Subham Maharana
 * Class Name: IndustryPage
 * Description: Actions (methods) for an industry page (e.g. Agricultural Products & Equipment, Textiles, Yarn & Fabrics).
 */
export class IndustryPage {
  readonly page: Page;
  readonly industryUI: IndustryUIStore;

  /**
   * Author: Subham Maharana
   * Method Name: constructor
   * Description: Stores the page and creates its UI store (locators).
   * Parameters: page {Page} - Playwright page
   * Return Type: IndustryPage
   */
  constructor(page: Page) {
    this.page = page;
    this.industryUI = new IndustryUIStore(page);
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyPage
   * Description: Checks the industry page URL and heading.
   * Parameters: urlPart {string} - part of the URL, heading {string} - page heading
   * Return Type: Promise<void>
   */
  async verifyPage(urlPart: string, heading: string): Promise<void> {
    try {
      logger.info(`Verifying industry page: ${urlPart} / ${heading}`);
      runReport.record('Verify Industry Page', 'INFO', `${urlPart} / ${heading}`);
      await expect.poll(() => this.page.url()).toContain(urlPart);
      await expect(this.industryUI.PAGE_HEADING(heading)).toBeVisible();
    } catch (error) {
      logger.error(`Verify Industry Page failed: ${(error as Error).message}`);
      runReport.record('Verify Industry Page', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyPage');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyCategories
   * Description: Checks each category heading is shown with a lead count, e.g. "Seeds & Plant Saplings (12)".
   * Parameters: categories {string[]} - category names
   * Return Type: Promise<void>
   */
  async verifyCategories(categories: string[]): Promise<void> {
    try {
      logger.info(`Verifying ${categories.length} categories with counts`);
      runReport.record('Verify Categories', 'INFO', `${categories.join(', ')}`);
      for (const category of categories) {
        const heading = this.industryUI.CATEGORY_HEADING(category);
        await expect(heading).toBeVisible();
        await expect(heading).toContainText(/\(\d+\)/);
      }
    } catch (error) {
      logger.error(`Verify Categories failed: ${(error as Error).message}`);
      runReport.record('Verify Categories', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyCategories');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyCategoryCount
   * Description: Checks at least the given number of category headings show a lead count.
   * Parameters: minimumCount {number} - minimum headings with counts
   * Return Type: Promise<void>
   */
  async verifyCategoryCount(minimumCount: number): Promise<void> {
    try {
      logger.info(`Verifying at least ${minimumCount} category headings with counts`);
      runReport.record('Verify Category Count', 'INFO', `${minimumCount}`);
      const countedHeadings = await this.industryUI.CATEGORY_HEADINGS.filter({ hasText: /\(\d+\)/ }).count();
      expect(countedHeadings).toBeGreaterThanOrEqual(minimumCount);
    } catch (error) {
      logger.error(`Verify Category Count failed: ${(error as Error).message}`);
      runReport.record('Verify Category Count', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyCategoryCount');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyUrlContains
   * Description: Checks the page URL contains the given text.
   * Parameters: urlPart {string} - part of the URL
   * Return Type: Promise<void>
   */
  async verifyUrlContains(urlPart: string): Promise<void> {
    try {
      logger.info(`Verifying industry page URL contains: ${urlPart}`);
      runReport.record('Verify Industry URL', 'INFO', `${urlPart}`);
      await expect.poll(() => this.page.url()).toContain(urlPart);
    } catch (error) {
      logger.error(`Verify Industry URL failed: ${(error as Error).message}`);
      runReport.record('Verify Industry URL', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyUrlContains');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: returnUsingBreadcrumb
   * Description: Clicks the Buyers breadcrumb (or opens the Buyers page directly when the breadcrumb is not shown).
   *              The URL changes, so it returns the Buyers page object.
   * Parameters: buyersUrl {string} - Buyers page URL used when there is no breadcrumb
   * Return Type: Promise<BuyersPage>
   */
  async returnUsingBreadcrumb(buyersUrl: string): Promise<BuyersPage> {
    try {
      logger.info('Returning to the Buyers page using the breadcrumb');
      runReport.record('Return Using Breadcrumb', 'INFO', 'Returning to the Buyers page using the breadcrumb');
      const breadcrumbVisible =
        (await this.industryUI.BREADCRUMB_BUYERS.count()) > 0 && (await this.industryUI.BREADCRUMB_BUYERS.isVisible().catch(() => false));
      if (breadcrumbVisible) {
        await this.industryUI.BREADCRUMB_BUYERS.click();
      } else {
        logger.info('Buyers breadcrumb is not shown; opening the Buyers page directly.');
        await this.page.goto(buyersUrl, { waitUntil: 'domcontentloaded' });
      }
      await this.page.waitForLoadState('domcontentloaded');
      return new BuyersPage(this.page);
    } catch (error) {
      logger.error(`Return Using Breadcrumb failed: ${(error as Error).message}`);
      runReport.record('Return Using Breadcrumb', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'returnUsingBreadcrumb');
      throw error;
    }
  }
}
