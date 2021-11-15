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
//     "[engine:testng]/[class:api.standalone.StandaloneApiTest]/[method:testNgGetOwner4EditPage()]",
//     "[engine:testng]/[class:api.standalone.StandaloneApiTest]/[method:testNgGetOwner4InfoPage()]"
//     ]
// }

Cypress.Commands.add("associatedTestsPaneTest", { }, (packagesWithAssociatedTests) => {
  Object.entries(packagesWithAssociatedTests).forEach((([packageName, packageData]) => {
    cy.contains('[data-test="methods-table"] table tbody tr', packageName)
      .contains('[data-test="coverage-details:associated-tests-count"] a', packageData.associatedTestsCount)
      .click({ force: true }); // this element is detached from the DOM when tests are run

    cy.getByDataTest("associated-test-pane:package-name").should("have.text", packageName);

    cy.getByDataTest("associated-tests-list:item:test-name").each(($testName) => { // TODO need it simplify
      expect(packageData.associatedTests.includes($testName.text())).to.be.true;
    });

    cy.getByDataTest("modal:close-button").click();
  }));
});
