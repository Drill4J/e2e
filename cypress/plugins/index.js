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
// eslint-disable-next-line no-unused-vars
const { exec } = require("child_process");
const { writeFile } = require("fs");
const axios = require("axios");

module.exports = (on) => {
  on("task", {
    async removeContainers() {
      const containersIds = await promisifiedExec("docker ps -aq");
      if (containersIds) {
        const stoppedIds = await promisifiedExec(`docker stop ${containersIds.replaceAll(/\s+/g, " ")}`);
        console.log(`Stopped containers: ${stoppedIds}`);
        const removedIds = await promisifiedExec(`docker rm ${containersIds.replaceAll(/\s+/g, " ")}`);
        console.log(`Removed containers: ${removedIds}`);
        await promisifiedExec("docker volume prune -f");
        await promisifiedExec("docker network prune -f");
      }
      return null;
    },
    async startAdmin() {
      const containersIds = await dockerComposeUp("./docker/docker-compose.admin.yml", "./docker/docker-compose.admin.env");
      console.log(`Started containers: ${containersIds}`);
      await ping("http://localhost:9090/apidocs/index.html?url=./openapi.json");
      console.log("BE is available");
      return null;
    },
    async startPetclinic({ build = "0.1.0" }) {
      await dockerComposeUp(
        "./docker/single-java-agent.yml",
        `./docker/single-java-agent-build-${build}.env`,
      );
      await ping("http://localhost:8087");
      console.log("Petclinic is available");
      return null;
    },
    async startPetclinicMicroservice({ build = "0.1.0" }) {
      await dockerComposeUp(
        "./docker/microservice-java-agents.yml",
        `./docker/microservice-java-agents-build-${build}.env`,
      );
      await ping("http://localhost:8080/#!/welcome");
      console.log("Petclinic is available");
      return null;
    },
    async startPetclinicMultinstaces({ agentId = "pet-multinstances", build = "0.1.0" }) {
      const data = `
      adminAddress=drill-admin:8090
      PET_STANDALONE_BUILD=${build}
      PET_STANDALONE_BUILD_NODE_1=${build}
      PET_STANDALONE_BUILD_NODE_2=${build}
      AGENT_VERSION=latest
      agentId=${agentId}
      LOG_LEVEL=DEBUG
      PET_NODE_1_PORT=8085
      PET_NODE_2_PORT=8086
      BALANCER_PORT=8087
      `;
      writeFile("./docker/multinstances-single-java-agent.env", data, "utf-8", (err) => {
        if (err) {
          console.log(err.message);
        }
      });
      await promisifiedExec(
        "docker-compose -f ./docker/multinstances-single-java-agent.yml --env-file ./docker/multinstances-single-java-agent.env up -d",
      );
      return null;
    },
    async startPetclinicAutoTests() {
      await promisifiedExec("docker-compose -f ./docker/single-java-agents-tests.yml --env-file ./docker/single-java-agents-tests.env up");
      console.log("petclinic tests container exited");
      return null;
    },
    async startPetclinicMultinstacesAutoTests() {
      await promisifiedExec("docker-compose -f ./docker/single-java-agents-tests.yml --env-file ./docker/single-java-agents-tests.env up");
      console.log("petclinic tests container exited");
      return null;
    },
    async startPetclinicMicroserviceAutoTests() {
      await promisifiedExec("docker-compose -f ./docker/microservice-java-agents-tests.yml up");
      return null;
    },
    async stopPetclinicMicroservice() {
      const containersName = ["api-gateway", "config-server", "tracing-server",
        "discovery-server", "vets-service", "visits-service", "customers-service", "agent-files"];
        // eslint-disable-next-line no-restricted-syntax
      for (const name of containersName) { // TODO make it parallel
        // eslint-disable-next-line no-await-in-loop
        await dockerStopAndRmService(name);
      }
      return null;
    },
  });
};

function promisifiedExec(command) {
  return new Promise((resolve, reject) => {
    exec(command, {}, (err, out) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(out);
    });
  });
}

async function dockerComposeUp(composePath, envFilePath) {
  return promisifiedExec(`docker-compose -f ${composePath} --env-file ${envFilePath} up -d`);
}

async function dockerStopAndRmService(serviceName) {
  return promisifiedExec(`docker stop ${serviceName} && docker rm ${serviceName}`);
}

async function ping(url) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const intervalId = setInterval(async () => {
      count += 1;
      try {
        const res = await axios.get(url);
        if (res.status === 200) {
          clearInterval(intervalId);
          resolve();
        }
      } catch (e) {
        if (count > 40) {
          clearInterval(intervalId);
          reject();
        }
      }
    }, 3000);
  });
}
