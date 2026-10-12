# Author: Subham Maharana
# File Name: LatestLeadsAndRegistration.feature
# Epic: Latest Buy Leads and Seller Registration - verified latest leads with masked buyer numbers, then join as a seller
# Test Cases: TS_0078, TS_0079, TS_0080 (all Positive) -> 1 scenario
# RULE: the registration form is only checked for display - nothing is typed and "Create Account" is never clicked.
# Test data is NOT hard coded in the steps: every value comes from the Examples table.
# Tags: @Smoke (key happy paths) | @Regression (all) | @Functional (feature) | @Positive / @Negative | @TS_00xx (Excel ID)

@LatestLeadsAndRegistration @Functional
Feature: Latest Buy Leads and Seller Registration
  As a seller on ExportersIndia
  I want to see verified latest buy leads with masked buyer numbers and join as a seller
  So that I can connect with genuine buyers

  # TS_0078 (verified icon on the 1st, 5th and 10th lead cards) + TS_0079 (buyer mobile numbers are masked)
  # + TS_0080 (Connect With Genuine Buyers opens the seller registration page)
  @TS_0078 @TS_0079 @TS_0080 @Smoke @Regression @Positive
  Scenario Outline: <testCaseId> - Latest Buy Leads and Seller Registration - Verified Icon, Masked Mobile and Connect With Genuine Buyers
    Given the user opens the ExportersIndia Buyers page
    Then the latest buy lead cards <first>, <fifth> and <tenth> should be displayed
    And the latest buy lead cards <first>, <fifth> and <tenth> should show a verified icon
    And at least <minimumMasked> masked mobile numbers should be displayed
    And the latest buy lead cards <first>, <fifth> and <tenth> should show masked mobile numbers
    And no unmasked mobile number should be displayed
    When the user clicks "<buttonName>" on the Buyers page
    Then the seller registration page should be displayed at "<registrationUrlPart>"
    And the registration form should show both headings, Create Account and at least <minimumInputs> inputs

    Examples:
      | testCaseId                  | first | fifth | tenth | minimumMasked | buttonName                  | registrationUrlPart                                | minimumInputs |
      | TS_0078 & TS_0079 & TS_0080 | 1     | 5     | 10    | 10            | Connect With Genuine Buyers | register-business-online?joinfree=buyleadstartsell | 3             |
