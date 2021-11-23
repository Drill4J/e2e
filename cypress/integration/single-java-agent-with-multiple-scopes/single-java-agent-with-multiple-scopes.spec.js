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
import data from "./single-java-agent-with-multiple-scopes.json";

Cypress.env("scopesCount", "3");

context("single-java-agent-with-multiple-scopes", () => {
  before(() => {
    cy.task("removeContainers");
    cy.task("startAdmin");
    cy.login();
    cy.visit(convertUrl("/"));
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
    });
  });

  context("Test2Code part", () => {
    before(() => {
      cy.restoreLocalStorage();
      cy.get('a[data-test="sidebar:link:Test2Code"]').click();
    });

    (new Array(Cypress.env("scopesCount"))).forEach((_, scopeNumber) => {
      context(`Collect coverage and finish ${scopeNumber + 1} scope`, () => {
        it("should collect coverage to scope after autotests executed", () => {
          cy.task("startPetclinicAutoTests", {}, { timeout: 300000 });
          cy.get('[data-test="active-scope-info:scope-coverage"]').should("have.text", `${data.coverage}%`);
        });

        it("should finish scope", () => {
          cy.get('[data-test="active-scope-info:finish-scope-button"]').click();
          cy.get('[data-test="finish-scope-modal:finish-scope-button"]').click();
          cy.get('[data-test="message-panel:text"]').should("have.text", "Scope has been finished");
          cy.get('[data-test="active-scope-info:scope-coverage"]').should("have.text", "0%");
        });
      });
    });

    context("Should display the same coverage for every scope on all scope page", () => {
      before(() => {
        cy.restoreLocalStorage();
        cy.get('a[data-test="active-scope-info:all-scopes-link"]').click();
      });

      (new Array(Cypress.env("scopesCount"))).forEach((_, scopeNumber) => {
        it(`should display ${data.coverage}% for New Scope ${scopeNumber + 1}`, () => {
          cy.contains("table tr", `New Scope ${scopeNumber + 1}`).find('data-test="scopes-list:coverage"')
            .should("contains", data.coverage);
        });
      });
    });
  });
});
