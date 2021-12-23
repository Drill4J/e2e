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
const {exec} = require("child_process");
const semver = require("semver");
const axios = require("axios");
const core = require("@actions/core");
const github = require("@actions/github");

try {
    const artifacts = JSON.parse(fs.readFileSync("./artifact.json", "utf8"));
    const setupsConfig = JSON.parse(fs.readFileSync("./setups.json", "utf8"));
    const [publishedArtifactId, publishedVersion] = Object.entries(github.context.payload.client_payload)[0];
    console.log(`Published artifact: ${publishedArtifactId} - ${publishedVersion}`);

    axios.get("https://raw.githubusercontent.com/Drill4J/vee-ledger/main/ledger.json").then(async ({data: ledgerData}) => {
        const {setups} = ledgerData;

        const versions = getLatestVersions(ledgerData).map((version) => {
            if (version.componentId === publishedArtifactId) {
                return {tag: publishedVersion, componentId: publishedArtifactId};
            }
            return version;
        });


        core.setOutput("env", JSON.stringify(
            versions.reduce((acc, {componentId, tag}) => ({...acc, [componentId]: tag}), {}),
        ));

        versions.forEach(({componentId, tag}) => {
            const newLineChar = process.platform === "win32" ? "\r\n" : "\n";
            const {env} = artifacts[componentId];
            fs.writeFileSync("./docker/.env", `${newLineChar}${env}=${tag.replace(/^v/, "")}`, {flag: "a"});
        });
        const artifactSetups = setups.filter(({componentIds}) => componentIds.includes(publishedArtifactId));

        // eslint-disable-next-line no-restricted-syntax
        try {
            for (const {id} of artifactSetups) {
                const {env, file} = setupsConfig[id];
                const parsedEnv = Object.entries(env).reduce((acc, [key, value]) => (acc ? `${acc},"${key}"="${value}"` : `"${key}"="${value}"`), "");
                const runTestsCommand = `$(npm bin)/cypress run --env ${parsedEnv}  --spec './cypress/integration/${file}/*'`
                console.log(`Run tests command: ${runTestsCommand}`)
                // eslint-disable-next-line no-await-in-loop
                await promisifiedExec(runTestsCommand);
            }
            core.setOutput("status", "passed");
        } catch (e) {
            core.setOutput("status", "failed");
        }
    });
} catch (err) {
    console.log(err.message);
    core.setOutput("status", "failed");
}

function promisifiedExec(command) {
    return new Promise((resolve, reject) => {
        const ls = exec(command, {}, (err, out) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(out);
        });
        ls.stdout.on('data', (data) => {
            console.log(data);
        });
        ls.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
        });

        ls.on('exit', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
}

function getLatestVersions(ledgerData) {
    return ledgerData.components.map(x => x.id).map((componentId) => ledgerData.versions
        .filter(x => x.componentId === componentId).sort((a, b) => semver.compare(b.tag, a.tag))[0]);
}

// actionPayload="{\"test2code-ui\": \"0.1.0-93\"}" node start-tests.js
