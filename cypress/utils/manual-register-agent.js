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
import { AGENT_NAME } from "../fixtures/constants";
import { convertUrl } from "./covert-url";

export const manualRegisterAgent = (agentId = AGENT_NAME) => {
  cy.get('[data-test="action-column:icons-register"]').click();
  cy.url().then((url) => {
    expect(url).to.eq(convertUrl(`/agents/${agentId}/registration`));
  });

  cy.get('[data-test="wizard:continue-button"]').click();
  cy.get('[data-test="wizard:continue-button"]').click();

  cy.intercept("PATCH", `/api/agents/${agentId}`, (req) => {
    req.continue((res) => {
      expect(res.statusCode).to.equal(200);
    });
  }).as("registration");
  cy.get('[data-test="wizard:finishng-button"]').click();
  cy.wait(["@registration"]);
};
