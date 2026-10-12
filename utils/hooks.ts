import * as fs from 'fs';
import {
  BeforeAll, AfterAll, Before, After, AfterStep, Status, setDefaultTimeout, ITestCaseHookParameter, ITestStepHookParameter,
} from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page, expect as baseExpect } from '@playwright/test';
import type { HomePage } from '../pages/HomePage';
import type { RequirementPage } from '../pages/RequirementPage';
import type { BuyersPage } from '../pages/BuyersPage';
import type { IndustryPage } from '../pages/IndustryPage';
import type { A4SizePaperPage } from '../pages/A4SizePaperPage';
import type { RegistrationPage } from '../pages/RegistrationPage';
import { env } from './env';
import { logger } from './logger';
import { runReport } from './runReport';
import { Screenshot } from './screenshot';

/**
 * Author: Subham Maharana
 * File Name: hooks.ts
 * Description: Cucumber hooks - code that runs automatically around the scenarios.
 *   BeforeAll  -> opens Chrome once for the whole run
 *   Before     -> new browser context + page for EACH scenario and an empty pageFixture
 *   AfterStep  -> writes every Gherkin step and its result to the log
 *   After      -> PASS/FAIL in log + run report, screenshot on failure (attached to the reports)
 *   AfterAll   -> closes Chrome
 *   Every hook has its own try-catch, so a hook problem is logged clearly.
 *
 * This file also holds:
 *   openNewBrowserSession -> gives a scenario a fresh browser context + page when a later part must start like a first visit
 *   pageFixture -> the shared object that carries the page and page objects from one step to the next
 *   expect      -> Playwright's expect with a 10-second wait (Cucumber does not read playwright.config.ts)
 */

setDefaultTimeout(60 * 1000); // max time for one step

/** Playwright's built-in assertions, each retrying for up to 10 seconds (used by all pages). */
export const expect = baseExpect.configure({ timeout: 10 * 1000 });

/** Shared object for the running scenario. Steps save page objects here and the next step reads them. */
export const pageFixture = {
  page: undefined as unknown as Page,                       // current browser tab
  homePage: undefined as unknown as HomePage,
  requirementPage: undefined as unknown as RequirementPage,
  buyersPage: undefined as unknown as BuyersPage,
  industryPage: undefined as unknown as IndustryPage,
  a4Page: undefined as unknown as A4SizePaperPage,
  registrationPage: undefined as unknown as RegistrationPage,
  supportTexts: [] as string[],                             // accepted header support texts used by "header should still display"
};

let browser: Browser;
let context: BrowserContext;

/**
 * Author: Subham Maharana
 * Method Name: openNewBrowserSession
 * Description: Closes the current browser context and opens a brand-new context + page (same Chrome window),
 *              so the next part of a scenario starts like a first visit (no cookies, storage or form state).
 * Parameters: none
 * Return Type: Promise<Page>
 */
export async function openNewBrowserSession(): Promise<Page> {
  try {
    await context?.close();
    context = await browser.newContext({ viewport: { width: 1366, height: 768 } });
    const page = await context.newPage();
    page.setDefaultTimeout(15 * 1000);
    page.setDefaultNavigationTimeout(30 * 1000);
    pageFixture.page = page;
    logger.info('New browser session opened');
    return page;
  } catch (error) {
    logger.error(`Open new browser session failed: ${(error as Error).message}`);
    throw error;
  }
}

BeforeAll(async function () {
  try {
    logger.info('========== TEST RUN STARTED ==========');
    browser = await chromium.launch({
      headless: env.headless, // from .env - Chrome window is visible unless HEADLESS=true
    });
  } catch (error) {
    logger.error(`BeforeAll failed - could not open Chrome: ${(error as Error).message}`);
    throw error;
  }
});

Before(async function (scenario: ITestCaseHookParameter) {
  const scenarioName = scenario.pickle.name;
  try {
    logger.info(`========== START: ${scenarioName} ==========`);
    runReport.setCurrentTest(scenarioName);
    runReport.record('Test Start', 'INFO', scenarioName);

    context = await browser.newContext({ viewport: { width: 1366, height: 768 } });
    const page = await context.newPage();
    page.setDefaultTimeout(15 * 1000);            // max wait for each click / fill
    page.setDefaultNavigationTimeout(30 * 1000);  // max wait for a page load

    // fresh, empty fixture for this scenario, so scenarios never share page objects
    pageFixture.page = page;
    pageFixture.homePage = undefined as unknown as HomePage;
    pageFixture.requirementPage = undefined as unknown as RequirementPage;
    pageFixture.buyersPage = undefined as unknown as BuyersPage;
    pageFixture.industryPage = undefined as unknown as IndustryPage;
    pageFixture.a4Page = undefined as unknown as A4SizePaperPage;
    pageFixture.registrationPage = undefined as unknown as RegistrationPage;
    pageFixture.supportTexts = [];
  } catch (error) {
    logger.error(`Before hook failed for ${scenarioName}: ${(error as Error).message}`);
    runReport.record('Test Start', 'FAIL', (error as Error).message);
    throw error;
  }
});

AfterStep(async function (step: ITestStepHookParameter) {
  try {
    logger.info(`STEP ${step.result.status}: ${step.pickleStep.text}`);
  } catch (error) {
    logger.error(`AfterStep hook failed: ${(error as Error).message}`); // never fail a test because of logging
  }
});

After(async function (scenario: ITestCaseHookParameter) {
  const scenarioName = scenario.pickle.name;
  try {
    if (scenario.result?.status === Status.FAILED) {
      const shotPath = await Screenshot.capture(pageFixture.page, scenarioName);
      if (shotPath) {
        this.attach(fs.readFileSync(shotPath), 'image/png'); // shows in Cucumber HTML and Allure reports
      }
      const reason = scenario.result.message ?? 'Scenario failed';
      logger.error(`FAILED: ${scenarioName} - ${reason}`);
      runReport.record('Test End', 'FAIL', reason);
    } else {
      logger.info(`PASSED: ${scenarioName}`);
      runReport.record('Test End', 'PASS', `Status: ${scenario.result?.status}`);
    }
    logger.info(`========== END: ${scenarioName} ==========`);
  } catch (error) {
    logger.error(`After hook failed for ${scenarioName}: ${(error as Error).message}`);
  } finally {
    await context?.close(); // ALWAYS close this scenario's tabs, even if something above failed
  }
});

AfterAll(async function () {
  try {
    await browser?.close();
    logger.info('========== TEST RUN FINISHED ==========');
  } catch (error) {
    logger.error(`AfterAll failed - could not close Chrome: ${(error as Error).message}`);
  }
});
