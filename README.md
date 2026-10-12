# ExportersIndia BDD - Member 4 (Subham Maharana)

Buyer Requirements & Buy Leads (TS_0061 - TS_0080) - Playwright + Cucumber + TypeScript.

## Structure

- `features/` - 3 feature files, 8 Scenario Outlines run in Excel order TS_0061 to TS_0080 (order is set in `cucumber.js`); all test data is in the Examples tables (long lists are separated with `;`)
- `step_definitions/` - thin steps, each one only calls a page method
- `pages/` - Page Object classes (actions, logging, run report, screenshot on failure)
- `ui-store/` - locators only
- `utils/` - `hooks.ts` (browser launch, pageFixture, expect), logger, run report, screenshot
- `.env` - URLs and run settings (BASE_URL, BUYERS_URL, POST_BUY_REQUIREMENT_URL, HEADLESS)
- `cucumber.js` - Cucumber settings and report formats

## Run

```powershell
npm i
npx playwright install chromium
npm test
```

Other commands: `npm run test:smoke`, `npm run test:regression`, `npm run test:positive`, `npm run test:negative`, `npm run test:dry`.

Chrome is visible by default. For a headless run set `HEADLESS=true` (PowerShell: `$env:HEADLESS="true"; npm test`).

Reports: `reports/cucumber-report.html`, `reports/runReport.csv`, `logs/execution.log`, `screenshots/` and `allure-results/`
(`npm run allure:generate` then `npm run allure:open`).
