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

export const startNewBuildAndGoToTest2Code = (build = "0.1.0") => {
  cy.task("startPetclinic", { build });

  cy.get("a").contains("builds").click();
  cy.contains("a", build, { timeout: 120000 }).click({ force: true });
  cy.contains("div", "Online", { timeout: 120000 }); // agent is not BUSY
  cy.get('[data-test="sidebar:link:Test2Code"]').click();
};
