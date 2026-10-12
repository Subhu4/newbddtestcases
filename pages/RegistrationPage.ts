import { Page } from '@playwright/test';
import { expect } from '../utils/hooks';
import { RegistrationUIStore } from '../ui-store/RegistrationUIStore';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';
import { Screenshot } from '../utils/screenshot';

/**
 * Author: Subham Maharana
 * Class Name: RegistrationPage
 * Description: Actions (methods) for the seller registration page (Register your Company FREE).
 */
export class RegistrationPage {
  readonly page: Page;
  readonly registrationUI: RegistrationUIStore;

  /**
   * Author: Subham Maharana
   * Method Name: constructor
   * Description: Stores the page and creates its UI store (locators).
   * Parameters: page {Page} - Playwright page
   * Return Type: RegistrationPage
   */
  constructor(page: Page) {
    this.page = page;
    this.registrationUI = new RegistrationUIStore(page);
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyPage
   * Description: Checks the registration page URL and both headings.
   * Parameters: urlPart {string} - part of the URL
   * Return Type: Promise<void>
   */
  async verifyPage(urlPart: string): Promise<void> {
    try {
      logger.info(`Verifying registration page: ${urlPart}`);
      runReport.record('Verify Registration Page', 'INFO', `${urlPart}`);
      await this.page.waitForLoadState('domcontentloaded');
      await expect.poll(() => this.page.url()).toContain(urlPart);
      await expect(this.registrationUI.PAGE_HEADING).toBeVisible();
      await expect(this.registrationUI.SUB_HEADING).toBeVisible();
    } catch (error) {
      logger.error(`Verify Registration Page failed: ${(error as Error).message}`);
      runReport.record('Verify Registration Page', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyPage');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyFields
   * Description: Checks both headings, Create Account and at least the given number of inputs.
   * Parameters: minimumInputs {number} - minimum visible inputs
   * Return Type: Promise<void>
   */
  async verifyFields(minimumInputs: number): Promise<void> {
    try {
      logger.info(`Verifying registration form with at least ${minimumInputs} inputs`);
      runReport.record('Verify Registration Fields', 'INFO', `${minimumInputs}`);
      await expect(this.registrationUI.PAGE_HEADING).toBeVisible();
      await expect(this.registrationUI.SUB_HEADING).toBeVisible();
      await expect(this.registrationUI.CREATE_ACCOUNT).toBeVisible();
      expect(await this.registrationUI.VISIBLE_INPUTS.count()).toBeGreaterThanOrEqual(minimumInputs);
    } catch (error) {
      logger.error(`Verify Registration Fields failed: ${(error as Error).message}`);
      runReport.record('Verify Registration Fields', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyFields');
      throw error;
    }
  }
}
