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

Cypress.Commands.add("finishAllScopes", (groupId, agentsCount) => {
  cy.intercept("POST", `/api/groups/${groupId}/plugins/test2code/dispatch-action`).as("finish-all-scopes");

  // cy.getByDataTest("test-to-code-plugin:list-row").should("have.length", agentsCount);
  // wait for data load and rendrer table. otherwise, the menu may close due to the re-renderer
  cy.get('[data-test="menu:icon:test-to-code-plugin:header-cell:actions"]').click();
  cy.get('[data-test="menu:item:finish-all-scopes"]').click();
  cy.get('[data-test="finish-all-scopes-modal:submit-button"]').click();

  cy.wait("@finish-all-scopes", { timeout: 30000 });

  cy.getByDataTest("system-alert:title").should("exist");
});
