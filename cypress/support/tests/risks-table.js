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

// "methodName": {
//     "packageName": "org/springframework/samples/petclinic/vets/model/Vet",
//     "type": "Modified",
//     "coverage": "100",
//     "associatedTestsCount": "1"
// }

Cypress.Commands.add("risksTableTest", { }, (riskMethods) => {
  Object.entries(riskMethods).forEach(([riskName, riskData]) => {
    cy.contains("table tbody tr", riskName).should("exist");
    cy.contains("table tbody tr", riskData.packageName).should("exist");

    cy.contains("table tbody tr", riskName).contains('[data-test="td-row-cell-type"]', riskData.type).should("exist");

    cy.contains("table tbody tr", riskName)
      .contains('[data-test="coverage-cell:coverage"]', riskData.coverage).should("exist");

    cy.contains("table tbody tr", riskName)
      .contains('[data-test="risks-table:associated-tests-count"]', riskData.associatedTestsCount)
      .should("exist");
  });
});
