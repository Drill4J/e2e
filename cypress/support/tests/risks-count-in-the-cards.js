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

// newRisksCount: "0",
// newRisksCountAfterTheTestsExecuted: "0",
// modifiedRisksCount: "0",
// modifiedRisksCountAfterTheTestsExecuted: "0",

Cypress.Commands.add("risksCountInTheCardsTest", { }, (risks) => {
  cy.getByDataTest("build-methods-card:total-count:NEW").should("have.text", risks.newRisksCount);
  if (Number(risks.newRisksCountAfterTheTestsExecuted)) {
    cy.getByDataTest("build-project-methods:link-button:new:risks")
      .should("contain", risks.newRisksCountAfterTheTestsExecuted);
  } else {
    cy.getByDataTest("build-project-methods:link-button:new:risks")
      .should("not.exist");
  }
  cy.getByDataTest("build-methods-card:total-count:MODIFIED").should("have.text", risks.modifiedRisksCount);
  if (Number(risks.newRisksCountAfterTheTestsExecuted)) {
    cy.getByDataTest("build-project-methods:link-button:modified:risks")
      .should("contain", risks.modifiedRisksCountAfterTheTestsExecuted);
  } else {
    cy.getByDataTest("build-project-methods:link-button:modified:risks")
      .should("not.exist");
  }
});
