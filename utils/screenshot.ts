import * as fs from 'fs';
import * as path from 'path';
import { Page } from '@playwright/test';

/**
 * Author: Subham Maharana
 * Class Name: Screenshot
 * Description: Takes full-page screenshots and saves them in the screenshots folder.
 */
export class Screenshot {
  /**
   * Author: Subham Maharana
   * Method Name: capture
   * Description: Saves a full-page screenshot named with the step/test name and the current time.
   * Parameters: page {Page} - Playwright page, fileName {string} - name of the step or test
   * Return Type: Promise<string> - path of the saved screenshot ('' if it could not be taken)
   */
  static async capture(page: Page, fileName: string): Promise<string> {
    try {
      if (page.isClosed()) return ''; // page already closed (e.g. test timeout) - nothing to capture
      const screenshotDir = path.join(__dirname, '..', 'screenshots');
      if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
      const safeName = fileName.replace(/[^a-zA-Z0-9_-]/g, '_');
      const filePath = path.join(screenshotDir, `${safeName}_${Date.now()}.png`);
      await page.screenshot({ path: filePath, fullPage: true });
      return filePath;
    } catch (error) {
      // Do not throw here: a failed screenshot must not hide the real test error
      console.error(`Screenshot failed: ${(error as Error).message}`);
      return '';
    }
  }
}
