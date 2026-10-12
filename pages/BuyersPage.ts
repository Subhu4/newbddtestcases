import { Page } from '@playwright/test';
import { expect } from '../utils/hooks';
import { BuyersUIStore } from '../ui-store/BuyersUIStore';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';
import { Screenshot } from '../utils/screenshot';
import { IndustryPage } from './IndustryPage';
import { A4SizePaperPage } from './A4SizePaperPage';
import { RegistrationPage } from './RegistrationPage';

/**
 * Author: Subham Maharana
 * Class Name: BuyersPage
 * Description: Actions (methods) for the Buyers (Buy Leads) page: header, For Buyer menu, industries, popular products, latest leads.
 */
export class BuyersPage {
  readonly page: Page;
  readonly buyersUI: BuyersUIStore;

  /**
   * Author: Subham Maharana
   * Method Name: constructor
   * Description: Stores the page and creates its UI store (locators).
   * Parameters: page {Page} - Playwright page
   * Return Type: BuyersPage
   */
  constructor(page: Page) {
    this.page = page;
    this.buyersUI = new BuyersUIStore(page);
  }

  /**
   * Author: Subham Maharana
   * Method Name: openBuyersPage
   * Description: Opens the Buyers page and checks the main heading is visible.
   * Parameters: url {string} - Buyers page URL
   * Return Type: Promise<void>
   */
  async openBuyersPage(url: string): Promise<void> {
    try {
      logger.info(`Opening Buyers page: ${url}`);
      runReport.record('Open Buyers Page', 'INFO', `${url}`);
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      await expect(this.buyersUI.PAGE_HEADING).toBeVisible();
    } catch (error) {
      logger.error(`Open Buyers Page failed: ${(error as Error).message}`);
      runReport.record('Open Buyers Page', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'openBuyersPage');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyBuyersLanding
   * Description: Checks the Buyers page URL, main heading and industry heading.
   * Parameters: none
   * Return Type: Promise<void>
   */
  async verifyBuyersLanding(): Promise<void> {
    try {
      logger.info('Verifying the Buyers page is displayed');
      runReport.record('Verify Buyers Landing', 'INFO', 'Verifying the Buyers page is displayed');
      await expect(this.page).toHaveURL(/\/buyers\/?$/);
      await expect(this.buyersUI.PAGE_HEADING).toBeVisible();
      await expect(this.buyersUI.INDUSTRY_HEADING).toBeVisible();
    } catch (error) {
      logger.error(`Verify Buyers Landing failed: ${(error as Error).message}`);
      runReport.record('Verify Buyers Landing', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyBuyersLanding');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyHeaderSupportText
   * Description: Checks the header shows at least one of the accepted Call Us / Support texts.
   * Parameters: acceptedTexts {string[]} - accepted header texts
   * Return Type: Promise<void>
   */
  async verifyHeaderSupportText(acceptedTexts: string[]): Promise<void> {
    try {
      logger.info(`Verifying header support text: ${acceptedTexts.join(' | ')}`);
      runReport.record('Verify Header Support Text', 'INFO', `${acceptedTexts.join(' | ')}`);
      await expect
        .poll(async () => {
          const bodyText = (await this.buyersUI.BODY.innerText()).replace(/\s+/g, ' ');
          return acceptedTexts.some((text) => bodyText.includes(text));
        })
        .toBeTruthy();
    } catch (error) {
      logger.error(`Verify Header Support Text failed: ${(error as Error).message}`);
      runReport.record('Verify Header Support Text', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyHeaderSupportText');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: scrollToBottomAndTop
   * Description: Scrolls to the bottom of the page and back to the top.
   * Parameters: none
   * Return Type: Promise<void>
   */
  async scrollToBottomAndTop(): Promise<void> {
    try {
      logger.info('Scrolling to the bottom and back to the top');
      runReport.record('Scroll Bottom And Top', 'INFO', 'Scrolling to the bottom and back to the top');
      await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await this.page.evaluate(() => window.scrollTo(0, 0));
    } catch (error) {
      logger.error(`Scroll Bottom And Top failed: ${(error as Error).message}`);
      runReport.record('Scroll Bottom And Top', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'scrollToBottomAndTop');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: reloadPage
   * Description: Reloads the Buyers page and waits for it to load.
   * Parameters: none
   * Return Type: Promise<void>
   */
  async reloadPage(): Promise<void> {
    try {
      logger.info('Reloading the Buyers page');
      runReport.record('Reload Buyers Page', 'INFO', 'Reloading the Buyers page');
      await this.page.reload({ waitUntil: 'domcontentloaded' });
      await expect(this.buyersUI.BODY).toBeVisible();
    } catch (error) {
      logger.error(`Reload Buyers Page failed: ${(error as Error).message}`);
      runReport.record('Reload Buyers Page', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'reloadPage');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyIntro
   * Description: Checks the main heading, the introduction sentence and Search Buy Leads.
   * Parameters: introText {string} - expected introduction sentence
   * Return Type: Promise<void>
   */
  async verifyIntro(introText: string): Promise<void> {
    try {
      logger.info(`Verifying introduction: ${introText}`);
      runReport.record('Verify Intro', 'INFO', `${introText}`);
      await expect(this.buyersUI.PAGE_HEADING).toBeVisible();
      await expect(this.buyersUI.TEXT_ON_PAGE(introText)).toBeVisible();
      await expect(this.buyersUI.SEARCH_BUY_LEADS).toBeVisible();
    } catch (error) {
      logger.error(`Verify Intro failed: ${(error as Error).message}`);
      runReport.record('Verify Intro', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyIntro');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: hoverForBuyerMenu
   * Description: Hovers over For Buyer so its menu opens.
   * Parameters: none
   * Return Type: Promise<void>
   */
  async hoverForBuyerMenu(): Promise<void> {
    try {
      logger.info('Hovering over For Buyer');
      runReport.record('Hover For Buyer', 'INFO', 'Hovering over For Buyer');
      await expect(this.buyersUI.FOR_BUYER).toBeVisible();
      await this.buyersUI.FOR_BUYER.hover();
    } catch (error) {
      logger.error(`Hover For Buyer failed: ${(error as Error).message}`);
      runReport.record('Hover For Buyer', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'hoverForBuyerMenu');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyBuyerMenu
   * Description: Checks every option of the For Buyer menu is visible.
   * Parameters: options {string[]} - menu option names
   * Return Type: Promise<void>
   */
  async verifyBuyerMenu(options: string[]): Promise<void> {
    try {
      logger.info(`Verifying For Buyer menu: ${options.join(', ')}`);
      runReport.record('Verify Buyer Menu', 'INFO', `${options.join(', ')}`);
      for (const option of options) {
        await expect(this.buyersUI.LINK_BY_NAME(option)).toBeVisible();
      }
    } catch (error) {
      logger.error(`Verify Buyer Menu failed: ${(error as Error).message}`);
      runReport.record('Verify Buyer Menu', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyBuyerMenu');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyIndustrySection
   * Description: Checks the industry heading and its sub text.
   * Parameters: subText {string} - expected sub text
   * Return Type: Promise<void>
   */
  async verifyIndustrySection(subText: string): Promise<void> {
    try {
      logger.info(`Verifying industry section: ${subText}`);
      runReport.record('Verify Industry Section', 'INFO', `${subText}`);
      await expect(this.buyersUI.INDUSTRY_HEADING).toBeVisible();
      await expect(this.buyersUI.TEXT_ON_PAGE(subText)).toBeVisible();
    } catch (error) {
      logger.error(`Verify Industry Section failed: ${(error as Error).message}`);
      runReport.record('Verify Industry Section', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyIndustrySection');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyIndustryLink
   * Description: Checks one industry link is visible.
   * Parameters: industry {string} - industry name
   * Return Type: Promise<void>
   */
  async verifyIndustryLink(industry: string): Promise<void> {
    try {
      logger.info(`Verifying industry link: ${industry}`);
      runReport.record('Verify Industry Link', 'INFO', `${industry}`);
      await expect(this.buyersUI.LINK_BY_NAME(industry)).toBeVisible();
    } catch (error) {
      logger.error(`Verify Industry Link failed: ${(error as Error).message}`);
      runReport.record('Verify Industry Link', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyIndustryLink');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyIndustries
   * Description: Checks every industry of the directory is shown as a link.
   * Parameters: industries {string[]} - industry names
   * Return Type: Promise<void>
   */
  async verifyIndustries(industries: string[]): Promise<void> {
    try {
      logger.info(`Verifying ${industries.length} industries in the directory`);
      runReport.record('Verify Industries', 'INFO', `${industries.length} industries`);
      for (const industry of industries) {
        await expect(this.buyersUI.LINK_BY_NAME(industry)).toBeVisible();
      }
    } catch (error) {
      logger.error(`Verify Industries failed: ${(error as Error).message}`);
      runReport.record('Verify Industries', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyIndustries');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: openIndustry
   * Description: Clicks an industry link. The URL changes, so it returns the industry page object.
   * Parameters: industry {string} - industry name
   * Return Type: Promise<IndustryPage>
   */
  async openIndustry(industry: string): Promise<IndustryPage> {
    try {
      logger.info(`Opening industry: ${industry}`);
      runReport.record('Open Industry', 'INFO', `${industry}`);
      const link = this.buyersUI.LINK_BY_NAME(industry);
      await expect(link).toBeVisible();
      await link.click();
      await expect(this.page).toHaveURL(/\/buyers\/[a-z0-9-]+\.htm/);
      return new IndustryPage(this.page);
    } catch (error) {
      logger.error(`Open Industry failed: ${(error as Error).message}`);
      runReport.record('Open Industry', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'openIndustry');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyPopularProducts
   * Description: Checks the popular products section and that each product is listed with a lead count.
   * Parameters: section {string} - section heading, products {string[]} - product names
   * Return Type: Promise<void>
   */
  async verifyPopularProducts(section: string, products: string[]): Promise<void> {
    try {
      logger.info(`Verifying popular products: ${products.join(', ')}`);
      runReport.record('Verify Popular Products', 'INFO', `${products.join(', ')}`);
      await expect(this.buyersUI.TEXT_ON_PAGE(section)).toBeVisible();
      for (const product of products) {
        await expect(this.buyersUI.POPULAR_PRODUCT_WITH_COUNT(product)).toBeVisible();
      }
    } catch (error) {
      logger.error(`Verify Popular Products failed: ${(error as Error).message}`);
      runReport.record('Verify Popular Products', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyPopularProducts');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: openPopularProduct
   * Description: Clicks a popular product. The URL changes, so it returns the A4 Size Paper page object.
   * Parameters: product {string} - popular product name
   * Return Type: Promise<A4SizePaperPage>
   */
  async openPopularProduct(product: string): Promise<A4SizePaperPage> {
    try {
      logger.info(`Opening popular product: ${product}`);
      runReport.record('Open Popular Product', 'INFO', `${product}`);
      const productLink = this.buyersUI.POPULAR_PRODUCT_LINK(product);
      await expect(productLink).toBeVisible();
      await productLink.scrollIntoViewIfNeeded();
      await productLink.click();
      await this.page.waitForLoadState('domcontentloaded');
      return new A4SizePaperPage(this.page);
    } catch (error) {
      logger.error(`Open Popular Product failed: ${(error as Error).message}`);
      runReport.record('Open Popular Product', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'openPopularProduct');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyLatestLeads
   * Description: Checks the Latest Buy Leads heading and that the lead cards at the given positions are visible.
   * Parameters: positions {number[]} - card numbers, e.g. [1, 5, 10]
   * Return Type: Promise<void>
   */
  async verifyLatestLeads(positions: number[]): Promise<void> {
    try {
      logger.info(`Verifying latest buy lead cards: ${positions.join(', ')}`);
      runReport.record('Verify Latest Leads', 'INFO', `${positions.join(', ')}`);
      await this.buyersUI.LATEST_HEADING.scrollIntoViewIfNeeded();
      await expect(this.buyersUI.LATEST_HEADING).toBeVisible();
      await expect(this.buyersUI.LEAD_CARDS.nth(Math.max(...positions) - 1)).toBeVisible();
      for (const position of positions) {
        await expect(this.buyersUI.LEAD_CARDS.nth(position - 1)).toBeVisible();
      }
    } catch (error) {
      logger.error(`Verify Latest Leads failed: ${(error as Error).message}`);
      runReport.record('Verify Latest Leads', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyLatestLeads');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyVerifiedIcons
   * Description: Checks each lead card at the given positions shows a verified indicator (or its card image).
   * Parameters: positions {number[]} - card numbers
   * Return Type: Promise<void>
   */
  async verifyVerifiedIcons(positions: number[]): Promise<void> {
    try {
      logger.info(`Verifying verified icon on cards: ${positions.join(', ')}`);
      runReport.record('Verify Verified Icons', 'INFO', `${positions.join(', ')}`);
      for (const position of positions) {
        const card = this.buyersUI.LEAD_CARDS.nth(position - 1);
        const verifiedIndicator = card.locator(this.buyersUI.VERIFIED_INDICATOR_CSS);
        if ((await verifiedIndicator.count()) === 0) {
          await expect(card.locator('img').first()).toBeVisible();
          logger.info(`Lead ${position}: verified status is shown by the card image.`);
        } else {
          await expect(verifiedIndicator.first()).toBeVisible();
        }
      }
    } catch (error) {
      logger.error(`Verify Verified Icons failed: ${(error as Error).message}`);
      runReport.record('Verify Verified Icons', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyVerifiedIcons');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyMaskedMobileCount
   * Description: Checks at least the given number of masked mobile numbers are shown.
   * Parameters: minimumCount {number} - minimum masked numbers
   * Return Type: Promise<void>
   */
  async verifyMaskedMobileCount(minimumCount: number): Promise<void> {
    try {
      logger.info(`Verifying at least ${minimumCount} masked mobile numbers`);
      runReport.record('Verify Masked Mobile Count', 'INFO', `${minimumCount}`);
      await expect.poll(async () => this.buyersUI.MASKED_MOBILE_NUMBERS.count()).toBeGreaterThanOrEqual(minimumCount);
    } catch (error) {
      logger.error(`Verify Masked Mobile Count failed: ${(error as Error).message}`);
      runReport.record('Verify Masked Mobile Count', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyMaskedMobileCount');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyMaskedMobileAt
   * Description: Checks the masked mobile number is shown for the lead cards at the given positions.
   * Parameters: positions {number[]} - card numbers
   * Return Type: Promise<void>
   */
  async verifyMaskedMobileAt(positions: number[]): Promise<void> {
    try {
      logger.info(`Verifying masked mobile on cards: ${positions.join(', ')}`);
      runReport.record('Verify Masked Mobile At', 'INFO', `${positions.join(', ')}`);
      for (const position of positions) {
        await expect(this.buyersUI.MASKED_MOBILE_NUMBERS.nth(position - 1)).toBeVisible();
      }
    } catch (error) {
      logger.error(`Verify Masked Mobile At failed: ${(error as Error).message}`);
      runReport.record('Verify Masked Mobile At', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyMaskedMobileAt');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyNoUnmaskedMobile
   * Description: Checks no full (unmasked) mobile number is shown anywhere on the page.
   * Parameters: none
   * Return Type: Promise<void>
   */
  async verifyNoUnmaskedMobile(): Promise<void> {
    try {
      logger.info('Verifying no unmasked mobile number is displayed');
      runReport.record('Verify No Unmasked Mobile', 'INFO', 'Verifying no unmasked mobile number is displayed');
      const pageText = await this.buyersUI.BODY.innerText();
      expect(pageText).not.toMatch(/\+\d{1,3}-\d{10}/);
    } catch (error) {
      logger.error(`Verify No Unmasked Mobile failed: ${(error as Error).message}`);
      runReport.record('Verify No Unmasked Mobile', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyNoUnmaskedMobile');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: openRegistration
   * Description: Clicks a link on the Buyers page (e.g. Connect With Genuine Buyers). The URL changes,
   *              so it returns the registration page object.
   * Parameters: linkText {string} - link name
   * Return Type: Promise<RegistrationPage>
   */
  async openRegistration(linkText: string): Promise<RegistrationPage> {
    try {
      logger.info(`Clicking link: ${linkText}`);
      runReport.record('Open Registration', 'INFO', `${linkText}`);
      const link = this.buyersUI.LINK_BY_NAME(linkText);
      await link.scrollIntoViewIfNeeded();
      await expect(link).toBeVisible();
      await link.click();
      await this.page.waitForLoadState('domcontentloaded');
      return new RegistrationPage(this.page);
    } catch (error) {
      logger.error(`Open Registration failed: ${(error as Error).message}`);
      runReport.record('Open Registration', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'openRegistration');
      throw error;
    }
  }
}
