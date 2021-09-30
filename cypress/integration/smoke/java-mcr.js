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

before(() => {
  cy.task("removeContainers");
  cy.task("startAdmin");
  cy.wait(30000);
  cy.task("startPetclinicMicroservice", { build: "0.1.0" });
});

context("Admin panel", () => {
  beforeEach(function () {
    cy.fixture("java-mcr.json").then(data => {
      this.data = data;
    });
    cy.visit(convertUrl("/login"));
    cy.get('button[data-test="login-page:login-button"]').click();
  });

  it("should display unregistered group", () => {
    cy.get("table", { timeout: 45000 })
      .get("tr")
      .get('a[data-test="name-column"]')
      .should("have.attr", "disabled");
  });

  it("Register group with only required parameters", function () {
    cy.get('[data-test="action-column:icons-register"]').click();

    cy.get("input[name=id]").should("have.value", this.data.id);
    cy.get("input[name=name]").should("have.value", this.data.id);

    cy.get('[data-test="wizard:continue-button"]').click();
    cy.get('[data-test="wizard:continue-button"]').click();

    cy.intercept("PATCH", `/api/groups/${this.data.id}`, (req) => {
      req.responseTimeout = 60000;
    }).as("registerGroup");

    cy.get('[data-test="wizard:finishng-button"]').click();
    cy.wait("@registerGroup", { timeout: 60000 }).its("response.statusCode").should("eq", 200);
  });
});

context("Test to code", () => {
  beforeEach(function () {
    cy.fixture("java-mcr.json").then(data => {
      this.data = data;
    });

    cy.visit(convertUrl("/login"));
    cy.get('button[data-test="login-page:login-button"]').click();

    cy.get('[data-test="name-column"]').contains(new RegExp(JAVA_GROUP_NAME)).click();
    cy.get('[data-test="sidebar:link:Test2Code"]').click();
  });

  it("Check the coverage percentage is empty after deploy build", () => {
    cy.get('[data-test="test-to-code-plugin:list-row"]').each(($row) => {
      const serviceCoverage = $row.find('[data-test="dashboard-coverage-cell:value"]').text();
      expect(serviceCoverage).to.be.eq("0%");
    });
  });

  it("Finish all scopes after collect coverage", function () {
    cy.task("startPetclinicMicroserviceAutoTests", {}, { timeout: 180000 });

    cy.intercept("POST", `/api/groups/${this.data.id}/plugins/test2code/dispatch-action`).as("finish-all-scopes");

    cy.get('[data-test="menu:icon:test-to-code-plugin:header-cell:actions"]').click({ force: true });
    cy.get('[data-test="menu:item:finish-all-scopes"]').click();
    cy.get('[data-test="finish-all-scopes-modal:submit-button"]').click();

    cy.wait("@finish-all-scopes", { timeout: 30000 }).its("response.statusCode").should("eq", 200);
  });

  it("Check the coverage percentage after run tests", function () {
    cy.get('[data-test="test-to-code-plugin:list-row"]').each(($row) => {
      const serviceName = $row.find('[data-test="test-to-code-name-cell:name-cell"]').text();
      const serviceCoverage = $row.find('[data-test="dashboard-coverage-cell:value"]').text();
      expect(this.data.builds["0.1.0"][serviceName].coverage).to.be.eq(serviceCoverage);
    });

    cy.get('[data-test="dashboard-header-cell:coverage:value"]').should("have.text", this.data.builds["0.1.0"].summary.coverage);
  });

  it("Check associated tests for visits-service service", function () {
    const service = this.data.builds["0.1.0"]["visits-service"];
    const PACKAGE_NAME = service.associatedTests.packageName;
    const ASSOCIATED_TESTS_COUNT = service.associatedTests.testsCount;
    const PACKAGE_METHODS_COVERED = service.associatedTests.methodsCovered;
    const PACKAGE_METHODS_COVERAGE = service.associatedTests.packageCoverage;

    cy.get('a[data-test="test-to-code-name-cell:name-cell"]').contains("visits-service").click();
    cy.get('[data-test="sidebar:link:Test2Code"]').click();

    cy.get("table")
      .find("tbody")
      .contains("tr", PACKAGE_NAME).then($row => {
        expect($row.find('span[data-test="coverage-cell:coverage"]').text()).to.be.eq(PACKAGE_METHODS_COVERAGE);
        expect($row.find('[data-test="td-row-cell-coveredMethodsCount"]').text()).to.be.eq(PACKAGE_METHODS_COVERED);
      });

    cy.get("table")
      .find("tbody")
      .contains("tr", PACKAGE_NAME)
      .find('[data-test="td-row-cell-assocTestsCount"]')
      .find("a")
      .click({ force: true });

    cy.get('[data-test="associated-test-pane:tests-count"]').should("have.text", ASSOCIATED_TESTS_COUNT);
    cy.get('[data-test="associated-test-pane:package-name"]').should("have.text", PACKAGE_NAME);
    cy.get('[data-test="associated-tests-list:item"]').should("have.length", ASSOCIATED_TESTS_COUNT);
    cy.get('[data-test="dropdown:selected-value"]').should("have.text", "All tests");
    cy.get('[data-test="modal:close-button"]').click();
  });

  it("Check covered methods for visits-service service", function () {
    const service = this.data.builds["0.1.0"]["visits-service"];
    const TEST_NAME = service.coveredMethods.testName;
    const TEST_TYPE = service.coveredMethods.testType;
    const TEST_COVERAGE = service.coveredMethods.testCoverage;
    const COVERED_METHODS_COUNT = service.coveredMethods.coveredMethodsCount;

    cy.get('a[data-test="test-to-code-name-cell:name-cell"]').contains("visits-service").click();
    cy.get('[data-test="sidebar:link:Test2Code"]').click();

    cy.get('[data-test="build-overview:tab:build-tests"]').click();

    cy.get("table")
      .find("tbody")
      .contains("tr", TEST_NAME).then($row => {
        expect($row.find('[data-test="td-row-type"]').text()).to.be.eq(TEST_TYPE);
        expect($row.find('[data-test="td-row-cell-coverage.percentage"]').text()).to.be.eq(TEST_COVERAGE);
        expect($row.find('[data-test="td-row-cell-coverage.methodCount.covered"]').text()).to.be.eq(COVERED_METHODS_COUNT);
      });

    cy.get('[data-test="test-details:table-wrapper"]')
      .find("table")
      .find("tbody")
      .contains("tr", TEST_NAME)
      .find('[data-test="td-row-coverage.methodCount.covered"]')
      .find("a")
      .click({ force: true });

    cy.get("header").should("have.text", `Covered methods${COVERED_METHODS_COUNT}`);
    cy.get('[data-test="covered-methods-by-test-sidebar:test-name"]').should("have.text", TEST_NAME);
    cy.get('[data-test="covered-methods-by-test-sidebar:test-type"]').should("have.text", TEST_TYPE);
    cy.get('[data-test="covered-methods-list:item"]').should("have.length", COVERED_METHODS_COUNT);
    cy.get('[data-test="dropdown:selected-value"]').should("have.text", "All methods");
  });

  it("Check the coverage percentage is empty after deploy the second build", () => {
    cy.task("startPetclinicMicroservice", { build: "0.2.0" });
    cy.wait(15000);

    cy.get('[data-test="test-to-code-plugin:list-row"]').each(($row) => {
      const serviceCoverage = $row.find('[data-test="dashboard-coverage-cell:value"]').text();
      const serviceBuild = $row.find('[data-test="test-to-code-name-cell:additional-information"]').text();
      expect(serviceCoverage).to.be.eq("0%");
      expect(serviceBuild).to.be.eq("Build: 0.2.0");
    });

    cy.get('[data-test="dashboard-header-cell:coverage:value"]').should("have.text", "0%");
  });

  it("Check the risks after deploy the second build", function () {
    cy.get('[data-test="test-to-code-plugin:list-row"]').each(($row) => {
      const serviceName = $row.find('[data-test="test-to-code-name-cell:name-cell"]').text();
      const serviceRisks = $row.find('[data-test="dashboard-cell:value:risks"]').text();
      expect(this.data.builds["0.2.0"][serviceName].initialRisks).to.be.eq(serviceRisks);
    });

    cy.get('[data-test="dashboard-header-cell:risks:value"]').should("have.text", this.data.builds["0.2.0"].summary.initialRisks);
  });

  it("Should open tests to run modal after click to link in header", function () {
    cy.get('[data-test="dashboard-header-cell:tests-to-run:value"] a').click();
    cy.get('[data-test="tests-to-run-modal:tests-list:test"]').should("have.length", this.data.builds["0.2.0"].summary.initialTestsToRun);
    cy.get('[data-test="modal:close-button"]').click();
  });

  it("Finish all scopes after collect coverage on second build", function () {
    cy.task("startPetclinicMicroserviceAutoTests", {}, { timeout: 200000 });

    cy.intercept("POST", `/api/groups/${this.data.id}/plugins/test2code/dispatch-action`).as("finish-all-scopes");

    cy.get('[data-test="menu:icon:test-to-code-plugin:header-cell:actions"]').first().click({ force: true });
    cy.get('[data-test="menu:item:finish-all-scopes"]').first().click();
    cy.get('[data-test="finish-all-scopes-modal:submit-button"]').first().click();

    cy.wait("@finish-all-scopes", { timeout: 30000 }).its("response.statusCode").should("eq", 200);
  });

  it("Check the coverage percentage after deploy the second build and collect coverage", function () {
    cy.get('[data-test="test-to-code-plugin:list-row"]').each(($row) => {
      const serviceName = $row.find('[data-test="test-to-code-name-cell:name-cell"]').text();
      const serviceCoverage = $row.find('[data-test="dashboard-coverage-cell:value"]').text();
      expect(this.data.builds["0.2.0"][serviceName].coverage).to.be.eq(serviceCoverage);
    });

    cy.get('[data-test="dashboard-header-cell:coverage:value"]').should("have.text", this.data.builds["0.2.0"].summary.coverage);
  });

  it("Check the risks after deploy the second build", function () {
    cy.get('[data-test="test-to-code-plugin:list-row"]').each(($row) => {
      const serviceName = $row.find('[data-test="test-to-code-name-cell:name-cell"]').text();
      const serviceRisks = $row.find('[data-test="dashboard-cell:value:risks"]').text();
      expect(this.data.builds["0.2.0"][serviceName].risksAfterRunTests).to.be.eq(serviceRisks);
    });

    cy.get('[data-test="dashboard-header-cell:risks:value"]').should("have.text", this.data.builds["0.2.0"].summary.risksAfterRunTests);
  });

  it("Check the tests to run after deploy the second build", function () {
    cy.get('[data-test="test-to-code-plugin:list-row"]').each(($row) => {
      const serviceName = $row.find('[data-test="test-to-code-name-cell:name-cell"]').text();
      const serviceRisks = $row.find('[data-test="dashboard-cell:value:tests-to-run"]').text();
      expect(this.data.builds["0.2.0"][serviceName].testsToRunAfterRunTests).to.be.eq(serviceRisks);
    });

    cy.get('[data-test="dashboard-header-cell:tests-to-run:value"]')
      .should("have.text", this.data.builds["0.2.0"].summary.testsToRunAfterRunTests);
  });
});
