import { When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../utils/hooks';
import { env } from '../utils/env';
/**
 * Author: Subham Maharana
 * File Name: IndustrySteps.ts
 * Description: Step definitions for an industry page (Agricultural Products & Equipment, Textiles, Yarn & Fabrics) and the Buyers breadcrumb.
 * Used in: BuyLeadsPageContent.feature
 */

When('the user opens the industry {string}', async (industry: string) => {
  pageFixture.industryPage = await pageFixture.buyersPage.openIndustry(industry); // URL changes -> new page object
});

Then('the industry page should be displayed at {string} with the heading {string}', async (urlPart: string, heading: string) => {
  await pageFixture.industryPage.verifyPage(urlPart, heading);
});

// the category names contain commas, so the list comes from the Examples table separated by semicolons
Then('the industry page should list the agriculture categories {string} with counts', async (categories: string) => {
  await pageFixture.industryPage.verifyCategories(categories.split(';').map((category) => category.trim()));
});

Then('at least {int} category headings with counts should be displayed', async (minimumCount: number) => {
  await pageFixture.industryPage.verifyCategoryCount(minimumCount);
});

Then('the industry page URL should contain {string}', async (urlPart: string) => {
  await pageFixture.industryPage.verifyUrlContains(urlPart);
});

When('the user returns to the Buyers page using the breadcrumb', async () => {
  pageFixture.buyersPage = await pageFixture.industryPage.returnUsingBreadcrumb(env.buyersUrl); // URL changes -> Buyers page object
});
