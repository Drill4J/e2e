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
/// <reference types="cypress"
import axios from "axios";

const finishActiveScopePath = `/agents/${Cypress.env("SINGLE_JAVA_AGENT_ID")}/plugins/test2code/dispatch-action`;

context("When tests finished executing and active scope is finished", () => {
  before(() => {
    cy.task("startPetclinicAutoTests", {}, { timeout: 200000 });
    cy.intercept("POST", finishActiveScopePath).as("finish-active-scope");

    cy.wrap(null).then(async () => {
      axios.post(finishActiveScopePath, {
        type: "SWITCH_ACTIVE_SCOPE",
        payload: { scopeName: "" },
      });
    });

    cy.wait("@finish-active-scope");
  });

  context('The "Covered Methods" pane', () => {
    it("should contain associated tests list", () => {

    });
  });
});
