import { Given, When } from '@cucumber/cucumber';
import { pageFixture } from '../utils/hooks';
import { HomePage } from '../pages/HomePage';
import { env } from '../utils/env';
/**
 * Author: Subham Maharana
 * File Name: HomeSteps.ts
 * Description: Step definitions for the ExportersIndia homepage (For Buyer menu).
 *              Each step only passes the value from the Examples table to a page method.
 * Used in: PostBuyRequirement.feature
 */

Given('the user opens the ExportersIndia home page', async () => {
  pageFixture.homePage = new HomePage(pageFixture.page);
  await pageFixture.homePage.openHomePage(env.baseUrl);
});

When('the user opens Post Buy Requirement from For Buyer', async () => {
  pageFixture.requirementPage = await pageFixture.homePage.openPostBuyRequirement(); // URL changes -> new page object
});
