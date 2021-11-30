/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/// <reference types="cypress" />

// not required pass every tests data

// "[engine:testng]/[class:api.standalone.StandaloneApiTest]/[method:testNgGetHomePage()]": {
//     "type": "Auto",
//     "expectedStatus": "Passed",
//     "coverage": "0.2",
//     "methodsCovered": "1"
// },
// testsCount: "3"

Cypress.Commands.add("testsTableTest", { }, (tests, testsCount) => {
  Object.entries(tests).forEach(([testName, testData]) => {
    cy.contains("table tbody tr", testName)
      .find('[data-test="td-row-cell-overview.details.name"]').should("have.text", testName);

    cy.contains("table tbody tr", testName)
      .find('[data-test="td-row-cell-type"]').should("have.text", testData.type);

    cy.contains("table tbody tr", testName)
      .find('[data-test="td-row-cell-overview.result"]').should("have.text", testData.expectedStatus);

    cy.contains("table tbody tr", testName)
      .find('[data-test="td-row-cell-coverage.percentage"]').should("have.text", testData.coverage);

    cy.contains("table tbody tr", testName)
      .find('[data-test="test-actions:view-curl:id"]').should("have.text", testData.methodsCovered);
  });

  cy.getByDataTest("td-row-cell-overview.details.name").should("have.length", testsCount);
});
