import { Page, Locator } from '@playwright/test';

/** Makes plain text safe to use inside a regular expression. */
const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Author: Subham Maharana
 * Class Name: RequirementUIStore
 * Description: UI store for the Post Buy Requirement form (fields, supplier preference, states, OTP step).
 *              Only locators live here - the actions are in pages/RequirementPage.ts.
 */
export class RequirementUIStore {
  readonly BODY: Locator;
  readonly REQUIREMENT_DETAILS: Locator;
  readonly PRODUCT_SERVICE_INPUT: Locator;
  readonly QUANTITY_INPUT: Locator;
  readonly UNIT_LABEL: Locator;
  readonly UNIT_INPUT: Locator;
  readonly UNIT_SELECT: Locator;
  readonly UNIT_SELECTED_OPTION: Locator;
  readonly MOBILE_INPUT: Locator;
  readonly SUPPLIER_PREFERENCE_TEXT: Locator;
  readonly STATE_SELECT: Locator;
  readonly SUBMIT_REQUIREMENT: Locator;
  readonly OTP_INPUT: Locator;
  readonly OTP_TEXT: Locator;
  readonly VALIDATION_MESSAGES: Locator;
  readonly TEXT_OPTION: (value: string) => Locator;
  readonly SUPPLIER_PREFERENCE_BY_LABEL: (value: string) => Locator;
  readonly SUPPLIER_PREFERENCE_LABEL_INPUT: (value: string) => Locator;
  readonly STATE_OPTION: (value: string) => Locator;

  /**
   * Author: Subham Maharana
   * Method Name: constructor
   * Description: Creates all locators of this page.
   * Parameters: page {Page} - Playwright page
   * Return Type: RequirementUIStore
   */
  constructor(private page: Page) {
    // ---------- FORM LOCATORS ----------
    this.BODY = page.locator('body');
    this.REQUIREMENT_DETAILS = page.getByText('Requirement Details', { exact: true }).first();
    this.PRODUCT_SERVICE_INPUT = page.locator('input[placeholder="Products / Services you are looking for"]').first();
    this.QUANTITY_INPUT = page.locator('input[placeholder="Quantity"]').first();
    this.UNIT_LABEL = page.getByText('Unit of Measurement', { exact: true }).first();
    this.UNIT_INPUT = page.locator('input[placeholder="Unit of Measurement"]').first();
    this.UNIT_SELECT = page.locator('select#quantity_unit, select[name*="unit" i]').first();
    this.UNIT_SELECTED_OPTION = this.UNIT_SELECT.locator('option:checked');
    this.MOBILE_INPUT = page.locator('input[placeholder="Enter Mobile Number"]').first();
    this.SUBMIT_REQUIREMENT = page.getByRole('button', { name: 'Submit Requirement', exact: true }).first();

    // ---------- SUPPLIER PREFERENCE LOCATORS ----------
    this.SUPPLIER_PREFERENCE_TEXT = page.getByText('Supplier Preference', { exact: true }).first();
    this.SUPPLIER_PREFERENCE_BY_LABEL = (value: string) => page.getByLabel(value, { exact: true }).first();
    this.SUPPLIER_PREFERENCE_LABEL_INPUT = (value: string) => page.locator('label').filter({ hasText: value }).locator('input').first();
    this.TEXT_OPTION = (value: string) => page.getByText(value, { exact: true }).last();
    this.STATE_SELECT = page.locator('select[name*="state" i], select[id*="state" i]').first();
    this.STATE_OPTION = (value: string) => page
      .locator('div:visible, li:visible, label:visible, span:visible')
      .filter({ hasText: new RegExp(`^\\s*${escapeRegex(value)}\\s*$`, 'i') })
      .last();

    // ---------- OTP AND VALIDATION LOCATORS ----------
    this.OTP_INPUT = page.locator('input[name*="otp" i], input[id*="otp" i], input[placeholder*="otp" i]').first();
    this.OTP_TEXT = page.getByText(/one.?time password|OTP/i).first();
    this.VALIDATION_MESSAGES = page.locator(
      '.error, .error-msg, .validation, .invalid-feedback, [class*="error" i], [class*="invalid" i]'
    );
  }
}
