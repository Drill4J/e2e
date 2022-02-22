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
import { JAVA_GROUP_NAME } from "../../fixtures/constants";
import { convertUrl } from "../../utils";
import testNg from "./java-mcr.json";
import { registerGroup } from "../../utils/register-group";

Cypress.env("fixtureFile", "microservice-java-agents-testNG");

const dataObject = {
  "microservice-java-agents-testNG": testNg,
};

const data = dataObject[Cypress.env("fixtureFile")];

context(Cypress.env("fixtureFile"), () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  context("Admin part", () => {
    it("should login", () => {
      cy.visit(convertUrl("/"));
      cy.getByDataTest("login-button:continue-as-guest").click();
      cy.url().should("eq", convertUrl("/"));
      cy.task("startPetclinicMicroservice", { build: "0.1.0" }, { timeout: 300000 });
    });

    it('should open "Add agent" panel', () => {
      cy.getByDataTest("no-agent-registered-stub:open-add-agent-panel").click();

      cy.contains('[data-test="panel"]', "Add Agent", { matchCase: false }).should("exist");
    });

    it("should register group", () => {
      registerGroup(data.groupId, 4);
    });
  });

  context("Test to code", () => {
    context("Initial builds", () => {
      const initialBuildData = data.builds["0.1.0"];

      it("should open Test2Code plugin page", () => {
        cy.contains('[data-test="select-agent-panel:group-row"]', data.groupId).click();
        cy.getByDataTest("navigation:open-test2code-plugin").click();

        cy.contains("Test2Code", { matchCase: false }).should("exist");
      });

      it("should finishe all scopes after the tests finished executing should", () => {
        cy.task("startPetclinicMicroserviceAutoTests", {}, { timeout: 450000 });
        cy.intercept("POST", `/api/groups/${data.groupId}/plugins/test2code/dispatch-action`).as("finish-all-scopes");

        // cy.getByDataTest("test-to-code-plugin:list-row").should("have.length", data.agentsCount);
        // wait for data load and rendrer table. otherwise, the menu may close due to the re-renderer
        cy.get('[data-test="menu:icon:test-to-code-plugin:header-cell:actions"]').click();
        cy.get('[data-test="menu:item:finish-all-scopes"]').click();
        cy.get('[data-test="finish-all-scopes-modal:submit-button"]').click();

        cy.wait("@finish-all-scopes", { timeout: 30000 });

        cy.getByDataTest("system-alert:title").should("exist");
      });

      context("_", () => { // need to save order of execution
        it("should display the summary coverage percentage after run tests", () => {
          cy.get('[data-test="dashboard-header-cell:coverage:value"]').should("contain", initialBuildData.summary.coverage);
        });
      });

      it("should display the coverage percentage for every service after run tests", () => {
        Object.entries(initialBuildData.agents).forEach(([serviceName, serviceData]) => {
          cy.contains('[data-test="test-to-code-plugin:list-row"]', serviceName)
            .find('[data-test="dashboard-coverage-cell:value"]')
            .should("contain", serviceData.coverage);
        });
      });

      context("Check every service data in the agent t2c page", () => {
        Object.entries(initialBuildData.agents).forEach(([serviceName, serviceData]) => {
          context(`Check ${serviceName} service`, () => {
            it("should open group test2code page", () => {
              openTest2CodePluginForGroup();
              cy.contains("Test2Code", { matchCase: false }).should("exist");
              cy.contains(`Online Agents ${data.agentsCount}`, { matchCase: false }).should("exist");
            });
            it(`should open ${serviceName} test2code page`, () => {
              cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
              cy.getByDataTest("navigation:open-test2code-plugin").click();

              cy.contains("Test2Code", { matchCase: false }).should("exist");
            });

            context("Build methods tab", () => {
              it("should display packages table", () => {
                cy.methodsTableTest(serviceData.packages, serviceData.packagesCount);
              });

              it('should display "Associated tests" pane with tests data', () => {
                cy.associatedTestsPaneTest(serviceData.packagesWithAssociatedTests);
              });
            });

            context("Build tests tab", () => {
              before(() => {
                cy.restoreLocalStorage();
                cy.getByDataTest("build-overview:tab:build-tests").click();
              });

              it("should display tests table", () => {
                cy.testsTableTest(serviceData.testsWithCoveredMethods, serviceData.testsCount);
                cy.testsTableTest(serviceData.testsWithoutCoveredMethods, serviceData.testsCount);
              });

              it('should display "Covered methods" pane with methods data', () => {
                cy.coveredMethodsPaneTest(serviceData.testsWithCoveredMethods);
              });
            });

            context("Initial risks", () => {
              it("should display '-' in the header", () => {
                cy.getByDataTest("action-section:no-value:risks").should("exist");
              });
            });

            context("Initial tests to run", () => {
              it("should display '-' in the header", () => {
                cy.getByDataTest("action-section:no-value:tests-to-run").should("exist");
              });
            });
          });
        });
      });
    });

    context("Second build", () => {
      const secondBuildData = data.builds["0.2.0"];
      before(() => {
        cy.restoreLocalStorage();
        cy.task("stopPetclinicMicroservice", {}, { timeout: 120000 });
        cy.task("startPetclinicMicroservice", { build: "0.2.0" }, { timeout: 200000 });
      });

      context("Before tests executed", () => {
        context("Dashboard", () => {
          before(() => {
            cy.restoreLocalStorage();
            cy.getByDataTest("navigation:open-dashboard").click();
          });

          after(() => {
            cy.restoreLocalStorage();
            cy.getByDataTest("navigation:open-test2code-plugin").click();
          });

          it("should display 0% in coverage block", () => {
            cy.getByDataTest("dashboard:build-coverage:main-info", {timeout: 60000}).should("contain", "0%");
          });

          it("should display 0 tests count in tests block", () => {
            cy.getByDataTest("dashboard:tests:main-info", {timeout: 60000}).should("have.text", "0");
          });

          it("should display 0 scopes count in tests block", () => {
            cy.getByDataTest("dashboard:tests:additional-info", {timeout: 60000}).should("contain", "0");
          });

          it(`should display ${secondBuildData.summary.risksCountBeforeTestsExecuted} risks count in risks block`, () => {
            cy.getByDataTest("dashboard:risks:main-info", {timeout: 60000})
            .should("have.text", secondBuildData.summary.risksCountBeforeTestsExecuted);
          });

          it(`should display ${secondBuildData.summary.tests2RunBeforeTestsExecuted} tests2run count in tests2run block`, () => {
            cy.getByDataTest("dashboard:tests-to-run:main-info", {timeout: 60000})
            .should("have.text", secondBuildData.summary.tests2RunBeforeTestsExecuted);
          });
        });

        context("Risks", () => {
          context("Service group page", () => {
            it("should display summary risks count in the header", () => {
              cy.getByDataTest("dashboard-header-cell:risks:value")
                .should("have.text", secondBuildData.summary.risksCountBeforeTestsExecuted);
            });

            it("should display risks count for every service", () => {
              Object.entries(secondBuildData.agents).forEach(([serviceName, serviceData]) => {
                cy.contains('[data-test="test-to-code-plugin:list-row"]', serviceName)
                  .find('[data-test="dashboard-cell:value:risks"]')
                  .should("have.text", serviceData.risksCountBeforeTestsExecuted);
              });
            });
          });

          context("Agent page", () => {
            context("Agents with risks", () => {
              Object.entries(secondBuildData.agentsWithRisks).forEach(([serviceName, serviceData]) => {
                context(`Check ${serviceName} service`, () => {
                  it("should open group test2code page", () => {
                    openTest2CodePluginForGroup();
                    cy.contains("Test2Code", { matchCase: false }).should("exist");
                    cy.contains(`Online Agents ${data.agentsCount}`, { matchCase: false }).should("exist");
                  });
                  it(`should open ${serviceName} test2code page`, () => {
                    cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                    cy.getByDataTest("navigation:open-test2code-plugin").click();

                    cy.contains("Test2Code", { matchCase: false }).should("exist");
                  });

                  context("Overview page", () => {
                    it("should display risks count in the header", () => {
                      cy.getByDataTest("action-section:count:risks").should("have.text", serviceData.risks.risksCountBeforeTestsExecuted);
                    });

                    context("Risks page", () => {
                      before(() => {
                        cy.restoreLocalStorage();
                        cy.contains('[data-test="action-section:count:risks"]', serviceData.risks.risksCountBeforeTestsExecuted).click();
                      });

                      it("should display not covered risks count in the page header", () => {
                        cy.getByDataTest("risks-list:title").should("contain", serviceData.risks.risksCountBeforeTestsExecuted);
                      });

                      context("Risks table", () => {
                        it("should display all risks count in the header", () => {
                          cy.getByDataTest("risks-list:title").should("contain", serviceData.risks.risksCountBeforeTestsExecuted);
                        });

                        it("should display rows with risks", () => {
                          cy.get("table tbody tr").should("have.length", serviceData.risks.risksCountBeforeTestsExecuted);
                        });
                      });
                    });
                  });
                });
              });
            });
            context("Agents without risks", () => {
              secondBuildData.agentsWithoutRisks.forEach((serviceName) => {
                it("should open group test2code page", () => {
                  openTest2CodePluginForGroup();
                  cy.contains("Test2Code", { matchCase: false }).should("exist");
                  cy.contains(`Online Agents ${data.agentsCount}`, { matchCase: false }).should("exist");
                });
                it(`should open ${serviceName} test2code page`, () => {
                  cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                  cy.getByDataTest("navigation:open-test2code-plugin").click();

                  cy.contains("Test2Code", { matchCase: false }).should("exist");
                });

                context(`Check ${serviceName} service`, () => {
                  context("Overview page", () => {
                    it('should display "-" in the header', () => {
                      cy.getByDataTest("action-section:no-value:risks").should("exist");
                    });
                  });
                });
              });
            });
          });
        });

        context("Tests2run", () => {
          context("Service group page", () => {
            it("should display summary Tests2run count", () => {
              cy.getByDataTest("dashboard-header-cell:tests-to-run:value").should("have.text", secondBuildData.summary.tests2RunBeforeTestsExecuted);
            });

            it("should display Tests2run count for every service", () => {
              Object.entries(secondBuildData.agents).forEach(([serviceName, serviceData]) => {
                cy.contains('[data-test="test-to-code-plugin:list-row"]', serviceName)
                  .find('[data-test="dashboard-cell:value:tests-to-run"]')
                  .should("have.text", serviceData.tests2RunBeforeTestsExecuted);
              });
            });
          });

          context("Agent page", () => {
            context("Agents with tests2run", () => {
              Object.entries(secondBuildData.agentsWithTests2Run).forEach(([serviceName, serviceData]) => {
                context(`Check ${serviceName} service`, () => {
                  it("should open group test2code page", () => {
                    openTest2CodePluginForGroup();
                    cy.contains("Test2Code", { matchCase: false }).should("exist");
                    cy.contains(`Online Agents ${data.agentsCount}`, { matchCase: false }).should("exist");
                  });
                  it(`should open ${serviceName} test2code page`, () => {
                    cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                    cy.getByDataTest("navigation:open-test2code-plugin").click();

                    cy.contains("Test2Code", { matchCase: false }).should("exist");
                  });

                  context("Overview page", () => {
                    it("should display tests to run count in the header", () => {
                      cy.getByDataTest("action-section:count:tests-to-run").should("have.text", serviceData.testsToRun.tests2RunBeforeTestsExecuted);
                    });
                  });

                  context("Tests to run page", () => {
                    before(() => {
                      cy.restoreLocalStorage();
                      cy.contains('[data-test="action-section:count:tests-to-run"]', serviceData.testsToRun.tests2RunBeforeTestsExecuted).click();
                    });

                    it("should display suggested tests to run count in the page header", () => {
                      cy.getByDataTest("tests-to-run-header:title").should("contain", serviceData.testsToRun.tests2RunBeforeTestsExecuted);
                    });

                    it("should display current build version", () => {
                      cy.getByDataTest("tests-to-run-header:current-build-version").should("contain", "0.2.0");
                    });

                    it("should display parent build version", () => {
                      cy.getByDataTest("tests-to-run-header:compared-build-version").should("contain", "0.1.0");
                    });

                    context("Tests to run table", () => {
                      it("should display all tests to run count in the header", () => {
                        cy.getByDataTest("tests-to-run-list:table-title").should("contain", serviceData.testsToRun.tests2RunBeforeTestsExecuted);
                      });

                      it("should display rows with tests to run", () => {
                        cy.get("table tbody tr").should("have.length", serviceData.testsToRun.tests2RunBeforeTestsExecuted);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });

      context("After text executed", () => {
        before(() => {
          cy.task("startPetclinicMicroserviceAutoTests", {}, { timeout: 450000 });
        });
        it("should finish all scopes after the collcet coverage", () => { // TODO refactor to api request in before hook
          cy.intercept("POST", `/api/groups/${data.groupId}/plugins/test2code/dispatch-action`).as("finish-all-scopes");

          cy.get('[data-test="menu:icon:test-to-code-plugin:header-cell:actions"]').click();
          cy.get('[data-test="menu:item:finish-all-scopes"]').click();
          cy.get('[data-test="finish-all-scopes-modal:submit-button"]').click();

          cy.wait("@finish-all-scopes", { timeout: 30000 });
          cy.getByDataTest("system-alert:title").should("exist");
        });

        context("Dashboard", () => {
          before("Open dashboard page", () => {
            cy.restoreLocalStorage();
            cy.getByDataTest("navigation:open-dashboard").click();
          });

          it(`should display ${secondBuildData.summary.coverage}% in coverage block`, () => {
            cy.getByDataTest("dashboard:build-coverage:main-info").should("contain", secondBuildData.summary.coverage);
          });

          it(`should display ${secondBuildData.summary.testsCount} tests count in tests block`, () => {
            cy.getByDataTest("dashboard:tests:main-info").should("have.text", secondBuildData.summary.testsCount);
          });

          it(`should display ${secondBuildData.summary.scopesCount} scopes count in tests block`, () => {
            cy.getByDataTest("dashboard:tests:additional-info").should("contain", secondBuildData.summary.scopesCount);
          });

          it(`should display ${secondBuildData.summary.risksCountAfterTheTestsExecuted} risks count in risks block`, () => {
            cy.getByDataTest("dashboard:risks:main-info").should("have.text", secondBuildData.summary.risksCountAfterTheTestsExecuted);
          });

          it(`should display ${secondBuildData.summary.testsToRunCountAfterTheTestsExecuted} tests2run count in tests2run block`, () => {
            cy.getByDataTest("dashboard:tests-to-run:main-info")
              .should("have.text", secondBuildData.summary.testsToRunCountAfterTheTestsExecuted);
          });
        });

        context("Risks", () => {
          context("Service group page", () => {
            before("Open plugin page", () => {
              cy.restoreLocalStorage();
              cy.getByDataTest("navigation:open-test2code-plugin").click();
            });

            it("should display summary risks count in the header", () => {
              cy.getByDataTest("dashboard-header-cell:risks:value").should("have.text", secondBuildData.summary.risksCountAfterTheTestsExecuted);
            });

            it("should display risks count for every service", () => {
              Object.entries(secondBuildData.agents).forEach(([serviceName, serviceData]) => {
                cy.contains('[data-test="test-to-code-plugin:list-row"]', serviceName)
                  .find('[data-test="dashboard-cell:value:risks"]')
                  .should("have.text", serviceData.risksCountAfterTheTestsExecuted);
              });
            });
          });

          context("Agent page", () => {
            context("Agents with risks", () => { // TODO rename
              Object.entries(secondBuildData.agentsWithRisks).forEach(([serviceName, serviceData]) => {
                context(`Check ${serviceName} service`, () => {
                  it("should open group test2code page", () => {
                    openTest2CodePluginForGroup();
                    cy.contains("Test2Code", { matchCase: false }).should("exist");
                    cy.contains(`Online Agents ${data.agentsCount}`, { matchCase: false }).should("exist");
                  });
                  it(`should open ${serviceName} test2code page`, () => {
                    cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                    cy.getByDataTest("navigation:open-test2code-plugin").click();

                    cy.contains("Test2Code", { matchCase: false }).should("exist");
                  });

                  context("Overview page", () => {
                    it("should display risks count in the header", () => {
                      cy.getByDataTest("action-section:count:risks").should("have.text", serviceData.risks.risksCountAfterTheTestsExecuted);
                    });
                  });

                  context("Risks page", () => {
                    before(() => {
                      cy.restoreLocalStorage();
                      cy.contains('[data-test="action-section:count:risks"]', serviceData.risks.risksCountAfterTheTestsExecuted).click();
                    });

                    it("should display not covered risks count in the page header", () => {
                      cy.getByDataTest("risks-list:title").should("contain", serviceData.risks.risksCountAfterTheTestsExecuted);
                    });

                    context("Risks table", () => {
                      it("should display all risks count in the header", () => {
                        cy.getByDataTest("risks-list:table-title").should("contain", serviceData.risks.risksCountBeforeTestsExecuted);
                      });

                      it("should display risks data", () => {
                        cy.risksTableTest(serviceData.risks.methods);
                      });
                    });
                  });
                });
              });
            });
            context("Agents without risks", () => {
              secondBuildData.agentsWithoutRisks.forEach((serviceName) => {
                context(`Check ${serviceName} service`, () => {
                  it("should open group test2code page", () => {
                    openTest2CodePluginForGroup();
                    cy.contains("Test2Code", { matchCase: false }).should("exist");
                    cy.contains(`Online Agents ${data.agentsCount}`, { matchCase: false }).should("exist");
                  });
                  it(`should open ${serviceName} test2code page`, () => {
                    cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                    cy.getByDataTest("navigation:open-test2code-plugin").click();

                    cy.contains("Test2Code", { matchCase: false }).should("exist");
                  });
                  context("Overview page", () => {
                    it('should display "-" in the header', () => {
                      cy.getByDataTest("action-section:no-value:risks").should("exist");
                    });
                  });
                });
              });
            });
          });
        });

        context("Tests2run", () => {
          context("Service group page", () => {
            it("should display summary tests to run count in the header", () => {
              cy.getByDataTest("dashboard-header-cell:tests-to-run:value").should("have.text", secondBuildData.summary.testsToRunCountAfterTheTestsExecuted);
            });

            it("should display tests to run count for every service", () => {
              Object.entries(secondBuildData.agents).forEach(([serviceName, serviceData]) => {
                cy.contains('[data-test="test-to-code-plugin:list-row"]', serviceName)
                  .find('[data-test="dashboard-cell:value:tests-to-run"]')
                  .should("have.text", serviceData.testsToRunCountAfterTheTestsExecuted);
              });
            });
          });

          context("Agent page", () => {
            context("Agents with tests2run after tests executed", () => {
              Object.entries(secondBuildData.agentsWithTests2Run).forEach(([serviceName, serviceData]) => {
                context(`Check ${serviceName} service`, () => {
                  it("should open group test2code page", () => {
                    openTest2CodePluginForGroup();
                    cy.contains("Test2Code", { matchCase: false }).should("exist");
                    cy.contains(`Online Agents ${data.agentsCount}`, { matchCase: false }).should("exist");
                  });
                  it(`should open ${serviceName} test2code page`, () => {
                    cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                    cy.getByDataTest("navigation:open-test2code-plugin").click();

                    cy.contains("Test2Code", { matchCase: false }).should("exist");
                  });

                  context("Overview page", () => {
                    it("should display tests to run count in the header", () => {
                      cy.getByDataTest("action-section:count:tests-to-run").should("have.text", serviceData.testsToRun.testsToRunCountAfterTheTestsExecuted);
                    });
                  });

                  context("Tests to run page", () => {
                    before(() => {
                      cy.restoreLocalStorage();
                      cy.contains('[data-test="action-section:count:tests-to-run"]', serviceData.testsToRun.testsToRunCountAfterTheTestsExecuted).click();
                    });

                    it("should display suggested tests to run count in the header", () => {
                      cy.getByDataTest("tests-to-run-header:title").should("contain", serviceData.testsToRun.testsToRunCountAfterTheTestsExecuted);
                    });

                    context("Tests to run table", () => {
                      it("should display all suggested tests to run count in the header", () => {
                        cy.getByDataTest("tests-to-run-list:table-title").should("contain", serviceData.testsToRun.tests2RunBeforeTestsExecuted);
                      });

                      it("should display tests to run data", () => {
                        cy.testsToRunTableTest(serviceData.testsToRun.tests);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

function openTest2CodePluginForGroup() {
  cy.getByDataTest("navigation:open-select-agent-panel").click();
  cy.contains('[data-test="select-agent-panel:group-row"]', data.groupId).click();
  cy.getByDataTest("navigation:open-test2code-plugin").click();
}
