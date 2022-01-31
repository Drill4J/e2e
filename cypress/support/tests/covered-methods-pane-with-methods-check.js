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

Cypress.Commands.add("coveredMethodsPaneWithMethodsCheckTest", { }, (testsWithCoveredMethods) => {
  Object.entries(testsWithCoveredMethods).forEach((([testName, testData]) => {
    cy.contains('[data-test="test-details:table-wrapper"] table tbody tr', testName)
      .contains('[data-test="test-actions:view-curl:id"] a', testData.methodsCovered)
      .click({ force: true }); // this element is detached from the DOM when tests are run

    cy.getByDataTest("covered-methods-modal:test-name").should("have.text", testName);

    cy.getByDataTest("covered-methods-modal:test-path").should("have.text", testData.path);

    cy.contains('[data-test="covered-methods-modal:test-type"]', testData.type, { matchCase: false }).should("exist");

    cy.getByDataTest("covered-methods-modal:methods-count").should("have.text", testData.methodsCovered);

    cy.getByDataTest("covered-methods-modal:list:method:name").should("not.have.length", 0);

    cy.get("#modal [data-test='search-input:enable-input']").click();

    testData.coveredMethods.forEach(({ name, type, coverage }) => {
      cy.getByDataTest("name:search-input").type(name);

      cy.getByDataTest("covered-methods-modal:list:method:name").should("contain", name);
      cy.contains('[data-test="coverage-methods:method:type"]', type, { matchCase: false }).should("exist");
      cy.getByDataTest("coverage-methods:method:coverage").should("contain", coverage);

      cy.getByDataTest("search-input:clear-icon").click();
    });

    cy.getByDataTest("modal:close-button").click();
  }));
});
