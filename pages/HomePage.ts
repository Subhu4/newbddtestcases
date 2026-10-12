import { Page } from '@playwright/test';
import { expect } from '../utils/hooks';
import { HomeUIStore } from '../ui-store/HomeUIStore';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';
import { Screenshot } from '../utils/screenshot';
import { RequirementPage } from './RequirementPage';

/**
 * Author: Subham Maharana
 * Class Name: HomePage
 * Description: Actions (methods) for the ExportersIndia homepage (For Buyer menu).
 */
export class HomePage {
  readonly page: Page;
  readonly homeUI: HomeUIStore;

  /**
   * Author: Subham Maharana
   * Method Name: constructor
   * Description: Stores the page and creates its UI store (locators).
   * Parameters: page {Page} - Playwright page
   * Return Type: HomePage
   */
  constructor(page: Page) {
    this.page = page;
    this.homeUI = new HomeUIStore(page);
  }

  /**
   * Author: Subham Maharana
   * Method Name: openHomePage
   * Description: Opens the ExportersIndia homepage and checks the search box is visible.
   * Parameters: url {string} - homepage URL
   * Return Type: Promise<void>
   */
  async openHomePage(url: string): Promise<void> {
    try {
      logger.info(`Opening homepage: ${url}`);
      runReport.record('Open Homepage', 'INFO', `${url}`);
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      await expect(this.homeUI.SEARCH_INPUT).toBeVisible();
    } catch (error) {
      logger.error(`Open Homepage failed: ${(error as Error).message}`);
      runReport.record('Open Homepage', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'openHomePage');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: openPostBuyRequirement
   * Description: Hovers over For Buyer and clicks Post Buy Requirement. The URL changes,
   *              so it returns the requirement page object.
   * Parameters: none
   * Return Type: Promise<RequirementPage>
   */
  async openPostBuyRequirement(): Promise<RequirementPage> {
    try {
      logger.info('Opening Post Buy Requirement from For Buyer');
      runReport.record('Open Post Buy Requirement', 'INFO', 'Opening Post Buy Requirement from For Buyer');
      await expect(this.homeUI.FOR_BUYER).toBeVisible();
      await this.homeUI.FOR_BUYER.hover();
      if ((await this.homeUI.POST_BUY_REQUIREMENT_LINK.count()) > 0) {
        await this.homeUI.POST_BUY_REQUIREMENT_LINK.click();
      } else {
        await this.homeUI.POST_BUY_REQUIREMENT_TEXT.click();
      }
      await this.page.waitForLoadState('domcontentloaded');
      await expect(this.page).toHaveURL(/post-buy-requirement\.php/i);
      return new RequirementPage(this.page);
    } catch (error) {
      logger.error(`Open Post Buy Requirement failed: ${(error as Error).message}`);
      runReport.record('Open Post Buy Requirement', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'openPostBuyRequirement');
      throw error;
    }
  }
}
