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
const { exec } = require("child_process");
const semver = require("semver");
const axios = require("axios");

try {
  const artifacts = JSON.parse(fs.readFileSync("./artifact.json", "utf8"));
  const [publishedArtifact, version] = Object.entries(JSON.parse(process.env.actionPayload))[0];

  axios.get("https://raw.githubusercontent.com/Drill4J/vee-ledger/main/ledger.json").then(async ({ data: ledgerData }) => {
    const { setups } = ledgerData;

    const versions = getLatestVersions(ledgerData).map(({ componentId, tag }) => {
      if (componentId === publishedArtifact) {
        return { tag: version.replace("v", ""), componentId };
      }
      return { tag: tag.replace("v", ""), componentId };
    });

    versions.forEach(({ componentId, tag }) => {
      const newLineChar = process.platform === "win32" ? "\r\n" : "\n";
      const { env } = artifacts[componentId];
      fs.writeFileSync("./docker/.env", `${newLineChar}${env}=${tag}`, { flag: "a" });
    });
    const artifactSetups = setups.filter(({ componentIds }) => componentIds.includes(publishedArtifact));

    artifactSetups.forEach(async ({ id }) => {
      try {
        await promisifiedExec(`cypress run  --spec 'cypress/integration/${id}/${id}.spec.js'`);
      } catch (e) {
        console.log(`Failed ${id}`, e.message);
      }
    });
  });
} catch (err) {
  console.error(err);
}

// actionPayload="{\"test2code-ui\": \"0.1.0-93\"}" node start-tests.js

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

function getLatestVersions(ledgerData) {
  return ledgerData.components.map(x => x.id).map((componentId) => ledgerData.versions
    .filter(x => x.componentId === componentId).sort((a, b) => semver.compare(b.tag, a.tag))[0]);
}
