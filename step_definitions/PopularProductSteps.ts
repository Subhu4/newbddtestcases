import { When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../utils/hooks';
/**
 * Author: Subham Maharana
 * File Name: PopularProductSteps.ts
 * Description: Step definitions for the popular products section and the A4 Size Paper buy leads page.
 * Used in: BuyLeadsPageContent.feature
 */

// "A4 Size Paper, Anti Iron Gel, Old Coins" -> ["A4 Size Paper", "Anti Iron Gel", "Old Coins"]
Then('the popular products section {string} should list {string}', async (section: string, products: string) => {
  await pageFixture.buyersPage.verifyPopularProducts(section, products.split(',').map((product) => product.trim()));
});

When('the user opens the popular product {string}', async (product: string) => {
  pageFixture.a4Page = await pageFixture.buyersPage.openPopularProduct(product); // URL changes -> new page object
});

Then('the A4 Size Paper page URL should contain {string}', async (urlPart: string) => {
  await pageFixture.a4Page.verifyUrlContains(urlPart);
});

Then('the A4 Size Paper page should show the heading {string} with Home and Buyers breadcrumbs', async (heading: string) => {
  await pageFixture.a4Page.verifyHeadingAndBreadcrumb(heading);
});

Then('the A4 Size Paper leads should show Contact Buyer and Show More Result', async () => {
  await pageFixture.a4Page.verifyLeadContent();
});
