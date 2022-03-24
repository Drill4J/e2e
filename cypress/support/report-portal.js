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
import rpMetaData from "../../report-portal-metadata.json";

before("Send metadata to report portal", () => {
  if (!process.env.REPORT_PORTAL_TOKEN) {
    Cypress.env("reporterOptions.token", ""); // don`t send data to rp when tests running local
  }
  if (process.env.REPORT_PORTAL_TOKEN) { // it means that we run this tests in GH
    const data = JSON.parse(rpMetaData);
    Cypress.env("reporterOptions.launch", data[REPORT_ENV_KEYS.SETUP_ID]);
    cy.setTestDescription(data[REPORT_ENV_KEYS.SETUP_ID]);
    cy.addTestAttributes([
      {
        key: REPORT_ENV_KEYS.LINK_TO_RUN,
        value: data[REPORT_ENV_KEYS.LINK_TO_RUN],
      },
      {
        key: REPORT_ENV_KEYS.INITIATOR,
        value: data[REPORT_ENV_KEYS.INITIATOR],
      },
      {
        key: REPORT_ENV_KEYS.TEST_PARAMS,
        value: data[REPORT_ENV_KEYS.TEST_PARAMS],
      },
      {
        key: REPORT_ENV_KEYS.VERSIONS,
        value: data[REPORT_ENV_KEYS.VERSIONS],
      },
    ]);
  }
});
