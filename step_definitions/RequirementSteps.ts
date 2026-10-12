import { Given, When, Then } from '@cucumber/cucumber';
import { pageFixture, openNewBrowserSession } from '../utils/hooks';
import { RequirementPage } from '../pages/RequirementPage';
import { env } from '../utils/env';
/**
 * Author: Subham Maharana
 * File Name: RequirementSteps.ts
 * Description: Step definitions for the Post Buy Requirement form (fields, supplier preference, states, validation, OTP step).
 *              RULE: the OTP page is only checked for display - no OTP is ever entered.
 * Used in: PostBuyRequirement.feature
 */

Given('the user opens the Post Buy Requirement page in a new browser session', async () => {
  const page = await openNewBrowserSession(); // the site hides the mobile field after repeated submits in one session
  pageFixture.requirementPage = new RequirementPage(page);
  await pageFixture.requirementPage.openRequirementPage(env.postBuyRequirementUrl);
});

Then('the requirement form core fields should be visible', async () => {
  await pageFixture.requirementPage.verifyCoreFields();
});

When('the user enters {string} as the product name', async (productName: string) => {
  await pageFixture.requirementPage.enterProductName(productName); // "" = left blank on purpose
});

When('the user selects {string} as Interested in', async (interestedIn: string) => {
  await pageFixture.requirementPage.selectInterestedIn(interestedIn); // "" = left blank on purpose
});

When('the user enters {string} as the quantity', async (quantity: string) => {
  await pageFixture.requirementPage.enterQuantity(quantity);
});

When('the user selects {string} as the unit', async (unit: string) => {
  await pageFixture.requirementPage.selectUnit(unit);
});

When('the user selects {string} as the supplier preference', async (supplierPreference: string) => {
  await pageFixture.requirementPage.selectSupplierPreference(supplierPreference);
});

When('the user enters {string} as the mobile number', async (mobileNumber: string) => {
  await pageFixture.requirementPage.enterMobileNumber(mobileNumber);
});

Then('the mobile number field should contain {string}', async (expectedMobile: string) => {
  await pageFixture.requirementPage.verifyMobileNumberValue(expectedMobile);
});

When('the user clicks on Submit Requirement', async () => {
  await pageFixture.requirementPage.clickSubmit();
});

Then('the requirement OTP step should be displayed', async () => {
  await pageFixture.requirementPage.verifyOtpDisplayed();
});

Then('the requirement OTP step should not be displayed', async () => {
  await pageFixture.requirementPage.verifyNoOtp();
});

Then('validation should be displayed for the requirement field {string}', async (field: string) => {
  await pageFixture.requirementPage.verifyFieldValidation(field);
});

// "All India, Near Me, Specific States" -> ["All India", "Near Me", "Specific States"]
Then('the supplier preference options {string} should be selectable', async (options: string) => {
  await pageFixture.requirementPage.verifySupplierPreferenceOptions(options.split(',').map((option) => option.trim()));
});

// "Andhra Pradesh, Arunachal Pradesh" -> ["Andhra Pradesh", "Arunachal Pradesh"]
When('the user selects the states {string}', async (states: string) => {
  await pageFixture.requirementPage.selectStates(states.split(',').map((state) => state.trim()));
});
