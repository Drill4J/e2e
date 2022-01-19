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

// not required pass every package data

// "org/springframework/samples/petclinic": {
//     "methodsTotal": "2",
//     "coverage": "0",
//     "methodsCovered": "0",
//     "associatedTestsCount": "n/a" | "3"
// },
// packagesCount: "3"

Cypress.Commands.add("methodsTableTest", { }, (packages, packagesCount) => {
  Object.entries(packages).forEach(([packageName, packageData]) => {
    cy.contains('[data-test="methods-table"] table tbody tr', packageName)
      .find('[data-test="name-cell:content:package"]').should("have.text", packageName);

    cy.contains('[data-test="methods-table"] table tbody tr', packageName)
      .find('[data-test="td-row-cell-coverage"]').should("contain", packageData.coverage);

    cy.contains('[data-test="methods-table"] table tbody tr', packageName)
      .find('[data-test="td-row-cell-totalMethodsCount"]').should("have.text", packageData.methodsTotal);

    cy.contains('[data-test="methods-table"] table tbody tr', packageName)
      .find('[data-test="td-row-cell-coveredMethodsCount"]').should("have.text", packageData.methodsCovered);

    cy.contains('[data-test="methods-table"] table tbody tr', packageName)
      .find('[data-test="coverage-details:associated-tests-count"]').should("have.text", packageData.associatedTestsCount);

    cy.getByDataTest("name-cell:content:package").should("have.length", packagesCount);
  });
});
