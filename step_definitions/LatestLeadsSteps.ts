import { Then } from '@cucumber/cucumber';
import { pageFixture } from '../utils/hooks';
/**
 * Author: Subham Maharana
 * File Name: LatestLeadsSteps.ts
 * Description: Step definitions for the Latest Buy Leads cards (verified icon, masked mobile numbers).
 * Used in: LatestLeadsAndRegistration.feature
 */

Then('the latest buy lead cards {int}, {int} and {int} should be displayed', async (first: number, second: number, third: number) => {
  await pageFixture.buyersPage.verifyLatestLeads([first, second, third]);
});

Then('the latest buy lead cards {int}, {int} and {int} should show a verified icon', async (first: number, second: number, third: number) => {
  await pageFixture.buyersPage.verifyVerifiedIcons([first, second, third]);
});

Then('at least {int} masked mobile numbers should be displayed', async (minimumCount: number) => {
  await pageFixture.buyersPage.verifyMaskedMobileCount(minimumCount);
});

Then('the latest buy lead cards {int}, {int} and {int} should show masked mobile numbers', async (first: number, second: number, third: number) => {
  await pageFixture.buyersPage.verifyMaskedMobileAt([first, second, third]);
});

Then('no unmasked mobile number should be displayed', async () => {
  await pageFixture.buyersPage.verifyNoUnmaskedMobile();
});
