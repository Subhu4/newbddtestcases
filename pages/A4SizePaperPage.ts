import { Page } from '@playwright/test';
import { expect } from '../utils/hooks';
import { A4SizePaperUIStore } from '../ui-store/A4SizePaperUIStore';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';
import { Screenshot } from '../utils/screenshot';

/**
 * Author: Subham Maharana
 * Class Name: A4SizePaperPage
 * Description: Actions (methods) for the A4 Size Paper buy leads page.
 */
export class A4SizePaperPage {
  readonly page: Page;
  readonly a4UI: A4SizePaperUIStore;

  /**
   * Author: Subham Maharana
   * Method Name: constructor
   * Description: Stores the page and creates its UI store (locators).
   * Parameters: page {Page} - Playwright page
   * Return Type: A4SizePaperPage
   */
  constructor(page: Page) {
    this.page = page;
    this.a4UI = new A4SizePaperUIStore(page);
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
      logger.info(`Verifying A4 Size Paper page URL contains: ${urlPart}`);
      runReport.record('Verify A4 Page URL', 'INFO', `${urlPart}`);
      await expect.poll(() => this.page.url()).toContain(urlPart);
    } catch (error) {
      logger.error(`Verify A4 Page URL failed: ${(error as Error).message}`);
      runReport.record('Verify A4 Page URL', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyUrlContains');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyHeadingAndBreadcrumb
   * Description: Checks the page heading and the Home and Buyers breadcrumbs.
   * Parameters: heading {string} - expected heading
   * Return Type: Promise<void>
   */
  async verifyHeadingAndBreadcrumb(heading: string): Promise<void> {
    try {
      logger.info(`Verifying heading and breadcrumbs: ${heading}`);
      runReport.record('Verify Heading And Breadcrumb', 'INFO', `${heading}`);
      await expect(this.a4UI.PAGE_HEADING(heading)).toBeVisible();
      await expect(this.a4UI.BREADCRUMB_HOME).toBeVisible();
      await expect(this.a4UI.BREADCRUMB_BUYERS).toBeVisible();
    } catch (error) {
      logger.error(`Verify Heading And Breadcrumb failed: ${(error as Error).message}`);
      runReport.record('Verify Heading And Breadcrumb', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyHeadingAndBreadcrumb');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyLeadContent
   * Description: Checks Contact Buyer and Show More Result are shown on the leads list.
   * Parameters: none
   * Return Type: Promise<void>
   */
  async verifyLeadContent(): Promise<void> {
    try {
      logger.info('Verifying Contact Buyer and Show More Result');
      runReport.record('Verify Lead Content', 'INFO', 'Verifying Contact Buyer and Show More Result');
      await expect(this.a4UI.CONTACT_BUYER).toBeVisible();
      await this.a4UI.SHOW_MORE_RESULT.scrollIntoViewIfNeeded();
      await expect(this.a4UI.SHOW_MORE_RESULT).toBeVisible();
    } catch (error) {
      logger.error(`Verify Lead Content failed: ${(error as Error).message}`);
      runReport.record('Verify Lead Content', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyLeadContent');
      throw error;
    }
  }
}
