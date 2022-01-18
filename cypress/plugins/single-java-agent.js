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

exports.startPetclinic = async ({ build = "0.1.0" }) => {
  const log = await promisifiedExec(
    "docker-compose -f ./docker/single-java-agent.yml --env-file ./docker/.env up -d",
    { env: { ...process.env, PET_STANDALONE_BUILD: build } },
  );
  console.log("petclinic container started", log);

  try {
    await ping("http://localhost:8087");
    console.log("Petclinic is available");
  } catch (e) {
    console.log("Petclinic is not available");
  }
  return null;
};

exports.stopPetclinic = async () => {
  await dockerStopAndRmService("spring-petclinic-sample");
  return null;
};

exports.startPetclinicAutoTests = async ({
  autotestsParams = ":testng:test -Dtestng.dtd.http=true",
  autotestsImage = "drill4j/petclinic-autotests-execute:0.3.1",
}) => {
  const log = await promisifiedExec("docker-compose -f ./docker/single-java-agent-tests.yml --env-file ./docker/.env up",
    { env: { ...process.env, AUTOTESTS_PARAMS: autotestsParams, AUTOTESTS_IMAGE: autotestsImage } });
  console.log(log);
  console.log("petclinic tests container exited");
  return null;
};
