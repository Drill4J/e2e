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
import { convertUrl } from "../../utils";
import data from "./microservice-java-agents.json";

Cypress.env("scopesCount", "3");

context("mcr-java-agents-with-multiple-scopes", () => {
  before(() => {
    cy.login();
    cy.visit(convertUrl("/"));
    cy.task("startPetclinicMicroservice", { build: "0.1.0" }, { timeout: 200000 });
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  context("Admin part", () => {
    it("should register group", () => {
      cy.contains('[data-test="action-column:icons-register"]', data.agentsCount, { timeout: 45000 })
        .click({ force: true }); // wait for agent initialization

      cy.get('[data-test="wizard:continue-button"]').click();
      cy.get('[data-test="wizard:continue-button"]').click();

      cy.intercept("PATCH", `/api/groups/${data.groupId}`).as("registerGroup");

      cy.get('[data-test="wizard:finishng-button"]').click();

      cy.wait("@registerGroup", { timeout: 120000 });

      cy.contains(`Agents ${data.agentsCount}`).should("exist");
    });
  });

  context("Test2Code part", () => {
    before(() => {
      cy.restoreLocalStorage();
      cy.get('a[data-test="sidebar:link:Test2Code"]').click();
    });

    new Array(Number(Cypress.env("scopesCount"))).fill(1).forEach((_, scopeNumber) => {
      context(`Collect coverage and finish ${scopeNumber + 1} scope`, () => {
        before(() => {
          cy.task("startPetclinicMicroserviceAutoTests", {}, { timeout: 300000 });
        });

        it("should finish scope", () => {
          cy.intercept("POST", `/api/groups/${data.groupId}/plugins/test2code/dispatch-action`).as("finish-all-scopes");

          cy.getByDataTest("test-to-code-plugin:list-row").should("have.length", data.agentsCount);
          // wait for data load and rendrer table. otherwise, the menu may close due to the re-renderer
          cy.get('[data-test="menu:icon:test-to-code-plugin:header-cell:actions"]').click();
          cy.get('[data-test="menu:item:finish-all-scopes"]').click();
          cy.get('[data-test="finish-all-scopes-modal:submit-button"]').click();

          cy.wait("@finish-all-scopes", { timeout: 30000 });

          cy.getByDataTest("system-alert:title").should("exist");
        });
      });
    });

    context("Should display the same coverage for every scope on all scope page", () => {
      Object.entries(data.agentsWithCoverage).forEach(([serviceName, serviceData]) => {
        context(`${serviceName}`, () => {
          before(() => {
            cy.restoreLocalStorage();
            cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
            cy.getByDataTest("sidebar:link:Test2Code").click({ force: true });
            cy.get('a[data-test="active-scope-info:all-scopes-link"]').click();
          });

          after(() => {
            cy.restoreLocalStorage();
            cy.getByDataTest("crumb:agents").click();
            cy.contains('[data-test="name-column"]', data.groupId).click({ force: true });
            cy.get('[data-test="sidebar:link:Test2Code"]').click();
          });

          new Array(Number(Cypress.env("scopesCount"))).fill(1).forEach((_, scopeNumber) => {
            it(`should display ${serviceData.coverage}% for New Scope ${scopeNumber + 1}`, () => {
              cy.contains("table tr", `New Scope ${scopeNumber + 1}`).find('[data-test="scopes-list:coverage"]')
                .should("contain", serviceData.coverage);
            });
          });
        });
      });
    });
  });
});
