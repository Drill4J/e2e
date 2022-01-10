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

// item with example of required data
// "org/springframework/samples/petclinic/model": {
//     "associatedTestsCount": "2",
//     "associatedTests": [
//     {
//               "name": "testNgGetOwner4EditPage()",
//               "path": "api.standalone.StandaloneApiTest"
//     }]
// }

Cypress.Commands.add("associatedTestsPaneTest", { }, (packagesWithAssociatedTests) => {
  Object.entries(packagesWithAssociatedTests).forEach((([packageName, packageData]) => {
    cy.contains('[data-test="methods-table"] table tbody tr', packageName)
      .contains('[data-test="coverage-details:associated-tests-count"] a', packageData.associatedTestsCount)
      .click({ force: true }); // this element is detached from the DOM when tests are run

    cy.getByDataTest("associated-tests:package-name").should("have.text", packageName);

    packageData.associatedTests.forEach(({ name = "", path = "" }) => {
      cy.contains('[data-test="associated-tests-table"] div[role="row"]', name)
        .find('[data-test="associated-tests:test:name"]').should("have.text", name);

      cy.contains('[data-test="associated-tests-table"] div[role="row"]', name)
        .find('[data-test="associated-tests:test:path"]').should("have.text", path);
    });

    cy.getByDataTest("popup:close-button").click();
  }));
});
