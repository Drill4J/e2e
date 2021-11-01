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

// "[engine:junit-jupiter]/[class:api.microservices.McrApiTest]/[method:junit5GetVetsInfoTest()]": {
//     "type": "Auto",
//     "coverage": "29.6",
//     "methodsCovered": "11"
// }

Cypress.Commands.add("testsToRunTableTest", { }, (testsToRun) => {
  Object.entries(testsToRun).forEach(([testName, testData]) => {
    cy.contains("table tbody tr", testName).should("exist");

    cy.contains("table tbody tr", testName).contains('[data-test="td-row-type"]', testData.type).should("exist");

    cy.contains("table tbody tr", testName)
      .contains('[data-test="td-row-cell-coverage.percentage"]', testData.coverage).should("exist");

    cy.contains("table tbody tr", testName)
      .contains('[data-test="td-row-cell-coverage.methodCount.covered"]', testData.methodsCovered).should("exist");
  });
});
