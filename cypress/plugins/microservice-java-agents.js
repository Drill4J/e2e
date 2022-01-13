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
const { promisifiedExec, ping, dockerStopAndRmService } = require("./utils");

exports.startPetclinicMicroservice = async ({ build = "0.1.0" }) => {
  const log = await promisifiedExec(
    "docker-compose -f ./docker/microservice-java-agents.yml --env-file ./docker/.env up -d",
    { env: { ...process.env, PET_MCR_BUILD: build } },
  );
  console.log(log);
  try {
    await ping("http://localhost:8080/#!/welcome");
    console.log("Petclinic is available");
  } catch (e) {
    console.log("Petclinic is not available");
  }
  return null;
};

exports.stopPetclinicMicroservice = async () => {
  const containersName = ["api-gateway", "config-server", "tracing-server",
    "discovery-server", "vets-service", "visits-service", "customers-service", "agent-files"];
    // eslint-disable-next-line no-restricted-syntax
  for (const name of containersName) { // TODO make it parallel
    // eslint-disable-next-line no-await-in-loop
    await dockerStopAndRmService(name);
  }
  return null;
};

exports.startPetclinicMicroserviceAutoTests = async () => {
  const log = await promisifiedExec("docker-compose -f ./docker/microservice-java-agents-tests.yml --env-file ./docker/.env up");
  console.log(log);
  return null;
};
