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

context("Baseline", () => {
  before(() => {
    cy.visit(convertUrl("/"));
    cy.getByDataTest("login-button:continue-as-guest").click();
    cy.task("startPetclinic", { build: "0.1.0" }, { timeout: 100000 });
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

      cy.get('[data-test="wizard:continue-button"]').click();
      cy.get('[data-test="wizard:continue-button"]').click();

      cy.get('[data-test="wizard:finishng-button"]').click();

      cy.url({ timeout: 90000 }).should("include", "/dashboard", { timeout: 90000 });
      cy.contains("Online").should("exist");
      cy.contains("Agent has been registered").should("exist");

      cy.get('a[data-test="sidebar:link:Test2Code"]').click();
      cy.get("[data-test=methods-table] tbody tr").should("not.have.length", 0);
    });
  });

  context("Test2code", () => {
    context("Build 0.1.0", () => {
      before(() => {
        cy.task("startPetclinicAutoTests", {}, { timeout: 200000 });
      });

      it("should collect coverage after finish scope", () => {
        cy.get('[data-test="active-scope-info:finish-scope-button"]').click();
        cy.get('[data-test="finish-scope-modal:finish-scope-button"]').click();

        cy.get('[data-test="message-panel:text"]').should("have.text", "Scope has been finished");
      });
    });

    context("Build 0.2.0", () => {
      const buildData = data.builds["0.2.0"];

      before(() => {
        cy.task("startPetclinic", { build: "0.2.0" }, { timeout: 140000 });
        cy.restoreLocalStorage();
        cy.getByDataTest("crumb:builds").click();
        cy.contains('[data-test="builds-table:buildVersion"]', "0.2.0").click({ force: true });
        cy.get('a[data-test="sidebar:link:Test2Code"]').click();
      });

      it("should set build as baseline", () => {
        cy.getByDataTest("mark-as-baseline-flag").click();
        cy.getByDataTest("set-as-baseline:conformation-checkbox").click();
        cy.getByDataTest("baseline-build-modal:set-as-baseline-button").should("not.be.disabled");
        cy.getByDataTest("baseline-build-modal:set-as-baseline-button").click();
        cy.contains("Current build has been set as baseline successfully. All subsequent builds will be compared to it.").should("exist");
      });

      context("Before tests executed", () => {
        it("should display risks count in the header on overview page", () => {
          cy.getByDataTest("action-section:count:risks").should("have.text", buildData.risks.risksCountBeforeTestsExecuted);
        });

        context("Risks page", () => {
          before(() => {
            cy.restoreLocalStorage();
            cy.contains('[data-test="action-section:count:risks"]', buildData.risks.risksCountBeforeTestsExecuted).click();
          });

          it("should display current build version", () => {
            cy.getByDataTest("risks-list:current-build-version").should("contain", "0.2.0");
          });

          it("should display parent build version", () => {
            cy.getByDataTest("risks-list:previous-build-version").should("contain", "0.1.0");
          });

          it("should display risks in table", () => {
            cy.risksTableTest(buildData.risks.methods);
          });
        });
      });

      context("Tests executing", () => {
        before(() => {
          cy.task("startPetclinicAutoTests", {}, { timeout: 200000 });
          cy.restoreLocalStorage();
          cy.get('a[data-test="sidebar:link:Test2Code"]').click();
        });

        it("should collect coverage after finish scope", () => {
          cy.get('[data-test="active-scope-info:finish-scope-button"]').click();
          cy.get('[data-test="finish-scope-modal:finish-scope-button"]').click();

          cy.get('[data-test="message-panel:text"]').should("have.text", "Scope has been finished");
        });
      });
    });

    context("Build 0.4.0", () => {
      const buildData = data.builds["0.4.0"];

      before(() => {
        cy.task("startPetclinic", { build: "0.4.0" }, { timeout: 140000 });
        cy.restoreLocalStorage();
        cy.getByDataTest("crumb:builds").click();
        cy.contains('[data-test="builds-table:buildVersion"]', "0.4.0").click({ force: true });
        cy.get('a[data-test="sidebar:link:Test2Code"]').click();
      });

      it("should set build as baseline", () => {
        cy.getByDataTest("mark-as-baseline-flag").click();
        cy.getByDataTest("set-as-baseline:conformation-checkbox").click();
        cy.getByDataTest("baseline-build-modal:set-as-baseline-button").should("not.be.disabled");
        cy.getByDataTest("baseline-build-modal:set-as-baseline-button").click();
        cy.contains("Current build has been set as baseline successfully. All subsequent builds will be compared to it.").should("exist");
      });

      context("Before tests executed", () => {
        it("should display risks count in the header on overview page", () => {
          cy.getByDataTest("action-section:count:risks").should("have.text", buildData.risks.risksCountBeforeTestsExecuted);
        });

        context("Risks page", () => {
          before(() => {
            cy.restoreLocalStorage();
            cy.contains('[data-test="action-section:count:risks"]', buildData.risks.risksCountBeforeTestsExecuted).click();
          });

          it("should display current build version", () => {
            cy.getByDataTest("risks-list:current-build-version").should("contain", "0.4.0");
          });

          it("should display parent build version", () => {
            cy.getByDataTest("risks-list:previous-build-version").should("contain", "0.2.0");
          });

          it("should display risks in table", () => {
            cy.risksTableTest(buildData.risks.methods);
          });
        });
      });

      context("Tests executing", () => {
        before(() => {
          cy.task("startPetclinicAutoTests", {}, { timeout: 200000 });
          cy.restoreLocalStorage();
          cy.get('a[data-test="sidebar:link:Test2Code"]').click();
        });

        it("should collect coverage after finish scope", () => {
          cy.get('[data-test="active-scope-info:finish-scope-button"]').click();
          cy.get('[data-test="finish-scope-modal:finish-scope-button"]').click();

          cy.get('[data-test="message-panel:text"]').should("have.text", "Scope has been finished");
        });
      });
    });

    context("Build 0.5.0", () => {
      const buildData = data.builds["0.5.0"];

      before("start petclinic build 0.5.0", () => {
        cy.task("startPetclinic", { build: "0.5.0" }, { timeout: 140000 });
        cy.restoreLocalStorage();
        cy.getByDataTest("crumb:builds").click();
        cy.contains('[data-test="builds-table:buildVersion"]', "0.5.0").click({ force: true });
        cy.get('a[data-test="sidebar:link:Test2Code"]').click();
      });

      context("Risks", () => {
        before(() => {
          cy.restoreLocalStorage();
          cy.get('a[data-test="sidebar:link:Test2Code"]').click();
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

          it("should display not covered risks count in the page header", () => {
            cy.getByDataTest("risks-list:title").should("contain", buildData.risks.risksCountBeforeTestsExecuted);
          });

          it("should display current build version", () => {
            cy.getByDataTest("risks-list:current-build-version").should("contain", "0.5.0");
          });

          it("should display parent build version", () => {
            cy.getByDataTest("risks-list:previous-build-version").should("contain", "0.4.0");
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
        before(() => {
          cy.restoreLocalStorage();
          cy.getByDataTest("crumb:test2code").click();
        });

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
            cy.getByDataTest("tests-to-run-header:compared-build-version").should("contain", "0.4.0");
          });

          context("Tests to run table", () => {
            it("should display all tests2run count in the header", () => {
              cy.getByDataTest("tests-to-run-list:table-title").should("contain", buildData.testsToRun.tests2RunBeforeTestsExecuted);
            });

            it("should display rows with tests2run", () => {
              Object.entries(buildData.testsToRun.tests).forEach(([testName, testData]) => {
                cy.contains("table tbody tr", testName).should("exist");

                cy.contains("table tbody tr", testName).contains('[data-test="td-row-type"]', testData.type).should("exist");
              });
            });
          });
        });
      });
    });
  });
});
