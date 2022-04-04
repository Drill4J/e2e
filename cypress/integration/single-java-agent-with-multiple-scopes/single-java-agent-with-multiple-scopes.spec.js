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
import data from "./single-java-agent.json";

// Cypress.env("scopesCount", "3");

const scopesCount = Cypress.env("scopesCount") || "3";

context("single-java-agent-with-multiple-scopes", () => {
  context("Admin part", () => {
    before(() => {
      cy.task("startPetclinic", { build: "0.1.0" }, { timeout: 150000 });
    });

    it("should login", () => {
      cy.login();

      Cypress.LocalStorage.clear = () => {
        console.log("Clearing local storage")
      };
    });

    it('should open "Add agent" panel', () => {
      cy.getByDataTest("no-agent-registered-stub:open-add-agent-panel").click();

      cy.contains('[data-test="panel"]', "Add Agent", { matchCase: false }).should("exist");
    });

    it("should register agent", () => {
      cy.registerAgent(data.agentId);
    });
  });

  context("Test2Code part", () => {
    it("should open Test2Code plugin page", () => {
      cy.contains('[data-test="select-agent-panel:agent-row"]', data.agentId).click();
      cy.getByDataTest("navigation:open-test2code-plugin").click();

      cy.contains('[data-test="coverage-plugin-header:plugin-name"]', "Test2Code", { matchCase: false }).should("exist");
    });
    (new Array(+scopesCount).fill(1)).forEach((_, scopeNumber) => {
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

        it("should finish scope", () => {
          cy.finishScope(data.coverage, data.testsCount);
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

      (new Array(+scopesCount).fill(1)).forEach((_, scopeNumber) => {
        it(`should display ${data.coverage}% for New Scope ${scopeNumber + 1}`, () => {
          cy.contains("table tr", `New Scope ${scopeNumber + 1}`).find('[data-test="scopes-list:coverage"]')
            .should("contain", data.coverage);
        });
      });
    });
    (new Array(+scopesCount).fill(1)).forEach((_, scopeNumber) => {
      context(`New Scope ${scopeNumber + 1}`, () => {
      // we on all scopes page
        context("Should display tests table", () => {
          before(() => {
            cy.contains("table tr", `New Scope ${scopeNumber + 1}`).click();
            cy.contains("div", "scope tests", { matchCase: false }).click();
          });

          Object.entries(data.testsWithCoveredMethods).forEach(([testName, testData]) => {
            context(`${testName} row`, () => {
              it(`should display ${testName} name`, () => {
                cy.contains("table tbody tr", testName)
                  .find('[data-test="td-row-cell-overview.details.name"]').should("have.text", testName);
              });

              it(`should display ${testName} type`, () => {
                cy.contains("table tbody tr", testName)
                  .find('[data-test="td-row-cell-type"]').should("have.text", testData.type);
              });

              it(`should display ${testName} status`, () => {
                cy.contains("table tbody tr", testName)
                  .find('[data-test="td-row-cell-overview.result"]').should("have.text", testData.expectedStatus);
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
              cy.getByDataTest("crumb:scopes").click();
              cy.url().should("contain", "/agents/dev-pet-standalone/plugins/test2code/builds/0.1.0/scopes");
            });
          });
        });
      });
    });
  });
});
