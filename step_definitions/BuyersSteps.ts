import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../utils/hooks';
import { BuyersPage } from '../pages/BuyersPage';
import { env } from '../utils/env';
/**
 * Author: Subham Maharana
 * File Name: BuyersSteps.ts
 * Description: Step definitions for the Buyers (Buy Leads) page: header, introduction, For Buyer menu and industry directory.
 * Used in: BuyLeadsPageContent.feature, LatestLeadsAndRegistration.feature
 */

Given('the user opens the ExportersIndia Buyers page', async () => {
  pageFixture.buyersPage = new BuyersPage(pageFixture.page);
  await pageFixture.buyersPage.openBuyersPage(env.buyersUrl);
});

Then('the Buyers page should be displayed', async () => {
  await pageFixture.buyersPage.verifyBuyersLanding();
});

// "Call us : 9700-318-318, 9700-318-318" -> any one of these texts is accepted
Then('the header should display one of the support texts {string}', async (supportTexts: string) => {
  pageFixture.supportTexts = supportTexts.split(',').map((text) => text.trim());
  await pageFixture.buyersPage.verifyHeaderSupportText(pageFixture.supportTexts);
});

When('the user scrolls to the bottom of the page and back to the top', async () => {
  await pageFixture.buyersPage.scrollToBottomAndTop();
});

When('the user reloads the Buyers page', async () => {
  await pageFixture.buyersPage.reloadPage();
});

Then('the header should still display the support text', async () => {
  await pageFixture.buyersPage.verifyHeaderSupportText(pageFixture.supportTexts);
});

Then('the Buyers page should show the introduction {string}', async (introText: string) => {
  await pageFixture.buyersPage.verifyIntro(introText);
});

When('the user hovers over For Buyer on the Buyers page', async () => {
  await pageFixture.buyersPage.hoverForBuyerMenu();
});

// "Post Buy Requirement, Browse Suppliers" -> ["Post Buy Requirement", "Browse Suppliers"]
Then('the For Buyer menu should list {string}', async (menuOptions: string) => {
  await pageFixture.buyersPage.verifyBuyerMenu(menuOptions.split(',').map((option) => option.trim()));
});

Then('the industry section should show {string}', async (subText: string) => {
  await pageFixture.buyersPage.verifyIndustrySection(subText);
});

Then('the industry link {string} should be visible', async (industry: string) => {
  await pageFixture.buyersPage.verifyIndustryLink(industry);
});

// the industry names contain commas, so the list comes from the Examples table separated by semicolons
Then('the industry directory should list all the industries {string}', async (industries: string) => {
  await pageFixture.buyersPage.verifyIndustries(industries.split(';').map((industry) => industry.trim()));
});
