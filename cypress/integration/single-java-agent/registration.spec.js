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

import data from "../../fixtures/single-java-agent/registration.json";

context("_", () => {
  it("Register agent", () => {
    cy.get('[data-test="action-column:icons-register"]').click();

    cy.get('[data-test="wizard:continue-button"]').click(); // step 2
    cy.get('[data-test="wizard:continue-button"]').click(); // step 3

    cy.intercept("PATCH", `/api/agents/${data.id}`).as("registerAgent");
    cy.get('[data-test="wizard:finishng-button"]').click();
    cy.wait("@registerAgent");

    cy.url().should("include", "/dashboard");
    cy.contains("Online").should("exist");

    cy.get('a[data-test="sidebar:link:Test2Code"]').click();
    cy.get("[data-test=methods-table] tbody tr").should("not.have.length", 0);
    // need to add data-test on message-panel and assert it here
  });
});
