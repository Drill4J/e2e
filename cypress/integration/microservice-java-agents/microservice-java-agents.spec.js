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
import data from "./java-mcr.json";

context("_", () => {
  before(() => {
    cy.task("removeContainers");
    cy.task("startAdmin");
    cy.task("startPetclinicMicroservice", { build: "0.1.0" }, { timeout: 200000 });
  });

  beforeEach(() => {
    cy.login();
    cy.visit(convertUrl("/"));
  });

  context("Admin part", () => {
    it("should register group", () => {
      cy.contains('[data-test="action-column:icons-register"]', data.agentsCount, { timeout: 45000 }).click({ force: true }); // wait for agent initialization

      cy.get('[data-test="wizard:continue-button"]').click();
      cy.get('[data-test="wizard:continue-button"]').click();

      cy.intercept("PATCH", `/api/groups/${data.groupId}`).as("registerGroup");

      cy.get('[data-test="wizard:finishng-button"]').click();

      cy.wait("@registerGroup", { timeout: 120000 });

      cy.contains(`Agents ${data.agentsCount}`).should("exist");
    });
  });

  context("Test to code", () => {
    beforeEach(() => {
      cy.contains('[data-test="name-column"]', data.groupId).click({ force: true });
      cy.get('[data-test="sidebar:link:Test2Code"]').click();
    });

    context("Initial builds", () => {
      const initialBuildData = data.builds["0.1.0"];
      it("finish all scope before collect coverage for displaying agents", () => { // temporal hack. Not all services displayed before we finish all scopes
        cy.intercept("POST", `/api/groups/${data.groupId}/plugins/test2code/dispatch-action`).as("finish-all-scopes");

        cy.getByDataTest("test-to-code-plugin:list-row").should("not.have.length", 0);
        // wait for data load and rendrer table. otherwise, the menu may close due to the re-renderer
        cy.get('[data-test="menu:icon:test-to-code-plugin:header-cell:actions"]').click();
        cy.get('[data-test="menu:item:finish-all-scopes"]').click();
        cy.get('[data-test="finish-all-scopes-modal:submit-button"]').click();

        cy.wait("@finish-all-scopes", { timeout: 30000 });

        cy.getByDataTest("message-panel:text").should("exist");
        cy.task("startPetclinicMicroserviceAutoTests", {}, { timeout: 200000 });
      });

      it("should finished all scopes after the tests finished executing should", () => {
        cy.intercept("POST", `/api/groups/${data.groupId}/plugins/test2code/dispatch-action`).as("finish-all-scopes");

        cy.getByDataTest("test-to-code-plugin:list-row").should("have.length", data.agentsCount);
        // wait for data load and rendrer table. otherwise, the menu may close due to the re-renderer
        cy.get('[data-test="menu:icon:test-to-code-plugin:header-cell:actions"]').click();
        cy.get('[data-test="menu:item:finish-all-scopes"]').click();
        cy.get('[data-test="finish-all-scopes-modal:submit-button"]').click();

        cy.wait("@finish-all-scopes", { timeout: 30000 });

        cy.getByDataTest("message-panel:text").should("exist");
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
            beforeEach(() => {
              cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
              cy.getByDataTest("sidebar:link:Test2Code").click();
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
              beforeEach(() => {
                cy.getByDataTest("build-overview:tab:build-tests").click();
              });

              it("should display tests table", () => {
                cy.testsTableTest(serviceData.testsWithCoveredMethods, serviceData.testsCount);
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
        cy.task("stopPetclinicMicroservice", {}, { timeout: 120000 });
        cy.task("startPetclinicMicroservice", { build: "0.2.0" }, { timeout: 200000 });
      });

      context("Risks before tests executed", () => {
        context("Service group page", () => {
          it("should display summary risks count in the header", () => {
            cy.getByDataTest("dashboard-header-cell:risks:value").should("have.text", secondBuildData.summary.risksCountBeforeTestsExecuted);
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
                beforeEach(() => {
                  cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                  cy.getByDataTest("sidebar:link:Test2Code").click({ force: true });
                });

                context("Overview page", () => {
                  it("should display risks count in the header", () => {
                    cy.getByDataTest("action-section:count:risks").should("have.text", serviceData.risks.risksCountBeforeTestsExecuted);
                  });

                  context("Risks page", () => {
                    beforeEach(() => {
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
              context(`Check ${serviceName} service`, () => {
                beforeEach(() => {
                  cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                  cy.getByDataTest("sidebar:link:Test2Code").click({ force: true });
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

      context("Tests2run before tests executed", () => {
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
                beforeEach(() => {
                  cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                  cy.getByDataTest("sidebar:link:Test2Code").click({ force: true });
                });
                context("Overview page", () => {
                  it("should display tests to run count in the header", () => {
                    cy.getByDataTest("action-section:count:tests-to-run").should("have.text", serviceData.testsToRun.tests2RunBeforeTestsExecuted);
                  });
                });

                context("Tests to run page", () => {
                  beforeEach(() => {
                    cy.contains('[data-test="action-section:count:tests-to-run"]', serviceData.testsToRun.tests2RunBeforeTestsExecuted).click();
                  });

                  it("should display suggested tests to run count in the page header", () => {
                    cy.getByDataTest("tests-to-run-header:title").should("contain", serviceData.testsToRun.tests2RunBeforeTestsExecuted);
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
          context("Agents without tests2run", () => {
            secondBuildData.agentsWithoutTests2Run.forEach((serviceName) => {
              context(`Check ${serviceName} service`, () => {
                beforeEach(() => {
                  cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                  cy.getByDataTest("sidebar:link:Test2Code").click({ force: true });
                });

                context("Overview page", () => {
                  it('should display "-" in the header', () => {
                    cy.getByDataTest("action-section:no-value:tests-to-run").should("exist");
                  });
                });
              });
            });
          });
        });
      });

      context("Risks after tests executed", () => {
        before(() => {
          cy.task("startPetclinicMicroserviceAutoTests", {}, { timeout: 200000 });
        });

        context("Service group page", () => {
          it("should finish all scopes after the collcet coverage", () => { // TODO refactor to api request in before hook
            cy.get('[data-test="menu:icon:test-to-code-plugin:header-cell:actions"]').click();
            cy.get('[data-test="menu:item:finish-all-scopes"]').click();
            cy.get('[data-test="finish-all-scopes-modal:submit-button"]').click();
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
          context("Agents with risks before running tests", () => { // TODO rename
            Object.entries(secondBuildData.agentsWithRisks).forEach(([serviceName, serviceData]) => {
              context(`Check ${serviceName} service`, () => {
                beforeEach(() => {
                  cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                  cy.getByDataTest("sidebar:link:Test2Code").click({ force: true });
                });

                context("Overview page", () => {
                  it("should display risks count in the header", () => {
                    cy.getByDataTest("action-section:count:risks").should("have.text", serviceData.risks.risksCountAfterTheTestsExecuted);
                  });

                  it("should display risks count in the cards", () => {
                    cy.risksCountInTheCardsTest(serviceData.risks);
                  });
                });

                context("Risks page", () => {
                  beforeEach(() => {
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
          context("Agents without risks before tests executed", () => {
            secondBuildData.agentsWithoutRisks.forEach((serviceName) => {
              context(`Check ${serviceName} service`, () => {
                beforeEach(() => {
                  cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                  cy.getByDataTest("sidebar:link:Test2Code").click({ force: true });
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

      context("Tests to run after tests executed", () => {
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
          context("Agents with tests2run before tests executed", () => {
            Object.entries(secondBuildData.agentsWithTests2Run).forEach(([serviceName, serviceData]) => {
              context(`Check ${serviceName} service`, () => {
                beforeEach(() => {
                  cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                  cy.getByDataTest("sidebar:link:Test2Code").click({ force: true });
                });

                context("Overview page", () => {
                  it("should display tests to run count in the header", () => {
                    cy.getByDataTest("action-section:count:tests-to-run").should("have.text", serviceData.testsToRun.testsToRunCountAfterTheTestsExecuted);
                  });
                });

                context("Tests to run page", () => {
                  beforeEach(() => {
                    cy.contains('[data-test="action-section:count:tests-to-run"]', serviceData.testsToRun.testsToRunCountAfterTheTestsExecuted).click();
                  });

                  it("should display suggested tests to run count in the header", () => {
                    cy.getByDataTest("tests-to-run-header:title").should("contain", serviceData.testsToRun.testsToRunCountAfterTheTestsExecuted);
                  });

                  context("Tests to run table", () => {
                    it("should display suggested tests to run count in the header", () => {
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
          context("Agents without tests2run before tests executed", () => {
            secondBuildData.agentsWithoutTests2Run.forEach((serviceName) => {
              context(`Check ${serviceName} service`, () => {
                beforeEach(() => {
                  cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                  cy.getByDataTest("sidebar:link:Test2Code").click({ force: true });
                });

                context("Overview page", () => {
                  it('should display "-" in the header', () => {
                    cy.getByDataTest("action-section:no-value:tests-to-run").should("exist");
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
