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
// TODO add data tests for tables on risks and t2r pages
import { convertUrl } from "../../utils";
import multiinstancesSingleJavaAgentData from "./multinstances-single-java-agent.json";
import singleJavaAgentData from "./single-java-agent.json";

const dataObject = {
  "multinstances-single-java-agent": multiinstancesSingleJavaAgentData,
  "single-java-agent": singleJavaAgentData,
};
// Multiinstances
// Cypress.env("startApplicationTaskName", "startPetclinicMultinstaces");
// Cypress.env("initialApplicationBuildVersion", "0.1.0");
// Cypress.env("secondApplicationBuildVersion", "0.5.0");
// Cypress.env("startApplicationTestsTaskName", "startPetclinicMultinstacesAutoTests");
// Cypress.env("fixtureFile", "multinstances-single-java-agent");
// Single java agent
Cypress.env("startApplicationTaskName", "startPetclinic");
Cypress.env("initialApplicationBuildVersion", "0.1.0");
Cypress.env("secondApplicationBuildVersion", "0.5.0");
Cypress.env("startApplicationTestsTaskName", "startPetclinicAutoTests");
Cypress.env("fixtureFile", "single-java-agent");

// eslint-disable-next-line import/no-dynamic-require
const data = dataObject[Cypress.env("fixtureFile")];

// TODO rename fixtureFile env
context(Cypress.env("fixtureFile"), () => {
  before(() => {
    cy.task("removeContainers");
    cy.task("startAdmin");
    cy.req("http://localhost:9090/apidocs/index.html?url=./openapi.json");
    cy.task(Cypress.env("startApplicationTaskName"), { build: Cypress.env("initialApplicationBuildVersion") });
  });

  beforeEach(() => {
    cy.login();
    cy.visit(convertUrl("/"));
  });

  context("Admin part", () => {
    it("should register agent", () => {
      cy.get('[data-test="action-column:icons-register"]', { timeout: 30000 }).click();

      cy.get('[data-test="wizard:continue-button"]').click(); // step 2
      cy.get('[data-test="wizard:continue-button"]').click(); // step 3

      cy.get('[data-test="wizard:finishng-button"]').click();

      cy.url({ timeout: 90000 }).should("include", "/dashboard", { timeout: 90000 });
      cy.contains("Online").should("exist");
      cy.contains("Agent has been registered").should("exist"); // need to add data-test on message-panel and assert it here

      cy.get('a[data-test="sidebar:link:Test2Code"]').click();
      cy.get("[data-test=methods-table] tbody tr").should("not.have.length", 0);
    });
  });

  context("Test2Code part", () => {
    beforeEach(() => {
      cy.contains('[data-test="name-column"]', data.agentId)
        .click({ force: true }); // this element is detached from the DOM when tests are run
      cy.getByDataTest("sidebar:link:Test2Code").click();
    });

    context("Initial build", () => {
      const initialBuildData = data.builds["0.1.0"];
      before(() => {
        cy.task(Cypress.env("startApplicationTestsTaskName"), {}, { timeout: 200000 });
      });

      it("finish active scope after the tests finish executing should collect coverage", () => {
        cy.get('[data-test="active-scope-info:scope-coverage"]').should("have.text", `${initialBuildData.coverage}%`);

        cy.get('[data-test="active-scope-info:finish-scope-button"]').click();

        cy.get('[data-test="finish-scope-modal:scope-summary:code-coverage"]').should("have.text", `${initialBuildData.coverage}%`);
        cy.get('[data-test="finish-scope-modal:scope-summary:tests-count"]').should("have.text", `${initialBuildData.testsCount}`);

        cy.get('[data-test="finish-scope-modal:finish-scope-button"]').click();
        cy.get('[data-test="message-panel:text"]').should("have.text", "Scope has been finished");

        cy.get('[data-test="active-build-coverage-info:build-coverage-percentage"]').should("have.text", `${initialBuildData.coverage}%`);
        cy.get('[data-test="active-scope-info:scope-coverage"]').should("have.text", "0%");
      });

      context("Build methods tab", () => {
        it("should display packages data in methods table", () => {
          cy.methodsTableTest(initialBuildData.packages, initialBuildData.packagesCount);
        });

        context("Associated tests pane", () => {
          // TODO need to add tests for classes and methods
          const packagesWithAssociatedTests = Object.entries(initialBuildData.packages)
            .filter(([_, value]) => value.associatedTestsCount !== "n/a");

          packagesWithAssociatedTests.forEach((([packageName, packageData]) => {
            context(`Associate tests for ${packageName} package`, () => {
              beforeEach(() => {
                cy.contains('[data-test="methods-table"] table tbody tr', packageName)
                  .contains('[data-test="coverage-details:associated-tests-count"] a', packageData.associatedTestsCount)
                  .click({ force: true }); // this element is detached from the DOM when tests are run
              });

              it("should display package name", () => {
                cy.getByDataTest("associated-test-pane:package-name").should("have.text", packageName);
              });

              it("should display list with associated tests", () => {
                cy.getByDataTest("associated-tests-list:item:test-name").each(($testName) => { // TODO need it simplify
                  expect(packageData.associatedTests.includes($testName.text())).to.be.true;
                });
              });
            });
          }));
        });
      });

      context("Build tests tab", () => {
        beforeEach(() => {
          cy.get('[data-test="build-overview:tab:build-tests"]').click();
        });

        it("should display tests data in the table", () => {
          cy.testsTableTest(initialBuildData.testsWithCoveredMethods, initialBuildData.testsCount);
        });

        context("Covered methods pane", () => {
          const testsWithCoveredMethods = Object.entries(initialBuildData.testsWithCoveredMethods);
          testsWithCoveredMethods.forEach((([testName, testData]) => {
            context(`Covered methods for ${testName} test`, () => {
              beforeEach(() => {
                cy.contains('[data-test="test-details:table-wrapper"] table tbody tr', testName)
                  .contains('[data-test="test-actions:view-curl:id"] a', testData.methodsCovered)
                  .click({ force: true }); // this element is detached from the DOM when tests are run
              });

              it("should display test name", () => {
                cy.getByDataTest("covered-methods-by-test-sidebar:test-name").should("have.text", testName);
              });

              it("should display list with covered methods", () => {
                // TODO failed because we use virtualization
                // cy.getByDataTest("covered-methods-list:item").should("have.length", testData.methodsCovered);
                cy.getByDataTest("covered-methods-list:item").should("not.have.length", 0);
              });
            });
          }));
        });
      });

      context("Risks", () => {
        it("should display '-' for initial build", () => {
          cy.getByDataTest("action-section:no-value:risks").should("exist");
        });
      });

      context("Tests to run", () => {
        it("should display '-' for initial build", () => {
          cy.getByDataTest("action-section:no-value:tests-to-run").should("exist");
        });
      });
    });

    context("Second build", () => {
      const buildData = data.builds["0.5.0"];
      before(() => {
        cy.task(Cypress.env("startApplicationTaskName"), { build: Cypress.env("secondApplicationBuildVersion") });
      });
      // TODO add check build versions

      context("Risks before tests executed", () => {
        context("Overview page", () => {
          it("should display risks count in the header", () => {
            cy.getByDataTest("action-section:count:risks").should("have.text", buildData.risks.risksBeforeTestsExecuted);
          });
        });

        context("Risks page", () => {
          beforeEach(() => {
            cy.contains('[data-test="action-section:count:risks"]', buildData.risks.risksBeforeTestsExecuted).click();
          });

          it("should display not covered risks count in the page header", () => {
            cy.getByDataTest("risks-list:title").should("contain", buildData.risks.risksBeforeTestsExecuted);
          });

          context("Risks table", () => {
            it("should display all risks count in the header", () => {
              cy.getByDataTest("risks-list:title").should("contain", buildData.risks.risksBeforeTestsExecuted);
            });

            it("should display rows with risks", () => {
              cy.get("table tbody tr").should("have.length", buildData.risks.risksBeforeTestsExecuted);
            });
          });
        });
      });

      context("Tests2run before tests executed", () => {
        context("Overview page", () => {
          it("should display tests2run count in the header", () => {
            cy.getByDataTest("action-section:count:tests-to-run").should("have.text", buildData.testsToRun.tests2RunBeforeTestsExecuted);
          });
        });

        context("Tests to run page", () => {
          beforeEach(() => {
            cy.contains('[data-test="action-section:count:tests-to-run"]', buildData.testsToRun.tests2RunBeforeTestsExecuted).click();
          });

          it("should display suggested tests2run count in the page header", () => {
            cy.getByDataTest("tests-to-run-header:title").should("contain", buildData.testsToRun.tests2RunBeforeTestsExecuted);
          });

          context("Tests to run table", () => {
            it("should display all tests2run count in the header", () => {
              cy.getByDataTest("tests-to-run-list:table-title").should("contain", buildData.testsToRun.tests2RunBeforeTestsExecuted);
            });

            it("should display rows with tests2run", () => {
              cy.get("table tbody tr").should("have.length", buildData.testsToRun.tests2RunBeforeTestsExecuted);
            });
          });
        });
      });

      context("Risks after the collect coverage", () => {
        before(() => {
          cy.task(Cypress.env("startApplicationTestsTaskName"), {}, { timeout: 200000 });
          cy.intercept(`/api/agents/${data.agentId}/plugins/test2code/dispatch-action`).as("finish-active-scope");
        });

        context("Overview page", () => {
          beforeEach(() => {
            cy.get('[data-test="active-scope-info:finish-scope-button"]').click();
            cy.get('[data-test="finish-scope-modal:finish-scope-button"]').click();
          });

          it("should display risks count in the cards", () => {
            cy.getByDataTest("build-methods-card:total-count:NEW").should("have.text", buildData.risks.newRisksCount);
            cy.getByDataTest("build-project-methods:link-button:new:risks")
              .should("contain", buildData.risks.newRisksCountAfterTheTestsExecuted);
            cy.getByDataTest("build-methods-card:total-count:MODIFIED").should("have.text", buildData.risks.modifiedRisksCount);
            cy.getByDataTest("build-project-methods:link-button:modified:risks")
              .should("contain", buildData.risks.modifiedRisksCountAfterTheTestsExecuted);
          });
        });

        context("Risks page", () => {
          beforeEach(() => {
            cy.contains('[data-test="action-section:count:risks"]', buildData.risks.risksCountAfterTheTestsExecuted).click();
          });

          it("should display not covered risks count in the page header", () => {
            cy.getByDataTest("risks-list:title").should("contain", buildData.risks.risksCountAfterTheTestsExecuted);
          });

          context("Risks table", () => {
            it("should display all risks count in the header", () => {
              cy.getByDataTest("risks-list:table-title").should("contain", buildData.risks.risksBeforeTestsExecuted);
            });

            context("should display risks  data", () => {
              Object.entries(buildData.risks.methods).forEach(([riskName, riskData]) => {
                context(`should display data for ${riskName}`, () => {
                  it("should display package and method names", () => {
                    cy.contains("table tbody tr", riskName).should("exist");
                    cy.contains("table tbody tr", riskData.packageName).should("exist");
                  });

                  it("should display risk type", () => {
                    cy.contains("table tbody tr", riskName).contains('[data-test="td-row-cell-type"]', riskData.type).should("exist");
                  });

                  it("should display coverage", () => {
                    cy.contains("table tbody tr", riskName)
                      .contains('[data-test="coverage-cell:coverage"]', riskData.coverage).should("exist");
                  });

                  it("should display associated tests count", () => {
                    cy.contains("table tbody tr", riskName)
                      .contains('[data-test="risks-table:associated-tests-count"]', riskData.associatedTestsCount)
                      .should("exist");
                  });
                });
              });
            });
          });
        });
      });

      context("Tests2run after the collect coverage", () => {
        context("Overview page", () => {
          it("should display suggested tests2run count in the header", () => {
            cy.getByDataTest("action-section:count:tests-to-run")
              .should("have.text", buildData.testsToRun.testsToRunCountAfterTheTestsExecuted);
          });
        });
        context("Tests to run page", () => {
          beforeEach(() => {
            cy.contains('[data-test="action-section:count:tests-to-run"]',
              buildData.testsToRun.testsToRunCountAfterTheTestsExecuted).click();
          });

          it("should display suggested tests2run count in the header", () => {
            cy.getByDataTest("tests-to-run-header:title").should("contain", buildData.testsToRun.testsToRunCountAfterTheTestsExecuted);
          });

          context("Tests2run table", () => {
            Object.entries(buildData.testsToRun.tests).forEach(([testName, testData]) => {
              context(`should display data for ${testName} test`, () => {
                it("should display test name", () => {
                  cy.contains("table tbody tr", testName).should("exist");
                });

                it("should display tests type", () => {
                  cy.contains("table tbody tr", testName).contains('[data-test="td-row-type"]', testData.type).should("exist");
                });

                it("should display coverage percentage", () => {
                  cy.contains("table tbody tr", testName)
                    .contains('[data-test="td-row-cell-coverage.percentage"]', testData.coverage).should("exist");
                });

                it("should display methods covered", () => {
                  cy.contains("table tbody tr", testName)
                    .contains('[data-test="td-row-cell-coverage.methodCount.covered"]', testData.methodsCovered).should("exist");
                });
              });
            });
          });
        });
      });
    });
  });
});
