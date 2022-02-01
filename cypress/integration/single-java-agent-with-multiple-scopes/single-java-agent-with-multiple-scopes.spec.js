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
import data from "./single-java-agent.json";

Cypress.env("scopesCount", "1");

context("single-java-agent-with-multiple-scopes", () => {
  before(() => {
    cy.visit(convertUrl("/"));
    cy.getByDataTest("login-button:continue-as-guest").click();
    cy.task("startPetclinic", { build: "0.1.0" }, { timeout: 150000 });
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  context("Admin part", () => {
    it("should register agent", () => {
      cy.get('[data-test="action-column:icons-register"]', { timeout: 30000 }).click();

      cy.get('[data-test="wizard:continue-button"]').click(); // step 2
      cy.get('[data-test="wizard:continue-button"]').click(); // step 3

      cy.get('[data-test="wizard:finishng-button"]').click();

      cy.url({ timeout: 90000 }).should("include", "/dashboard", { timeout: 90000 });
      cy.get('a[data-test="sidebar:link:Test2Code"]').click();
    });
  });

  context("Test2Code part", () => {
    (new Array(+Cypress.env("scopesCount")).fill(1)).forEach((_, scopeNumber) => {
      context(`Collect coverage and finish ${scopeNumber + 1} scope`, () => {
        after(() => {
          cy.restoreLocalStorage();
          cy.task("stopPetclinic"); // clear petclinic cache
          cy.task("startPetclinic", { build: "0.1.0" }, { timeout: 150000 });
        });
        it("should collect coverage to scope after autotests executed", () => {
          cy.task("startPetclinicAutoTests", {
            autotestsParams: ":junit4:test -Djunit4Version=4.13.2 --tests *.standalone.*",
            autotestsImage: "drill4j/petclinic-autotests-execute:0.3.1",
          }, { timeout: 300000 });
          cy.get('[data-test="active-scope-info:scope-coverage"]').should("have.text", `${data.coverage}%`);
        });

        it("should finish scope", () => {
          cy.get('[data-test="active-scope-info:finish-scope-button"]').click();
          cy.get('[data-test="finish-scope-modal:finish-scope-button"]').click();
          cy.get('[data-test="system-alert:title"]').should("have.text", "Scope has been finished");
        });

        it("should display 0% coverage in active scope block", () => {
          cy.get('[data-test="active-scope-info:scope-coverage"]').should("have.text", "0%");
        });
      });
    });

    context("Should display the same coverage for every scope on all scope page", () => {
      before(() => {
        cy.restoreLocalStorage();
        cy.get('a[data-test="active-scope-info:all-scopes-link"]').click();
      });

      (new Array(+Cypress.env("scopesCount")).fill(1)).forEach((_, scopeNumber) => {
        it(`should display ${data.coverage}% for New Scope ${scopeNumber + 1}`, () => {
          cy.contains("table tr", `New Scope ${scopeNumber + 1}`).find('[data-test="scopes-list:coverage"]')
            .should("contain", data.coverage);
        });
      });
    });
    (new Array(+Cypress.env("scopesCount")).fill(1)).forEach((_, scopeNumber) => {
      context(`New Scope ${scopeNumber + 1}`, () => {
      // we on all scopes page
        context("Should display the same coverage in tests table", () => {
          before(() => {
            cy.restoreLocalStorage();
            cy.contains("table tr", `New Scope ${scopeNumber + 1}`).click();
            cy.contains("div", "scope tests", { matchCase: false }).click();
          });

          it("should display tests data in the table", () => {
            cy.testsTableTest(data.testsWithCoveredMethods, data.testsCount);
            cy.testsTableTest(data.testsWithoutCoveredMethods, data.testsCount);
          });

          it('should display "Covered methods pane" for tests', () => {
            cy.coveredMethodsPaneWithMethodsCheckTest(data.testsWithCoveredMethods);
          });

          it("should open all scopes page", () => {
            cy.getByDataTest("crumb:scopes").click();
            cy.url().should("contain", "/agents/dev-pet-standalone/builds/0.1.0/dashboard/test2code/scopes");
          });
        });
      });
    });
  });
});
