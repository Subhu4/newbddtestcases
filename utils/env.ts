import * as path from 'path';
import * as dotenv from 'dotenv';

/**
 * Author: Subham Maharana
 * File Name: env.ts
 * Description: Reads the values from the .env file (project root) and gives them to the tests.
 *              Holds the URLs and run settings (all other test data is in the feature file Examples). A missing value stops the run with a clear message.
 */

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

/**
 * Method Name: getEnv
 * Description: Returns the value of one .env key, or throws if the key is missing / empty.
 * Parameters: key - name of the variable in .env
 * Return Type: string
 */
function getEnv(key: string): string {
  const value = process.env[key];
  if (!value || value.trim() === '') {
    throw new Error(`Missing "${key}" in the .env file`);
  }
  return value.trim();
}

export const env = {
  baseUrl: getEnv('BASE_URL'),
  buyersUrl: getEnv('BUYERS_URL'),
  postBuyRequirementUrl: getEnv('POST_BUY_REQUIREMENT_URL'),
  headless: process.env.HEADLESS === 'true',
};
