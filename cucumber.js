/**
 * Author: Subham Maharana
 * File Name: cucumber.js
 * Description: Cucumber settings.
 *   paths          -> the .feature files IN EXCEL ORDER (TS_0061 -> TS_0080), so the run follows the test case sheet
 *   requireModule  -> ts-node lets Cucumber read TypeScript files directly
 *   require        -> hooks (utils) and the step definitions
 *   format         -> 1. summary : pass / fail count of the scenarios in the terminal
 *                     2. html    : Cucumber HTML report -> reports/cucumber-report.html
 *                     3. allure  : Allure results -> allure-results folder
 *                        (its own messages go to a text file, otherwise it hides the terminal summary)
 *   parallel: 0    -> run scenarios one by one
 */
module.exports = {
  default: {
    paths: [
      'features/PostBuyRequirement.feature',          // TS_0061 - TS_0069
      'features/BuyLeadsPageContent.feature',         // TS_0070 - TS_0077
      'features/LatestLeadsAndRegistration.feature',  // TS_0078 - TS_0080
    ],
    requireModule: ['ts-node/register'],
    require: ['utils/hooks.ts', 'step_definitions/**/*.ts'],
    format: [
      'summary',
      'html:reports/cucumber-report.html',
      'allure-cucumberjs/reporter:reports/allure-log.txt',
    ],
    formatOptions: {
      resultsDir: 'allure-results',
      snippetInterface: 'async-await',
    },
    parallel: 0,
    retry: 0,
  },
};
