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
Cypress.Commands.add("registerGroup", (groupId, agentsCount) => {
  cy.contains('[data-test="add-agent-panel:group-row"]', groupId)
    .find('button[data-test="add-agent-panel:group-row:register"]').click();

  cy.getByDataTest("wizard:next-step").click();
  cy.getByDataTest("wizard:next-step").click();
  cy.getByDataTest("wizard:finish").click();

  cy.contains('[data-test="panel"]', "select agent", { matchCase: false }).should("exist");
  cy.get('[data-test="select-agent-panel:registering-agent-row"]').should("exist", agentsCount);

  cy.get('[data-test="select-agent-panel:agent-row"]', { timeout: 90000 }).should("have.length", agentsCount);
});
