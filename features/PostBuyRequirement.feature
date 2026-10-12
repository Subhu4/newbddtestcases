# Author: Subham Maharana
# File Name: PostBuyRequirement.feature
# Epic: Post Buy Requirement - open the form, submit valid data, validate missing / invalid values and choose the supplier preference
# Test Cases: TS_0061, TS_0062, TS_0067, TS_0068 (Positive) + TS_0063, TS_0064, TS_0065, TS_0066, TS_0069 (Negative) -> 3 scenarios
# RULE: the OTP step is only checked for display (valid submit) or for NOT opening (invalid submit) - no OTP is ever entered.
# Test data is NOT hard coded in the steps: every value comes from the Examples table (emptyValue column = left blank on purpose).
# Tags: @Smoke (key happy paths) | @Regression (all) | @Functional (feature) | @Positive / @Negative | @TS_00xx (Excel ID)

@PostBuyRequirement @Functional
Feature: Post Buy Requirement
  As a buyer on ExportersIndia
  I want to post a buy requirement and see which information must be corrected
  So that suppliers can respond to what I need

  # TS_0061 (open the form from the For Buyer menu) + TS_0062 (submit a complete requirement with valid data)
  @TS_0061 @TS_0062 @Smoke @Regression @Positive
  Scenario Outline: <testCaseId> - Post Buy Requirement - Open Form From For Buyer and Submit Valid Requirement
    Given the user opens the ExportersIndia home page
    When the user opens Post Buy Requirement from For Buyer
    Then the requirement form core fields should be visible
    When the user enters "<productName>" as the product name
    And the user selects "<interestedIn>" as Interested in
    And the user enters "<quantity>" as the quantity
    And the user selects "<unit>" as the unit
    And the user selects "<supplierPreference>" as the supplier preference
    And the user enters "<mobileNumber>" as the mobile number
    And the user clicks on Submit Requirement
    Then the requirement OTP step should be displayed

    Examples:
      | testCaseId        | productName   | interestedIn    | quantity | unit  | supplierPreference | mobileNumber |
      | TS_0061 & TS_0062 | Office Chairs | Computer Chairs | 25       | Piece | All India          | 8070987890   |

  # Validation of missing and non-positive values - the form is re-opened in a NEW browser session before each part so every part starts like a first visit:
  # TS_0063 (product missing) -> TS_0064 (Interested in missing) -> TS_0065 (quantity missing) -> TS_0066 (zero, then negative quantity)
  @TS_0063 @TS_0064 @TS_0065 @TS_0066 @Regression @Negative
  Scenario Outline: <testCaseId> - Requirement Validation - Missing Product, Interested In, Quantity and Zero or Negative Quantity
    Given the user opens the ExportersIndia home page
    When the user opens Post Buy Requirement from For Buyer
    And the user enters "<emptyValue>" as the product name
    And the user selects "<emptyValue>" as Interested in
    And the user enters "<quantity>" as the quantity
    And the user selects "<unit>" as the unit
    And the user selects "<supplierPreference>" as the supplier preference
    And the user enters "<mobileNumber>" as the mobile number
    And the user clicks on Submit Requirement
    Then validation should be displayed for the requirement field "<productField>"
    And the requirement OTP step should not be displayed
    Given the user opens the Post Buy Requirement page in a new browser session
    When the user enters "<productName>" as the product name
    And the user selects "<emptyValue>" as Interested in
    And the user enters "<quantity>" as the quantity
    And the user selects "<unit>" as the unit
    And the user selects "<supplierPreference>" as the supplier preference
    And the user enters "<mobileNumber>" as the mobile number
    And the user clicks on Submit Requirement
    Then validation should be displayed for the requirement field "<quantityField>"
    And the requirement OTP step should not be displayed
    Given the user opens the Post Buy Requirement page in a new browser session
    When the user enters "<productName>" as the product name
    And the user selects "<interestedIn>" as Interested in
    And the user enters "<emptyValue>" as the quantity
    And the user selects "<unit>" as the unit
    And the user selects "<supplierPreference>" as the supplier preference
    And the user enters "<mobileNumber>" as the mobile number
    And the user clicks on Submit Requirement
    Then validation should be displayed for the requirement field "<quantityField>"
    And the requirement OTP step should not be displayed
    Given the user opens the Post Buy Requirement page in a new browser session
    When the user enters "<productName>" as the product name
    And the user selects "<interestedIn>" as Interested in
    And the user enters "<zeroQuantity>" as the quantity
    And the user selects "<unit>" as the unit
    And the user selects "<supplierPreference>" as the supplier preference
    And the user enters "<mobileNumber>" as the mobile number
    And the user clicks on Submit Requirement
    Then validation should be displayed for the requirement field "<quantityField>"
    And the requirement OTP step should not be displayed
    When the user enters "<negativeQuantity>" as the quantity
    And the user clicks on Submit Requirement
    Then validation should be displayed for the requirement field "<quantityField>"
    And the requirement OTP step should not be displayed

    Examples:
      | testCaseId                                | productName   | interestedIn    | quantity | unit  | supplierPreference | mobileNumber | emptyValue | zeroQuantity | negativeQuantity | productField | quantityField |
      | TS_0063 & TS_0064 & TS_0065 & TS_0066     | Office Chairs | Computer Chairs | 25       | Piece | All India          | 8070987890   |            | 0            | -1               | product      | quantity      |

  # TS_0067 (all supplier preference options can be selected) + TS_0068 (select specific states)
  # + TS_0069 (a short mobile number is kept as typed, then rejected on submit)
  @TS_0067 @TS_0068 @TS_0069 @Regression @Positive @Negative
  Scenario Outline: <testCaseId> - Supplier Preference and Mobile Number - Verify Options, Select States and Reject Invalid Mobile
    Given the user opens the Post Buy Requirement page in a new browser session
    Then the supplier preference options "<preferenceOptions>" should be selectable
    When the user selects "<specificStatesOption>" as the supplier preference
    And the user selects the states "<states>"
    Given the user opens the Post Buy Requirement page in a new browser session
    When the user enters "<productName>" as the product name
    And the user selects "<interestedIn>" as Interested in
    And the user enters "<quantity>" as the quantity
    And the user selects "<unit>" as the unit
    And the user selects "<supplierPreference>" as the supplier preference
    And the user enters "<invalidMobile>" as the mobile number
    Then the mobile number field should contain "<invalidMobile>"
    When the user clicks on Submit Requirement
    Then validation should be displayed for the requirement field "<mobileField>"
    And the requirement OTP step should not be displayed

    Examples:
      | testCaseId                  | preferenceOptions                   | specificStatesOption | states                                                       | productName   | interestedIn    | quantity | unit  | supplierPreference | invalidMobile | mobileField |
      | TS_0067 & TS_0068 & TS_0069 | All India, Near Me, Specific States | Specific States      | Andaman & Nicobar islands, Andhra Pradesh, Arunachal Pradesh | Office Chairs | Computer Chairs | 25       | Piece | All India          | 12345         | mobile      |
