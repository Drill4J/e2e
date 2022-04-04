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
const fs = require("fs");
const { promisifiedExec, ping } = require("./utils");

exports.removeContainers = async () => {
  const containersIds = await promisifiedExec("docker ps -aq");
  if (containersIds) {
    const stoppedIds = await promisifiedExec(`docker stop ${containersIds.replace(/\s+/g, " ")}`);
    console.log(`Stopped containers: ${stoppedIds}`);
    const removedIds = await promisifiedExec(`docker rm ${containersIds.replace(/\s+/g, " ")}`);
    console.log(`Removed containers: ${removedIds}`);
    await promisifiedExec("docker volume prune -f");
    await promisifiedExec("docker network prune -f");
  }
  return null;
};
exports.startAdmin = async () => {
  promisifiedExec("docker-compose -f ./docker/docker-compose.admin.yml up", {}, async (data) => {
    await fs.writeFile("./admin-logs", data, { flag: "a+" }, (err) => {
      if (err) return console.log(err);
    });
  });
  try {
    await ping("http://localhost:9090/apidocs/index.html?url=./openapi.json");
    console.log("BE is available");
  } catch (e) {
    console.log("BE is not available");
  }
  return null;
};
