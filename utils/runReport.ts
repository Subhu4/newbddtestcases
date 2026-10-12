import * as fs from 'fs';
import * as path from 'path';

/**
 * Author: Subham Maharana
 * Class Name: RunReport
 * Description: Records every step and test result in reports/runReport.csv (opens in Excel).
 */
class RunReport {
  private readonly REPORT_DIR: string = path.join(__dirname, '..', 'reports');
  private readonly REPORT_FILE: string = path.join(this.REPORT_DIR, 'runReport.csv');
  private currentTest: string = 'NOT_SET';

  constructor() {
    if (!fs.existsSync(this.REPORT_DIR)) fs.mkdirSync(this.REPORT_DIR, { recursive: true });
    if (!fs.existsSync(this.REPORT_FILE)) {
      fs.writeFileSync(this.REPORT_FILE, 'Time,Test Case,Step,Status,Details\n');
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: setCurrentTest
   * Description: Stores the name of the running test so every step is recorded under it.
   * Parameters: testName {string} - test title, e.g. "TS_0061 - Open Post Buy Requirement"
   * Return Type: void
   */
  setCurrentTest(testName: string): void {
    this.currentTest = testName;
  }

  /**
   * Author: Subham Maharana
   * Method Name: record
   * Description: Adds one row (time, test, step, status, details) to the run report.
   * Parameters: stepName {string} - step name, status {string} - INFO / PASS / FAIL, details {string} - extra information
   * Return Type: void
   */
  record(stepName: string, status: 'INFO' | 'PASS' | 'FAIL', details: string = ''): void {
    try {
      const clean = (text: string): string => `"${String(text).replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
      const row = [new Date().toISOString(), this.currentTest, stepName, status, details].map(clean).join(',');
      fs.appendFileSync(this.REPORT_FILE, row + '\n');
    } catch (error) {
      console.error(`RunReport failed: ${(error as Error).message}`);
      throw error;
    }
  }
}

export const runReport = new RunReport();
