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

Cypress.Commands.add("testsTableTest", { }, (testsWithCoveredMethods, testsCount) => {
  if (!Number(testsCount)) {
    cy.getByDataTest("stub:title").should("exist");
    cy.getByDataTest("stub:message").should("exist");
  } else {
    cy.get('[data-test="test-details:table-wrapper"] tbody tr').each(($testRow) => {
      const testName = $testRow.find('[data-test="compound-cell:name"]').text();
      const testData = testsWithCoveredMethods[testName];
      if (testData) { // created no all tests in fixture
        // TODO need to refactor to individual tests because log is uninformative
        expect($testRow.find('[data-test="td-row-cell-type"]').text()).to.be.eq(testData.type);
        expect($testRow.find('[data-test="td-row-cell-details.result"]').text()).to.be.eq(testData.expectedStatus);
        expect($testRow.find('[data-test="td-row-cell-coverage.percentage"]').text()).to.be.eq(`${testData.coverage}`);
        expect($testRow.find('[data-test="test-actions:view-curl:id"]').text()).to.be.eq(testData.methodsCovered);
      }
    }).then(($list) => {
      expect($list).to.have.length(testsCount);
    });
  }
});

export const testsTableTest = (testsWithCoveredMethods, testsCount) => {
  if (!Number(testsCount)) {
    it("should display stub", () => {
      cy.getByDataTest("stub:title").should("exists");
      cy.getByDataTest("stub:message").should("exists");
    });
  } else {
    it("should display tests data", () => {
      cy.get('[data-test="test-details:table-wrapper"] tbody tr').each(($testRow) => {
        const testName = $testRow.find('[data-test="compound-cell:name"]').text();
        const testData = testsWithCoveredMethods[testName];
        if (testData) { // created no all tests in fixture
          // TODO need to refactor to individual tests because log is uninformative
          expect($testRow.find('[data-test="td-row-cell-type"]').text()).to.be.eq(testData.type);
          expect($testRow.find('[data-test="td-row-cell-details.result"]').text()).to.be.eq(testData.expectedStatus);
          expect($testRow.find('[data-test="td-row-cell-coverage.percentage"]').text()).to.be.eq(`${testData.coverage}`);
          expect($testRow.find('[data-test="test-actions:view-curl:id"]').text()).to.be.eq(testData.methodsCovered);
        }
      }).then(($list) => {
        expect($list).to.have.length(testsCount);
      });
    });
  }
};
