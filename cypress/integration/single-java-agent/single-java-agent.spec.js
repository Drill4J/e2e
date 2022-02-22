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
import { registerAgent } from "../../utils";
import multiinstancesSingleJavaAgentData from "./multinstances-single-java-agent.json";
import singleJavaAgentTestNGData from "./single-java-agent-testNG.json";
import singleJavaAgentJunit4Data from "./single-java-agent-junit4.json";
import singleJavaAgentJunit5Data from "./single-java-agent-junit5.json";
import { login } from "../../utils/login";

const dataObject = {
  "multinstances-single-java-agent": multiinstancesSingleJavaAgentData,
  "single-java-agent-testNG": singleJavaAgentTestNGData,
  "single-java-agent-junit4": singleJavaAgentJunit4Data,
  "single-java-agent-junit5": singleJavaAgentJunit5Data,
};
// Check setups.json file with examples of cypress env combination

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
// Autotests params
Cypress.env("fixtureFile", "single-java-agent-testNG");
Cypress.env("autotestsParams", ":testng:test -DtestNGVersion=7.4.0 -Dtestng.dtd.http=true");

// Cypress.env("autotestsParams", ":junit4:test -Djunit4Version=4.13.2 --tests *.standalone.*");
// Cypress.env("fixtureFile", "single-java-agent-junit4");

// Cypress.env("autotestsParams", ":junit5:test -Djunit5Version=5.8.0 --tests *.standalone.*");
// Cypress.env("fixtureFile", "single-java-agent-junit5");

// Autotests image
Cypress.env("autotestsImage", "drill4j/petclinic-autotests-execute:0.3.2");

// Cypress.env("autotestsImage", "drill4j/petclinic-maven-autotests-execute:0.1.0");

// eslint-disable-next-line import/no-dynamic-require
const data = dataObject[Cypress.env("fixtureFile")];

// TODO rename fixtureFile env
context(Cypress.env("fixtureFile"), () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  context("Admin part", () => {
    before(() => {
      cy.task(Cypress.env("startApplicationTaskName"), { build: Cypress.env("initialApplicationBuildVersion") }, { timeout: 600000 });
    });

    it("should login", () => {
      login();
    });

    it('should open "Add agent" panel', () => {
      cy.getByDataTest("no-agent-registered-stub:open-add-agent-panel").click();

      cy.contains('[data-test="panel"]', "Add Agent", { matchCase: false }).should("exist");
    });

    it("should register agent", () => {
      registerAgent(data.agentId);
    });
  });

  context("Test2Code part", () => {
    it("should open Test2Code plugin page", () => {
      cy.contains('[data-test="select-agent-panel:agent-row"]', data.agentId).click();
      cy.getByDataTest("navigation:open-test2code-plugin").click();

      cy.contains('[data-test="coverage-plugin-header:plugin-name"]', "Test2Code", { matchCase: false }).should("exist");
    });

    context("Initial build", () => {
      const initialBuildData = data.builds["0.1.0"];
      before(() => {
        cy.task(Cypress.env("startApplicationTestsTaskName"), {
          autotestsParams: Cypress.env("autotestsParams"),
          autotestsImage: Cypress.env("autotestsImage"),
        }, { timeout: 300000 });
      });

      it("finish active scope after the tests finish executing should collect coverage", () => {
        cy.get('[data-test="active-scope-info:scope-coverage"]').should("have.text", `${initialBuildData.coverage}%`);

        cy.get('[data-test="active-scope-info:finish-scope-button"]').click();

        cy.get('[data-test="finish-scope-modal:scope-summary:code-coverage"]').should("have.text", `${initialBuildData.coverage}%`);
        cy.get('[data-test="finish-scope-modal:scope-summary:tests-count"]').should("have.text", `${initialBuildData.testsCount}`);

        cy.get('[data-test="finish-scope-modal:finish-scope-button"]').click();
        cy.get('[data-test="system-alert:title"]').should("have.text", "Scope has been finished");

        cy.get('[data-test="active-build-coverage-info:build-coverage-percentage"]').should("have.text", `${initialBuildData.coverage}%`);
        cy.get('[data-test="active-scope-info:scope-coverage"]').should("have.text", "0%");
      });

      context("Build methods tab", () => {
        it("should display packages data in methods table", () => {
          cy.methodsTableTest(initialBuildData.packages, initialBuildData.packagesCount);
        });

        it('should display "Asociated tests pane" with tests for methods', () => {
          cy.associatedTestsPaneTest(initialBuildData.packagesWithAssociatedTests);
        });
      });

      context("Build tests tab", () => {
        before(() => {
          cy.restoreLocalStorage();
          cy.get('[data-test="build-overview:tab:build-tests"]').click();
        });

        it("should display tests data in the table", () => {
          cy.testsTableTest(initialBuildData.testsWithCoveredMethods, initialBuildData.testsCount);
          cy.testsTableTest(initialBuildData.testsWithoutCoveredMethods, initialBuildData.testsCount);
        });

        it('should display "Covered methods pane" for tests', () => {
          cy.coveredMethodsPaneTest(initialBuildData.testsWithCoveredMethods);
        });
      });

      context("Risks", () => {
        it("should display '-' in the header on overview page for initial build", () => {
          cy.getByDataTest("action-section:no-value:risks").should("exist");
        });
      });

      context("Tests to run", () => {
        it("should display '-' in the header on overview page for initial build", () => {
          cy.getByDataTest("action-section:no-value:tests-to-run").should("exist");
        });
      });
    });

    context("Second build", () => {
      const buildData = data.builds["0.5.0"];
      before(() => {
        cy.restoreLocalStorage();
        cy.task(Cypress.env("startApplicationTaskName"), { build: Cypress.env("secondApplicationBuildVersion") }, { timeout: 600000 });
        cy.getByDataTest("crumb:builds").click();
        cy.getByDataTest("navigation:open-dashboard").click({ force: true });
      });
      // TODO add check build versions

      context("Before tests executed", () => {
        context("Dashboard", () => {
          it("should display 0% in coverage block", () => {
            cy.getByDataTest("dashboard:build-coverage:main-info").should("contain", "0%");
          });

          it("should display 0 tests count in tests block", () => {
            cy.getByDataTest("dashboard:tests:main-info").should("have.text", "0");
          });

          it("should display 0 scopes count in tests block", () => {
            cy.getByDataTest("dashboard:tests:additional-info").should("contain", "0");
          });

          it(`should display ${buildData.risks.risksCountBeforeTestsExecuted} risks count in risks block`, () => {
            cy.getByDataTest("dashboard:risks:main-info").should("have.text", buildData.risks.risksCountBeforeTestsExecuted);
          });

          it(`should display ${buildData.testsToRun.tests2RunBeforeTestsExecuted} tests2run count in tests2run block`, () => {
            cy.getByDataTest("dashboard:tests-to-run:main-info").should("have.text", buildData.testsToRun.tests2RunBeforeTestsExecuted);
          });
        });

        context("Risks", () => {
          before(() => {
            cy.restoreLocalStorage();
            cy.getByDataTest("navigation:open-test2code-plugin").click();
          });
          context("Overview page", () => {
            it("should display risks count in the header", () => {
              cy.getByDataTest("action-section:count:risks").should("have.text", buildData.risks.risksCountBeforeTestsExecuted);
            });
          });

          context("Risks page", () => {
            before(() => {
              cy.restoreLocalStorage();
              cy.contains('[data-test="action-section:count:risks"]', buildData.risks.risksCountBeforeTestsExecuted).click();
            });

            after(() => {
              cy.getByDataTest("crumb:selected-build").click();
            });

            it("should display not covered risks count in the page header", () => {
              cy.getByDataTest("risks-list:title").should("contain", buildData.risks.risksCountBeforeTestsExecuted);
            });

            context("Risks table", () => {
              it("should display all risks count in the header", () => {
                cy.getByDataTest("risks-list:title").should("contain", buildData.risks.risksCountBeforeTestsExecuted);
              });

              it("should display rows with risks", () => {
                cy.get("table tbody tr").should("have.length", buildData.risks.risksCountBeforeTestsExecuted);
              });
            });
          });
        });

        context("Tests2run", () => {
          context("Overview page", () => {
            it("should display tests2run count in the header", () => {
              cy.getByDataTest("action-section:count:tests-to-run").should("have.text", buildData.testsToRun.tests2RunBeforeTestsExecuted);
            });
          });

          context("Tests to run page", () => {
            before(() => {
              cy.restoreLocalStorage();
              cy.contains('[data-test="action-section:count:tests-to-run"]', buildData.testsToRun.tests2RunBeforeTestsExecuted).click();
            });

            it("should display suggested tests2run count in the page header", () => {
              cy.getByDataTest("tests-to-run-header:title").should("contain", buildData.testsToRun.tests2RunBeforeTestsExecuted);
            });

            it("should display current build version", () => {
              cy.getByDataTest("tests-to-run-header:current-build-version").should("contain", "0.5.0");
            });

            it("should display parent build version", () => {
              cy.getByDataTest("tests-to-run-header:compared-build-version").should("contain", "0.1.0");
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

        context("Time savings", () => {
          it("should display bar chart", () => {
            cy.getByDataTest("bar-chart").should("exist");
          });
        });
      });

      context("After tests executed", () => {
        before(() => {
          cy.task(Cypress.env("startApplicationTestsTaskName"), {
            autotestsParams: Cypress.env("autotestsParams"),
            autotestsImage: Cypress.env("autotestsImage"),
          }, { timeout: 300000 });
          cy.restoreLocalStorage();
          cy.getByDataTest("crumb:selected-build").click();
          cy.get('[data-test="active-scope-info:finish-scope-button"]').click();
          cy.get('[data-test="finish-scope-modal:finish-scope-button"]').click();
        });

        context("Dashboard", () => {
          before(() => {
            cy.restoreLocalStorage();
            cy.getByDataTest("navigation:open-dashboard").click();
          });

          it(`should display ${buildData.coverage}% in coverage block`, () => {
            cy.getByDataTest("dashboard:build-coverage:main-info").should("contain", buildData.coverage);
          });

          it(`should display ${buildData.comparedToTheBaselineBuildCoverage} in сompared to the parent build block`, () => {
            cy.getByDataTest("dashboard:build-coverage:additional-info").should("contain", buildData.comparedToTheBaselineBuildCoverage);
          });

          it(`should display ${buildData.testsCount} tests count in tests block`, () => {
            cy.getByDataTest("dashboard:tests:main-info").should("have.text", buildData.testsCount);
          });

          it(`should display ${buildData.scopesCount} scopes count in tests block`, () => {
            cy.getByDataTest("dashboard:tests:additional-info").should("contain", buildData.scopesCount);
          });

          it(`should display ${buildData.risks.risksCountAfterTheTestsExecuted} risks count in risks block`, () => {
            cy.getByDataTest("dashboard:risks:main-info").should("have.text", buildData.risks.risksCountAfterTheTestsExecuted);
          });

          it(`should display ${buildData.testsToRun.testsToRunCountAfterTheTestsExecuted} tests2run count in tests2run block`, () => {
            cy.getByDataTest("dashboard:tests-to-run:main-info")
              .should("have.text", buildData.testsToRun.testsToRunCountAfterTheTestsExecuted);
          });
        });

        context("Risks", () => {
          before(() => {
            cy.restoreLocalStorage();
            cy.getByDataTest("navigation:open-test2code-plugin").click();
          });

          context("Overview page", () => {
            it("should display risks count in the cards", () => {
              cy.getByDataTest("build-methods-card:total-count:NEW").should("have.text", buildData.risks.newRisksCount);
              cy.getByDataTest("build-project-methods:link-button:new:risks")
                .should("contain", buildData.risks.newRisksCountAfterTheTestsExecuted);
              cy.getByDataTest("build-methods-card:total-count:MODIFIED").should("have.text", buildData.risks.modifiedRisksCount);
            });
          });

          context("Risks page", () => {
            before(() => {
              cy.restoreLocalStorage();
              cy.contains('[data-test="action-section:count:risks"]', buildData.risks.risksCountAfterTheTestsExecuted).click();
            });

            it("should display not covered risks count in the page header", () => {
              cy.getByDataTest("risks-list:title").should("contain", buildData.risks.risksCountAfterTheTestsExecuted);
            });

            context("Risks table", () => {
              it("should display all risks count in the header", () => {
                cy.getByDataTest("risks-list:table-title").should("contain", buildData.risks.risksCountBeforeTestsExecuted);
              });

              it("should display risks data", () => {
                cy.risksTableTest(buildData.risks.methods);
              });
            });
          });
        });

        context("Tests2run", () => {
          before(() => {
            cy.restoreLocalStorage();
            cy.getByDataTest("crumb:selected-build").click();
          });

          context("Overview page", () => {
            it("should display suggested tests2run count in the header", () => {
              cy.getByDataTest("action-section:count:tests-to-run")
                .should("have.text", buildData.testsToRun.testsToRunCountAfterTheTestsExecuted);
            });
          });

          context("Tests to run page", () => {
            before(() => {
              cy.restoreLocalStorage();
              cy.contains('[data-test="action-section:count:tests-to-run"]',
                buildData.testsToRun.testsToRunCountAfterTheTestsExecuted).click();
            });

            it("should display suggested tests2run count in the header", () => {
              cy.getByDataTest("tests-to-run-header:title").should("contain", buildData.testsToRun.testsToRunCountAfterTheTestsExecuted);
            });

            it("should display tests data in the table", () => {
              cy.testsToRunTableTest(buildData.testsToRun.tests);
            });
          });
        });

        context("Time savings", () => {
          it("should display duration chart", () => {
            cy.getByDataTest("bar-chart:time-saved-chart").should("exist");
          });

          it("should display total time saved chart", () => {
            cy.getByDataTest("bar-chart:duration-chart").should("exist");
          });
        });
      });
    });
  });
});
