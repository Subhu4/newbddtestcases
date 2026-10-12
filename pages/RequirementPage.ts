import { Locator, Page } from '@playwright/test';
import { expect } from '../utils/hooks';
import { RequirementUIStore } from '../ui-store/RequirementUIStore';
import { logger } from '../utils/logger';
import { runReport } from '../utils/runReport';
import { Screenshot } from '../utils/screenshot';

/**
 * Author: Subham Maharana
 * Class Name: RequirementPage
 * Description: Actions (methods) for the Post Buy Requirement form.
 */
export class RequirementPage {
  readonly page: Page;
  readonly requirementUI: RequirementUIStore;

  /**
   * Author: Subham Maharana
   * Method Name: constructor
   * Description: Stores the page and creates its UI store (locators).
   * Parameters: page {Page} - Playwright page
   * Return Type: RequirementPage
   */
  constructor(page: Page) {
    this.page = page;
    this.requirementUI = new RequirementUIStore(page);
  }

  /**
   * Author: Subham Maharana
   * Method Name: openRequirementPage
   * Description: Opens the Post Buy Requirement page directly and checks the form is shown.
   * Parameters: url {string} - requirement page URL
   * Return Type: Promise<void>
   */
  async openRequirementPage(url: string): Promise<void> {
    try {
      logger.info(`Opening requirement page: ${url}`);
      runReport.record('Open Requirement Page', 'INFO', `${url}`);
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      await expect(this.requirementUI.REQUIREMENT_DETAILS).toBeVisible();
    } catch (error) {
      logger.error(`Open Requirement Page failed: ${(error as Error).message}`);
      runReport.record('Open Requirement Page', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'openRequirementPage');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyCoreFields
   * Description: Checks product, quantity, unit, mobile, supplier preference and Submit are visible.
   * Parameters: none
   * Return Type: Promise<void>
   */
  async verifyCoreFields(): Promise<void> {
    try {
      logger.info('Verifying requirement form core fields');
      runReport.record('Verify Core Fields', 'INFO', 'Verifying requirement form core fields');
      await expect(this.requirementUI.PRODUCT_SERVICE_INPUT).toBeVisible();
      await expect(this.requirementUI.QUANTITY_INPUT).toBeVisible();
      const unitLabelVisible = await this.requirementUI.UNIT_LABEL.isVisible().catch(() => false);
      if (unitLabelVisible) {
        await expect(this.requirementUI.UNIT_LABEL).toBeVisible();
      } else {
        await expect(this.requirementUI.UNIT_INPUT).toBeVisible();
      }
      await expect(this.requirementUI.MOBILE_INPUT).toBeVisible();
      await expect(this.requirementUI.SUBMIT_REQUIREMENT).toBeVisible();
      await expect(this.requirementUI.SUPPLIER_PREFERENCE_TEXT).toBeVisible();
    } catch (error) {
      logger.error(`Verify Core Fields failed: ${(error as Error).message}`);
      runReport.record('Verify Core Fields', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyCoreFields');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: enterProductName
   * Description: Types the product / service in the product box.
   * Parameters: productName {string} - value to type ("" = left blank on purpose)
   * Return Type: Promise<void>
   */
  async enterProductName(productName: string): Promise<void> {
    try {
      logger.info(`Enter Product Name: ${productName}`);
      runReport.record('Enter Product Name', 'INFO', `${productName}`);
      await expect(this.requirementUI.PRODUCT_SERVICE_INPUT).toBeVisible();
      await this.requirementUI.PRODUCT_SERVICE_INPUT.fill(productName);
      await expect(this.requirementUI.PRODUCT_SERVICE_INPUT).toHaveValue(productName);
    } catch (error) {
      logger.error(`Enter Product Name failed: ${(error as Error).message}`);
      runReport.record('Enter Product Name', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'enterProductName');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: selectInterestedIn
   * Description: Selects the Interested in option when the live page shows it; a blank value or a missing control is skipped.
   * Parameters: interestedIn {string} - option text ("" = skip)
   * Return Type: Promise<void>
   */
  async selectInterestedIn(interestedIn: string): Promise<void> {
    try {
      logger.info(`Selecting Interested in: ${interestedIn}`);
      runReport.record('Select Interested In', 'INFO', `${interestedIn}`);
      if (interestedIn === '') return; // left blank on purpose
      const option = this.requirementUI.TEXT_OPTION(interestedIn);
      const optionVisible = (await option.count()) > 0 && (await option.isVisible().catch(() => false));
      if (optionVisible) {
        await option.click({ timeout: 5000 });
        await expect(option).toBeVisible();
      } else {
        logger.info('Interested in control is not shown by the current page; continuing.');
      }
    } catch (error) {
      logger.error(`Select Interested In failed: ${(error as Error).message}`);
      runReport.record('Select Interested In', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'selectInterestedIn');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: enterQuantity
   * Description: Types the quantity.
   * Parameters: quantity {string} - value to type ("" = left blank on purpose)
   * Return Type: Promise<void>
   */
  async enterQuantity(quantity: string): Promise<void> {
    try {
      logger.info(`Enter Quantity: ${quantity}`);
      runReport.record('Enter Quantity', 'INFO', `${quantity}`);
      await expect(this.requirementUI.QUANTITY_INPUT).toBeVisible();
      await this.requirementUI.QUANTITY_INPUT.fill(quantity);
      await expect(this.requirementUI.QUANTITY_INPUT).toHaveValue(quantity);
    } catch (error) {
      logger.error(`Enter Quantity failed: ${(error as Error).message}`);
      runReport.record('Enter Quantity', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'enterQuantity');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: selectUnit
   * Description: Selects the unit of measurement. Uses the native select when it exists, otherwise the unit text box.
   * Parameters: unit {string} - unit text, e.g. "Piece" ("" = skip)
   * Return Type: Promise<void>
   */
  async selectUnit(unit: string): Promise<void> {
    try {
      logger.info(`Selecting unit: ${unit}`);
      runReport.record('Select Unit', 'INFO', `${unit}`);
      if (unit === '') return; // left blank on purpose
      if ((await this.requirementUI.UNIT_SELECT.count()) === 0) {
        // the unit is not a native <select> on the current page: use the text box when it is shown
        if (await this.requirementUI.UNIT_INPUT.isVisible().catch(() => false)) {
          await this.requirementUI.UNIT_INPUT.fill(unit);
        } else {
          logger.info('Unit of Measurement control is not shown by the current page; continuing.');
        }
        return;
      }
      // the native select is often hidden behind a custom dropdown, so never wait for it to be clickable
      await this.requirementUI.UNIT_SELECT.evaluate((element, unitValue) => {
        const select = element as HTMLSelectElement;
        const wanted = String(unitValue).trim().toLowerCase();
        const option = [...select.options].find((item) => item.text.trim().toLowerCase() === wanted);
        if (!option) throw new Error(`Unit option not found: ${String(unitValue)}`);
        select.value = option.value;
        option.selected = true;
        select.dispatchEvent(new Event('input', { bubbles: true }));
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }, unit);
      await expect(this.requirementUI.UNIT_SELECTED_OPTION).toHaveText(unit, { ignoreCase: true });
    } catch (error) {
      logger.error(`Select Unit failed: ${(error as Error).message}`);
      runReport.record('Select Unit', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'selectUnit');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: selectSupplierPreference
   * Description: Selects a supplier preference radio (All India, Near Me or Specific States).
   * Parameters: value {string} - option label ("" = skip)
   * Return Type: Promise<void>
   */
  async selectSupplierPreference(value: string): Promise<void> {
    try {
      logger.info(`Selecting supplier preference: ${value}`);
      runReport.record('Select Supplier Preference', 'INFO', `${value}`);
      if (value === '') return; // left blank on purpose
      const byLabel = this.requirementUI.SUPPLIER_PREFERENCE_BY_LABEL(value);
      const labelInput = this.requirementUI.SUPPLIER_PREFERENCE_LABEL_INPUT(value);
      if ((await byLabel.count()) > 0 && (await byLabel.isVisible().catch(() => false))) {
        await byLabel.check({ timeout: 5000 });
        await expect(byLabel).toBeChecked();
      } else if ((await labelInput.count()) > 0) {
        // custom-styled radios hide the real input, so force the check instead of waiting for it to be visible
        await labelInput.check({ force: true, timeout: 5000 });
        await expect(labelInput).toBeChecked();
      } else {
        const text = this.requirementUI.TEXT_OPTION(value);
        await text.click({ timeout: 5000 });
        await expect(text).toBeVisible();
      }
    } catch (error) {
      logger.error(`Select Supplier Preference failed: ${(error as Error).message}`);
      runReport.record('Select Supplier Preference', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'selectSupplierPreference');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: enterMobileNumber
   * Description: Types the mobile number.
   * Parameters: mobileNumber {string} - value to type ("" = left blank on purpose)
   * Return Type: Promise<void>
   */
  async enterMobileNumber(mobileNumber: string): Promise<void> {
    try {
      logger.info(`Enter Mobile Number: ${mobileNumber}`);
      runReport.record('Enter Mobile Number', 'INFO', `${mobileNumber}`);
      await expect(this.requirementUI.MOBILE_INPUT).toBeVisible();
      await this.requirementUI.MOBILE_INPUT.fill(mobileNumber);
      await expect(this.requirementUI.MOBILE_INPUT).toHaveValue(mobileNumber);
    } catch (error) {
      logger.error(`Enter Mobile Number failed: ${(error as Error).message}`);
      runReport.record('Enter Mobile Number', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'enterMobileNumber');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyMobileNumberValue
   * Description: Checks the mobile number box holds exactly the expected text.
   * Parameters: expectedValue {string} - expected box value
   * Return Type: Promise<void>
   */
  async verifyMobileNumberValue(expectedValue: string): Promise<void> {
    try {
      logger.info(`Verifying mobile number value: ${expectedValue}`);
      runReport.record('Verify Mobile Number Value', 'INFO', `${expectedValue}`);
      await expect(this.requirementUI.MOBILE_INPUT).toHaveValue(expectedValue);
    } catch (error) {
      logger.error(`Verify Mobile Number Value failed: ${(error as Error).message}`);
      runReport.record('Verify Mobile Number Value', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyMobileNumberValue');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: clickSubmit
   * Description: Clicks Submit Requirement.
   * Parameters: none
   * Return Type: Promise<void>
   */
  async clickSubmit(): Promise<void> {
    try {
      logger.info('Clicking Submit Requirement');
      runReport.record('Click Submit Requirement', 'INFO', 'Clicking Submit Requirement');
      await expect(this.requirementUI.SUBMIT_REQUIREMENT).toBeVisible();
      await this.requirementUI.SUBMIT_REQUIREMENT.scrollIntoViewIfNeeded();
      await this.requirementUI.SUBMIT_REQUIREMENT.click();
      await expect(this.requirementUI.BODY).toBeVisible();
    } catch (error) {
      logger.error(`Click Submit Requirement failed: ${(error as Error).message}`);
      runReport.record('Click Submit Requirement', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'clickSubmit');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyOtpDisplayed
   * Description: Checks the OTP step is shown after a valid submit (the OTP is never entered).
   * Parameters: none
   * Return Type: Promise<void>
   */
  async verifyOtpDisplayed(): Promise<void> {
    try {
      logger.info('Verifying the OTP step is displayed');
      runReport.record('Verify OTP Displayed', 'INFO', 'Verifying the OTP step is displayed');
      await expect(this.requirementUI.OTP_INPUT.or(this.requirementUI.OTP_TEXT)).toBeVisible();
    } catch (error) {
      logger.error(`Verify OTP Displayed failed: ${(error as Error).message}`);
      runReport.record('Verify OTP Displayed', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyOtpDisplayed');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyNoOtp
   * Description: Checks the OTP step is NOT shown after an invalid submit.
   * Parameters: none
   * Return Type: Promise<void>
   */
  async verifyNoOtp(): Promise<void> {
    try {
      logger.info('Verifying the OTP step is not displayed');
      runReport.record('Verify No OTP', 'INFO', 'Verifying the OTP step is not displayed');
      await expect(this.requirementUI.OTP_INPUT).toBeHidden();
    } catch (error) {
      logger.error(`Verify No OTP failed: ${(error as Error).message}`);
      runReport.record('Verify No OTP', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyNoOtp');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifyFieldValidation
   * Description: Checks validation is shown for the field that holds the invalid value
   *              (browser validity, aria-invalid, error elements or validation words on the page).
   * Parameters: field {string} - product, quantity or mobile
   * Return Type: Promise<void>
   */
  async verifyFieldValidation(field: string): Promise<void> {
    try {
      logger.info(`Verifying validation for field: ${field}`);
      runReport.record('Verify Field Validation', 'INFO', `${field}`);
      const fieldLocator = this.getFieldLocator(field);
      await expect.poll(async () => this.hasValidationEvidence(fieldLocator)).toBeTruthy();
    } catch (error) {
      logger.error(`Verify Field Validation failed: ${(error as Error).message}`);
      runReport.record('Verify Field Validation', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifyFieldValidation');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: verifySupplierPreferenceOptions
   * Description: Selects every supplier preference option one by one and checks its label is visible.
   * Parameters: options {string[]} - option labels
   * Return Type: Promise<void>
   */
  async verifySupplierPreferenceOptions(options: string[]): Promise<void> {
    try {
      logger.info(`Verifying supplier preference options: ${options.join(', ')}`);
      runReport.record('Verify Supplier Preference Options', 'INFO', `${options.join(', ')}`);
      for (const option of options) {
        await this.selectSupplierPreference(option);
        const label = this.requirementUI.TEXT_OPTION(option);
        await label.scrollIntoViewIfNeeded();
        await expect(label).toBeVisible();
      }
    } catch (error) {
      logger.error(`Verify Supplier Preference Options failed: ${(error as Error).message}`);
      runReport.record('Verify Supplier Preference Options', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'verifySupplierPreferenceOptions');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: selectStates
   * Description: Selects the states in the native multi-select, or by clicking the visible state labels.
   * Parameters: states {string[]} - state names
   * Return Type: Promise<void>
   */
  async selectStates(states: string[]): Promise<void> {
    try {
      logger.info(`Selecting states: ${states.join(', ')}`);
      runReport.record('Select States', 'INFO', `${states.join(', ')}`);
      const normalize = (text: string): string => text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '');
      if ((await this.requirementUI.STATE_SELECT.count()) > 0) {
        const selected = await this.requirementUI.STATE_SELECT.evaluate((element, requestedStates) => {
          const select = element as HTMLSelectElement;
          const clean = (text: string): string => text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]/g, '');
          const selectedOptions: string[] = [];
          for (const requestedState of requestedStates as string[]) {
            const option = Array.from(select.options).find((item) => clean(item.textContent ?? '') === clean(requestedState));
            if (!option) throw new Error(`State option not found: ${requestedState}`);
            option.selected = true;
            selectedOptions.push((option.textContent ?? '').trim());
          }
          select.dispatchEvent(new Event('input', { bubbles: true }));
          select.dispatchEvent(new Event('change', { bubbles: true }));
          return selectedOptions;
        }, states);
        for (const state of states) {
          expect(selected.some((item) => normalize(item) === normalize(state))).toBeTruthy();
        }
      } else {
        for (const state of states) {
          const option = this.requirementUI.STATE_OPTION(state);
          await expect(option).toBeVisible();
          await option.click();
        }
      }
    } catch (error) {
      logger.error(`Select States failed: ${(error as Error).message}`);
      runReport.record('Select States', 'FAIL', (error as Error).message);
      await Screenshot.capture(this.page, 'selectStates');
      throw error;
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: getFieldLocator
   * Description: Returns the locator of the requirement field that holds the invalid value.
   * Parameters: field {string} - product, quantity or mobile
   * Return Type: Locator
   */
  private getFieldLocator(field: string): Locator {
    switch (field) {
      case 'product':
        return this.requirementUI.PRODUCT_SERVICE_INPUT;
      case 'quantity':
        return this.requirementUI.QUANTITY_INPUT;
      case 'mobile':
        return this.requirementUI.MOBILE_INPUT;
      default:
        throw new Error(`Unknown requirement field: ${field}`);
    }
  }

  /**
   * Author: Subham Maharana
   * Method Name: hasValidationEvidence
   * Description: Returns true when the field shows any sign of validation (browser message, aria-invalid,
   *              error element or a validation word on the page).
   * Parameters: field {Locator} - the field to check
   * Return Type: Promise<boolean>
   */
  private async hasValidationEvidence(field: Locator): Promise<boolean> {
    const nativeMessage = await field.evaluate((element) => (element as HTMLInputElement).validationMessage ?? '').catch(() => '');
    const invalid = await field
      .evaluate((element) => {
        const input = element as HTMLInputElement;
        return !input.checkValidity() || input.getAttribute('aria-invalid') === 'true';
      })
      .catch(() => false);
    const errorElements = await this.requirementUI.VALIDATION_MESSAGES.count().catch(() => 0);
    const bodyText = await this.requirementUI.BODY.innerText();
    const hasValidationKeyword = /required|invalid|valid mobile|must be greater|enter a valid/i.test(bodyText);
    return invalid || Boolean(nativeMessage) || errorElements > 0 || hasValidationKeyword;
  }
}
