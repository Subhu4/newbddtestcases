import { When, Then } from '@cucumber/cucumber';
import { pageFixture } from '../utils/hooks';
/**
 * Author: Subham Maharana
 * File Name: RegistrationSteps.ts
 * Description: Step definitions for the "Connect With Genuine Buyers" button and the seller registration page.
 * Used in: LatestLeadsAndRegistration.feature
 */

When('the user clicks {string} on the Buyers page', async (linkText: string) => {
  pageFixture.registrationPage = await pageFixture.buyersPage.openRegistration(linkText); // URL changes -> new page object
});

Then('the seller registration page should be displayed at {string}', async (urlPart: string) => {
  await pageFixture.registrationPage.verifyPage(urlPart);
});

Then('the registration form should show both headings, Create Account and at least {int} inputs', async (minimumInputs: number) => {
  await pageFixture.registrationPage.verifyFields(minimumInputs);
});
