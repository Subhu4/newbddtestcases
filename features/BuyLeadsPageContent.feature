# Author: Subham Maharana
# File Name: BuyLeadsPageContent.feature
# Epic: Buy Leads Page - header support number, introduction, For Buyer menu, industry directory, industry pages and popular products
# Test Cases: TS_0070, TS_0071, TS_0072, TS_0073, TS_0074, TS_0075, TS_0076, TS_0077 (all Positive) -> 4 scenarios
# Test data is NOT hard coded in the steps: every value comes from the Examples table.
#   (the 40 industry names and the 10 agriculture categories contain commas, so those lists are separated with a semicolon ; inside the Examples cell)
# Tags: @Smoke (key happy paths) | @Regression (all) | @Functional (feature) | @Positive / @Negative | @TS_00xx (Excel ID)

@BuyLeadsPageContent @Functional
Feature: Buy Leads Page Content
  As a buyer on ExportersIndia
  I want the Buy Leads page to show support details, the For Buyer menu and the industry directory
  So that I can reach support and browse buy leads by industry

  # TS_0070 (header support number stays after scroll and reload) + TS_0071 (introduction sentence below the heading)
  @TS_0070 @TS_0071 @Smoke @Regression @Positive
  Scenario Outline: <testCaseId> - Buyers Page Header - Support Number and Introduction
    Given the user opens the ExportersIndia Buyers page
    Then the header should display one of the support texts "<supportTexts>"
    When the user scrolls to the bottom of the page and back to the top
    Then the header should still display the support text
    When the user reloads the Buyers page
    Then the header should still display the support text
    And the Buyers page should show the introduction "<introText>"

    Examples:
      | testCaseId        | supportTexts                                              | introText                                                                                                                      |
      | TS_0070 & TS_0071 | Call us : 9700-318-318, Support : +91-9700318318, 9700-318-318 | Access verified buy leads and trade leads by industry to connect with serious global buyers and grow your business faster. |

  # TS_0072 (For Buyer menu options) + TS_0073 (industry directory content and count)
  @TS_0072 @TS_0073 @Regression @Positive
  Scenario Outline: <testCaseId> - Buyers Page Menu - For Buyer Options and Industry Directory
    Given the user opens the ExportersIndia Buyers page
    When the user hovers over For Buyer on the Buyers page
    Then the For Buyer menu should list "<buyerMenu>"
    And the industry section should show "<industrySubText>"
    And the industry link "<firstIndustry>" should be visible
    And the industry link "<middleIndustry>" should be visible
    And the industry link "<lastIndustry>" should be visible
    And the industry directory should list all the industries "<allIndustries>"

    Examples:
      | testCaseId        | buyerMenu                                                                              | industrySubText                                      | firstIndustry                     | middleIndustry           | lastIndustry             | allIndustries |
      | TS_0072 & TS_0073 | Post Buy Requirement, Browse Suppliers, Manufacturers Directory, Country Suppliers, Buyer FAQ | Find industry-specific buy leads from verified buyers. | Agricultural Products & Equipment | Textiles, Yarn & Fabrics | Transportation & Logistics | Agricultural Products & Equipment; Apparel & Fashion Accessories; Automobile Parts & Accessories; Ayurveda & Herbal Product; Business Services; Chemical & Chemical Products; Computers & Internet; Consumer Electronics & Home Appliances; Cosmetics & Personal Care Products; Education & Training Services; Electronics & Electrical; Engineering Service; Event Management & Photography; Financial & Legal Services; Food & Beverage Products Suppliers; Furniture & Carpentry Services; Gifts & Crafts; Home Furnishing Products & Suppliers; Home Supplies & Household Products; Hospitals & Diagnosis Supplies; HR Planning & Recruitment; Industrial Machinery & Plant Equipment; Industrial Supplies; Industrial Tools & Equipment Suppliers; Jewelry & Jewelry Designers; Kitchen Utensils & Appliances; Media Production & Advertising; Minerals & Metals; Office Supplies; Packaging & Paper; Pharmaceutical & Healthcare Products; Real Estate, Building, Construction Material & Services; Scientific & Laboratory Instruments; Security Products & Services; Sports Goods & Entertainment; Telecommunication; Textiles, Yarn & Fabrics; Tours, Travels & Hotels; Toys & Games; Transportation & Logistics |

  # TS_0074 (agriculture page content) + TS_0075 (breadcrumb link back to the Buyers page)
  @TS_0074 @TS_0075 @Smoke @Regression @Positive
  Scenario Outline: <testCaseId> - Industry Pages - Agriculture Content and Breadcrumb Back to Buyers
    Given the user opens the ExportersIndia Buyers page
    When the user opens the industry "<agricultureIndustry>"
    Then the industry page should be displayed at "<agricultureUrlPart>" with the heading "<agricultureHeading>"
    And the industry page should list the agriculture categories "<agricultureCategories>" with counts
    And at least <minimumCategories> category headings with counts should be displayed
    When the user returns to the Buyers page using the breadcrumb
    Then the Buyers page should be displayed
    When the user opens the industry "<textilesIndustry>"
    Then the industry page URL should contain "<textilesUrlPart>"
    When the user returns to the Buyers page using the breadcrumb
    Then the Buyers page should be displayed

    Examples:
      | testCaseId        | agricultureIndustry               | agricultureUrlPart      | agricultureHeading                        | agricultureCategories | minimumCategories | textilesIndustry         | textilesUrlPart       |
      | TS_0074 & TS_0075 | Agricultural Products & Equipment | /buyers/agriculture.htm | Buyers for Agricultural Products & Equipment | Bird, Poultry & Animal Feed; Seeds & Plant Saplings; Fresh Flowers & Plants; Fertilizers & Soil Additives; Pets & Farm Animals; Coir & Agro Products; Farming Tools, Equipment & Machines; Tractors & Tractor Parts; Agricultural Irrigation & Harvesting Equipment; Pesticides & Insecticides | 10                | Textiles, Yarn & Fabrics | /buyers/textiles.htm  |

  # TS_0076 (popular products list) + TS_0077 (A4 Size Paper leads page)
  @TS_0076 @TS_0077 @Regression @Positive
  Scenario Outline: <testCaseId> - Popular Products - List Products and Open A4 Size Paper Leads
    Given the user opens the ExportersIndia Buyers page
    Then the popular products section "<popularSection>" should list "<popularProducts>"
    When the user opens the popular product "<popularProduct>"
    Then the A4 Size Paper page URL should contain "<a4UrlPart>"
    And the A4 Size Paper page should show the heading "<a4Heading>" with Home and Buyers breadcrumbs
    And the A4 Size Paper leads should show Contact Buyer and Show More Result

    Examples:
      | testCaseId        | popularSection                         | popularProducts                                                      | popularProduct | a4UrlPart                      | a4Heading               |
      | TS_0076 & TS_0077 | Purchase Leads Across Popular Products | A4 Size Paper, Anti Iron Gel, Old Coins, Cashew Nuts, Turmeric Finger | A4 Size Paper  | /buyers/a4-size-copy-paper.htm | A4 Size Paper Buy Leads |
