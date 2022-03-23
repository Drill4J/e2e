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
import { REPORT_ENV_KEYS } from "../../constants";

before("Send metadata to report portal", () => {
  if (process.env.REPORT_PORTAL_TOKEN) { // it means that we run this tests in GH
    const LINK_TO_RUN = Cypress.env(REPORT_ENV_KEYS.LINK_TO_RUN);
    const INITIATOR = Cypress.env(REPORT_ENV_KEYS.INITIATOR);
    const SETUP_ID = Cypress.env(REPORT_ENV_KEYS.SETUP_ID);
    const TEST_PARAMS = Cypress.env(REPORT_ENV_KEYS.TEST_PARAMS);
    const VERSIONS = Cypress.env(REPORT_ENV_KEYS.VERSIONS);
    Cypress.env("reporterOptions.launch", SETUP_ID);
    cy.addTestAttributes([
      {
        key: REPORT_ENV_KEYS.LINK_TO_RUN,
        value: LINK_TO_RUN,
      },
      {
        key: REPORT_ENV_KEYS.INITIATOR,
        value: INITIATOR,
      },
      {
        key: REPORT_ENV_KEYS.TEST_PARAMS,
        value: TEST_PARAMS,
      },
      {
        key: REPORT_ENV_KEYS.VERSIONS,
        value: VERSIONS,
      },
    ]);
  }
});
