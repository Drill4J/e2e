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
  // before(() => {
  //   cy.task("removeContainers");
  //   cy.task("startAdmin");
  //   cy.wait(30000);
  //   cy.task("startPetclinicMicroservice", { build: "0.1.0" });
  // });

  beforeEach(() => {
    cy.login();
    cy.visit(convertUrl("/"));
  });

  // context("Admin part", () => {
  //   it("Register group with only required parameters", () => {
  //     cy.contains('[data-test="action-column:icons-register"]', data.agentsCount, { timeout: 45000 }).click(); // wait for agent initialization
  //
  //     cy.get('[data-test="wizard:continue-button"]').click();
  //     cy.get('[data-test="wizard:continue-button"]').click();
  //
  //     cy.intercept("PATCH", `/api/groups/${data.groupId}`).as("registerGroup");
  //
  //     cy.get('[data-test="wizard:finishng-button"]').click();
  //
  //     cy.wait("@registerGroup", { timeout: 60000 });
  //     // TODO check redirect and success message
  //   });
  // });

  context("Test to code", () => {
    beforeEach(() => {
      cy.contains('[data-test="name-column"]', data.groupId).click();
      cy.get('[data-test="sidebar:link:Test2Code"]').click();
    });

    // context("Initial builds", () => {
    //   const initialBuildData = data.builds["0.1.0"];
    //   it("finish all scope before collect coverage", () => { // temporal hack. Not all services displayed before we finish all scopes
    //     cy.intercept("POST", `/api/groups/${data.groupId}/plugins/test2code/dispatch-action`).as("finish-all-scopes");
    //
    //     cy.getByDataTest("test-to-code-plugin:list-row").should("not.have.length", 0);
    //     // wait for data load and rendrer table. otherwise, the menu may close due to the re-renderer
    //     cy.get('[data-test="menu:icon:test-to-code-plugin:header-cell:actions"]').click();
    //     cy.get('[data-test="menu:item:finish-all-scopes"]').click();
    //     cy.get('[data-test="finish-all-scopes-modal:submit-button"]').click();
    //
    //     cy.wait("@finish-all-scopes", { timeout: 30000 });
    //
    //     cy.getByDataTest("message-panel:text").should("exist");
    //     cy.task("startPetclinicMicroserviceAutoTests", {}, { timeout: 200000 });
    //   });
    //
    //   it("Finish all scopes after the tests finished executing", () => {
    //     cy.intercept("POST", `/api/groups/${data.groupId}/plugins/test2code/dispatch-action`).as("finish-all-scopes");
    //
    //     cy.getByDataTest("test-to-code-plugin:list-row").should("have.length", data.agentsCount);
    //     // wait for data load and rendrer table. otherwise, the menu may close due to the re-renderer
    //     cy.get('[data-test="menu:icon:test-to-code-plugin:header-cell:actions"]').click();
    //     cy.get('[data-test="menu:item:finish-all-scopes"]').click();
    //     cy.get('[data-test="finish-all-scopes-modal:submit-button"]').click();
    //
    //     cy.wait("@finish-all-scopes", { timeout: 30000 });
    //
    //     cy.getByDataTest("message-panel:text").should("exist");
    //   });
    //
    //   context("_", () => { // need to save order of execution
    //     it("Check the summary coverage percentage after run tests", () => {
    //       cy.get('[data-test="dashboard-header-cell:coverage:value"]').should("contain", initialBuildData.summary.coverage);
    //     });
    //   });
    //
    //   context("Check the coverage percentage for every service after run tests", () => {
    //     Object.entries(initialBuildData.agents).forEach(([serviceName, serviceData]) => {
    //       it(`should display coverage for ${serviceName} service`, () => {
    //         cy.contains('[data-test="test-to-code-plugin:list-row"]', serviceName)
    //           .find('[data-test="dashboard-coverage-cell:value"]')
    //           .should("contain", serviceData.coverage);
    //       });
    //     });
    //   });
    //
    //   context("Check every service data in the agent t2c page", () => {
    //     Object.entries(initialBuildData.agents).forEach(([serviceName, serviceData]) => {
    //       context(`Check ${serviceName} service`, () => {
    //         beforeEach(() => {
    //           cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
    //           cy.getByDataTest("sidebar:link:Test2Code").click();
    //         });
    //
    //         context("build methods tab", () => {
    //           it("should display packages table", () => {
    //             cy.methodsTableTest(serviceData.packages, serviceData.packagesCount);
    //           });
    //
    //           it('should display "Associated tests" pane', () => {
    //             const packagesWithAssociatedTests = Object.entries(serviceData.packages)
    //               .filter(([_, value]) => value.associatedTestsCount !== "n/a");
    //
    //             cy.associatedTestsPaneTest(packagesWithAssociatedTests);
    //           });
    //         });
    //
    //         context("build tests tab", () => {
    //           beforeEach(() => {
    //             cy.getByDataTest("build-overview:tab:build-tests").click();
    //           });
    //
    //           it("should display tests table", () => {
    //             cy.testsTableTest(serviceData.testsWithCoveredMethods, serviceData.testsCount);
    //           });
    //
    //           it('should display "Covered methods" pane', () => {
    //             cy.coveredMethodsPaneTest(Object.entries(serviceData.testsWithCoveredMethods));
    //           });
    //         });
    //
    //         context("Risks", () => {
    //           it("should display '-' for initial build", () => {
    //             cy.getByDataTest("action-section:no-value:risks").should("exist");
    //           });
    //         });
    //
    //         context("Tests to run", () => {
    //           it("should display '-' for initial build", () => {
    //             cy.getByDataTest("action-section:no-value:tests-to-run").should("exist");
    //           });
    //         });
    //       });
    //     });
    //   });
    // });

    context("Second build", () => {
      const secondBuildData = data.builds["0.2.0"];
      // before(() => {
      //   cy.task("startPetclinicMicroservice", { build: "0.2.0" });
      //   cy.wait(15000);
      // });

      context("Initial Risks", () => {
        it("should display summary risks count", () => {
          cy.getByDataTest("dashboard-header-cell:risks:value").should("have.text", secondBuildData.summary.initialRisksCount);
        });

        it("should display risks count for every service", () => {
          Object.entries(secondBuildData.agents).map(([serviceName, serviceData]) => {
            cy.contains('[data-test="test-to-code-plugin:list-row"]', serviceName)
              .find('[data-test="dashboard-cell:value:risks"]')
              .should("have.text", serviceData.risks.initialRisksCount);
          });
        });

        context("Check for every service on agent page", () => {
          Object.entries(secondBuildData.agents).forEach(([serviceName, serviceData]) => {
            context(`Check ${serviceName} service`, () => {
              beforeEach(() => {
                cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                cy.getByDataTest("sidebar:link:Test2Code").click({ force: true });
              });

              if (Number(serviceData.risks.initialRisksCount)) {
                context("Overview page", () => {
                  it("should display risks count in the header", () => {
                    cy.getByDataTest("action-section:count:risks").should("have.text", serviceData.risks.initialRisksCount);
                  });

                  context("Risks page", () => {
                    beforeEach(() => {
                      cy.contains('[data-test="action-section:count:risks"]', serviceData.risks.initialRisksCount).click();
                    });

                    it("should display not covered risks count in the page header", () => {
                      cy.getByDataTest("risks-list:title").should("contain", serviceData.risks.initialRisksCount);
                    });

                    context("Risks table", () => {
                      it("should display all risks count in the header", () => {
                        cy.getByDataTest("risks-list:title").should("contain", serviceData.risks.initialRisksCount);
                      });

                      it("should display rows with risks", () => {
                        cy.get("table tbody tr").should("have.length", serviceData.risks.initialRisksCount);
                      });
                    });
                  });
                });
              }
              if (!Number(serviceData.risks.initialRisksCount)) {
                context("Overview page", () => {
                  it('should display "-" in the header', () => {
                    cy.getByDataTest("action-section:no-value:risks").should("exist");
                  });
                });
              }
            });
          });
        });
      });

      context("Initial Tests to run", () => {
        it("should display summary risks count", () => {
          cy.getByDataTest("dashboard-header-cell:tests-to-run:value").should("have.text", secondBuildData.summary.initialTestsToRunCount);
        });

        it("should display risks count for every service", () => {
          Object.entries(secondBuildData.agents).map(([serviceName, serviceData]) => {
            cy.contains('[data-test="test-to-code-plugin:list-row"]', serviceName)
              .find('[data-test="dashboard-cell:value:tests-to-run"]')
              .should("have.text", serviceData.testsToRun.initialTestsToRunCount);
          });
        });

        context("Check for every service on agent page", () => {
          Object.entries(secondBuildData.agents).forEach(([serviceName, serviceData]) => {
            context(`Check ${serviceName} service`, () => {
              beforeEach(() => {
                cy.contains('[data-test="test-to-code-name-cell:name-cell"]', serviceName).click({ force: true });
                cy.getByDataTest("sidebar:link:Test2Code").click({ force: true });
              });
              if (Number(serviceData.testsToRun.initialTestsToRunCount)) {
                context("Overview page", () => {
                  it("should display tests to run count in the header", () => {
                    cy.getByDataTest("action-section:count:tests-to-run").should("have.text", serviceData.testsToRun.initialTestsToRunCount);
                  });
                });

                context("Tests to run page", () => {
                  beforeEach(() => {
                    cy.contains('[data-test="action-section:count:tests-to-run"]', serviceData.testsToRun.initialTestsToRunCount).click();
                  });

                  it("should display suggested tests to run count in the page header", () => {
                    cy.getByDataTest("tests-to-run-header:title").should("contain", serviceData.testsToRun.initialTestsToRunCount);
                  });

                  context("Tests to run table", () => {
                    it("should display all tests to run count in the header", () => {
                      cy.getByDataTest("tests-to-run-list:table-title").should("contain", serviceData.testsToRun.initialTestsToRunCount);
                    });

                    it("should display rows with tests to run", () => {
                      cy.get("table tbody tr").should("have.length", serviceData.testsToRun.initialTestsToRunCount);
                    });
                  });
                });
              }
              if (!Number(serviceData.testsToRun.initialTestsToRunCount)) {
                context("Overview page", () => {
                  it('should display "-" in the header', () => {
                    cy.getByDataTest("action-section:no-value:tests-to-run").should("exist");
                  });
                });
              }
            });
          });
        });
      });
    });
  });
});
