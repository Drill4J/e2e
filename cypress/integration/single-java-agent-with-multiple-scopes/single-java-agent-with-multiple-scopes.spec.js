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
    Cypress.LocalStorage.clear = () => {
        console.log("Clearing local storage")
    };

    cy.visit(convertUrl("/"));
    cy.contains("button", "Continue as a guest (with admin rights)").click();
    cy.task("startPetclinic", { build: "0.1.0" }, { timeout: 150000 });
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
    (new Array(+Cypress.env("scopesCount")).fill(1)).forEach((_, scopeNumber) => {
      context(`Collect coverage and finish ${scopeNumber + 1} scope`, () => {
        after(() => {
          cy.task("stopPetclinic"); // clear petclinic cache
          cy.task("startPetclinic", { build: "0.1.0" }, { timeout: 150000 });
        });
        it("should collect coverage to scope after autotests executed", () => {
          cy.task("startPetclinicAutoTests", {
            autotestsParams: ":junit4:test -Djunit4Version=4.13.2 --tests ui.standalone.StandaloneChromeUITest",
            autotestsImage: "drill4j/petclinic-autotests-execute:0.3.2",
            withProxy: false,
          }, { timeout: 300000 });
          cy.task("startPetclinicAutoTests", {
            autotestsParams: ":junit4:test -Djunit4Version=4.13.2 --tests api.standalone.StandaloneApiTest",
            autotestsImage: "drill4j/petclinic-autotests-execute:0.3.2",
            withProxy: false,
          }, { timeout: 300000 });
          cy.get('[data-test="active-scope-info:scope-coverage"]').should("have.text", `${data.coverage}%`);
        });

        it("should finish all sessions", () => {
          cy.get('[data-test="active-scope-info:sessions-management-link"]').click();
          cy.get('[data-test="management-active-sessions:finish-all"]').click();
          cy.get('[data-test="operation-action-warning:yes-button"]').click();
          cy.get('[data-test="modal:close-button"]').click();
        });

        it("should finish scope", () => {
          cy.get('[data-test="active-scope-info:finish-scope-button"]').click();
          cy.get('[data-test="finish-scope-modal:finish-scope-button"]').click();
//          cy.get('[data-test="system-alert:title"]').should("have.text", "Scope has been finished");
        });

        it("should display 0% coverage in active scope block", () => {
          cy.get('[data-test="active-scope-info:scope-coverage"]').should("have.text", "0%");
        });
      });
    });

    context("Should display the same coverage for every scope on all scope page", () => {
      before(() => {
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
        context("Should display tests table", () => {
          before(() => {
            cy.contains('a[data-test="scopes-list:scope-name"]', `New Scope ${scopeNumber + 1}`).click();
            cy.contains("a", "scope tests", { matchCase: false }).click();
          });

          Object.entries(data.testsWithCoveredMethods).forEach(([testName, testData]) => {
            context(`${testName} row`, () => {
              it(`should display ${testName} name`, () => {
                cy.contains("table tbody tr", testName)
                  .find('[data-test="compound-cell:name"]').should("have.text", testName);
              });

              it(`should display ${testName} type`, () => {
                cy.contains("table tbody tr", testName)
                  .find('[data-test="td-row-cell-type"]').should("have.text", testData.type);
              });

              it(`should display ${testName} status`, () => {
                cy.contains("table tbody tr", testName)
                  .find('[data-test="td-row-cell-details.result"]').should("have.text", testData.expectedStatus);
              });

              it(`should display ${testName} coverage`, () => {
                cy.contains("table tbody tr", testName)
                  .find('[data-test="td-row-cell-coverage.percentage"]').should("have.text", testData.coverage);
              });

              it(`should display ${testName} methods covered count`, () => {
                cy.contains("table tbody tr", testName)
                  .find('[data-test="test-actions:view-curl:id"]').should("have.text", testData.methodsCovered);
              });
            });
          });

//          Object.entries(data.testsWithCoveredMethods).forEach((([testName, testData]) => {
//            context(`${testName} covered methods`, () => {
//              it(`should open modal for ${testName}`, () => {
//                cy.contains('[data-test="test-details:table-wrapper"] table tbody tr', testName)
//                  .contains('[data-test="test-actions:view-curl:id"] a', testData.methodsCovered)
//                  .click({ force: true }); // this element is detached from the DOM when tests are run
//              });
//
//              it("should enable input in name column", () => {
//                cy.get("#modal [data-test='search-input:enable-input']").click();
//                cy.getByDataTest("name:search-input").should("exist");
//              });
//
//              testData.coveredMethods.forEach(({ name, type, coverage }) => {
//                context(`${name} method`, () => {
//                  it(`should type ${name} in search`, () => {
//                    cy.getByDataTest("name:search-input").type(name);
//                  });
//
//                  it(`should display ${name} in name column`, () => {
//                    cy.getByDataTest("covered-methods-modal:list:method:name").should("contain", name);
//                  });
//
//                  it("should display method type", () => {
//                    cy.contains('[data-test="coverage-methods:method:type"]', type, { matchCase: false }).should("exist");
//                  });
//
//                  it("should display method coverage", () => {
//                    cy.getByDataTest("coverage-methods:method:coverage").should("contain", coverage);
//                  });
//
//                  it("should clear search", () => {
//                    cy.getByDataTest("search-input:clear-icon").click();
//                  });
//                });
//              });
//
//              context("Close modal", () => {
//                it("should close modal", () => {
//                  cy.getByDataTest("modal:close-button").click();
//                });
//              });
//            });
//          }));

          context("all scopes page", () => {
            it("should open all scopes page", () => {
              cy.contains("a", "All scopes", { matchCase: false }).click();
              // cy.url().should("contain", "/agents/dev-pet-standalone/builds/0.1.0/dashboard/test2code/scopes");
            });
          });
        });
      });
    });
  });
});
