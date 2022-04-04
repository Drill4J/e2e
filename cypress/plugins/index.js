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
const adminScripts = require("./admin");
const singlejavaAgentScripts = require("./single-java-agent");
const microserviceJavaAgentsScripts = require("./microservice-java-agents");
const singleJsAgentScripts = require("./single-js-agent");
const multiinstancesJavaAgentScripts = require("./multiinstance-java-agent");

module.exports = (on) => {
  on("task", {
    ...adminScripts,
    ...singlejavaAgentScripts,
    ...microserviceJavaAgentsScripts,
    ...singleJsAgentScripts,
    ...multiinstancesJavaAgentScripts,
  });
  if (process.env.REPORT_PORTAL_TOKEN) { // it means that we run this tests in GH
    registerReportPortalPlugin(on);
  }
};
