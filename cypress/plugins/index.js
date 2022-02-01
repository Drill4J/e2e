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
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

const registerReportPortalPlugin = require("@reportportal/agent-js-cypress/lib/plugin");
const {
  ping, promisifiedExec, dockerComposeUp,
} = require("./utils");
const adminScripts = require("./admin");
const singlejavaAgentScripts = require("./single-java-agent");
const microserviceJavaAgentsScripts = require("./microservice-java-agents");

module.exports = (on) => {
  on("task", {
    ...adminScripts,
    ...singlejavaAgentScripts,
    ...microserviceJavaAgentsScripts,
    async startPetclinicMultinstaces({ build = "0.1.0" }) {
      const log = await dockerComposeUp(
        "./docker/multinstances-single-java-agent.yml",
        `./docker/multinstances-single-java-agent-${build}.env`,
      );
      console.log(log);
      try {
        await ping("http://localhost:8087");
        console.log("Petclinic is available");
      } catch (e) {
        console.log("Petclinic is not available");
      }
      return null;
    },
    async startPetclinicMultinstacesAutoTests() {
      const log = await promisifiedExec("docker-compose -f ./docker/multinstances-single-java-agent-tests.yml up");
      console.log(log);
      console.log("petclinic tests container exited");
      return null;
    },
  });
};
