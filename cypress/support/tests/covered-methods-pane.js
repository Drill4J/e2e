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

// "engine:testng]/[class:api.standalone.StandaloneApiTest]/[method:testNgGetHomePage()]": {
//     "type": "Auto",
//           "expectedStatus": "Passed",
//           "coverage": "0.2",
//           "methodsCovered": "1",
//           "path": "",
// }

Cypress.Commands.add("coveredMethodsPaneTest", { }, (testsWithCoveredMethods) => {
  Object.entries(testsWithCoveredMethods).forEach((([testName, testData]) => {
    cy.contains('[data-test="test-details:table-wrapper"] table tbody tr', testName)
      .contains('[data-test="test-actions:view-curl:id"] a', testData.methodsCovered)
      .click({ force: true }); // this element is detached from the DOM when tests are run

    cy.getByDataTest("covered-methods-modal:test-name").should("have.text", testName);

    cy.getByDataTest("covered-methods-modal:test-path").should("have.text", testData.path);

    cy.contains('[data-test="covered-methods-modal:test-type"]', testData.type, { matchCase: false }).should("exist");

    cy.getByDataTest("covered-methods-modal:methods-count").should("have.text", testData.methodsCovered);

    // TODO failed because we use virtualization
    // cy.getByDataTest("covered-methods-list:item").should("have.length", testData.methodsCovered);
    cy.getByDataTest("covered-methods-modal:list:method:name").should("not.have.length", 0);

    cy.getByDataTest("modal:close-button").click();
  }));
});
