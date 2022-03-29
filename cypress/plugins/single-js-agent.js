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
const { promisifiedExec, ping, dockerStopAndRmService } = require("./utils");

exports.startToDoMVC = async ({ build = "0.1.0" }) => {
  const log = await promisifiedExec(
    "docker-compose -f ./docker/single-js-agent.yml --env-file ./docker/.env up -d",
    { env: { ...process.env, BUILD: build } },
  );
  console.log("todo-mvc container started", log);

  try {
    await ping("http://localhost:6072");
    console.log("todo-mvc is available");
  } catch (e) {
    console.log("todo-mvc is not available");
  }
  return null;
};

exports.stopToDoMVC = async () => {
  await dockerStopAndRmService("todo-mvc");
  console.log("todo-mvc container stopped");
  return null;
};

exports.startToDoMVCAutotests = async () => {
  await fs.writeFile("./todo-mvc-autotests-log", "Autotests started", { flag: "a+" }, (err) => {
    if (err) return console.log(err);
  });
  await promisifiedExec("docker-compose -f ./docker/single-js-agent-tests.yml --env-file ./docker/.env up", { }, async (data) => {
    await fs.writeFile("./todo-mvc-autotests-log", data, { flag: "a+" }, (err) => {
      if (err) return console.log(err);
    });
  });
  console.log("todo-mvc tests container exited");
  return null;
};
