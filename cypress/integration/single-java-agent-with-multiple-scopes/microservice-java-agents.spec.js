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
import data from "./microservice-java-agents.json";

Cypress.env("scopesCount", "3");

context("mcr-java-agents-with-multiple-scopes", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  context("Admin part", () => {
    before(() => {
      cy.task("startPetclinicMicroservice", { build: "0.1.0" }, { timeout: 200000 });
    });

    it("should login", () => {
      cy.login();
    });

    it('should open "Add agent" panel', () => {
      cy.getByDataTest("no-agent-registered-stub:open-add-agent-panel").click();

      cy.contains('[data-test="panel"]', "Add Agent", { matchCase: false }).should("exist");
    });

    it("should register group", () => {
      registerGroup(data.groupId, data.agentsCount);
    });
  });

  context("Test2Code part", () => {
    it("should open Test2Code plugin page", () => {
      cy.contains('[data-test="select-agent-panel:group-row"]', data.groupId).click();
      cy.getByDataTest("navigation:open-test2code-plugin").click();

      cy.contains('[data-test="coverage-plugin-header:plugin-name"]', "Test2Code", { matchCase: false }).should("exist");
    });

    new Array(Number(Cypress.env("scopesCount"))).fill(1).forEach((_, scopeNumber) => {
      context(`Collect coverage and finish ${scopeNumber + 1} scope`, () => {
        before(() => {
          cy.task("startPetclinicMicroserviceAutoTests", {}, { timeout: 300000 });
        });

        it("should finish scope", () => {
          finishAllScopes(data.groupId, data.agentsCount);
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
