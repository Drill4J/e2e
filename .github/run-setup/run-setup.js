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
const core = require("@actions/core");
const github = require("@actions/github");
const { REPORT_ENV_KEYS } = require("../../constants");


try {
    (async () => {
        const artifacts = JSON.parse(fs.readFileSync("./artifact.json", "utf8"));
        const {
            params, cypressEnv, versions, specFile, setupId, initiator,
            componentId: publishedComponentId, componentVersion: publishedComponentVersion
        } = github.context.payload.client_payload;
        const testEnv = {
            [REPORT_ENV_KEYS.LINK_TO_RUN]: `https://github.com/Drill4J/e2e/actions/runs/${github.context.runId}`,
            [REPORT_ENV_KEYS.TEST_PARAMS]: JSON.stringify(params),
            [REPORT_ENV_KEYS.VERSIONS]: JSON.stringify(versions.reduce((acc, {componentId, tag}) => ({...acc, [componentId]: tag}), {})),
            [REPORT_ENV_KEYS.INITIATOR]: JSON.stringify(initiator),
            [REPORT_ENV_KEYS.SETUP_ID]: setupId
        }

        let publishedArtifact = publishedComponentId && publishedComponentVersion
            ? `${github.context.payload.client_payload.componentId}: ${github.context.payload.client_payload.componentVersion}` : '';

        if (publishedArtifact) {
            console.log(`Published artifact: ${publishedArtifact}`);
            core.setOutput("releasedComponent", JSON.stringify({componentId: publishedComponentId, tag: publishedComponentVersion}));
        }

        core.setOutput('linkToRun', testEnv[REPORT_ENV_KEYS.LINK_TO_RUN]);
        core.setOutput('testParams', testEnv[REPORT_ENV_KEYS.TEST_PARAMS]);
        core.setOutput("setupId", testEnv[REPORT_ENV_KEYS.SETUP_ID]);
        core.setOutput("versions", testEnv[REPORT_ENV_KEYS.VERSIONS]);
        core.setOutput("initiator", testEnv[REPORT_ENV_KEYS.INITIATOR]);

        console.log(`Payload: ${JSON.stringify(github.context.payload.client_payload)}`)

        versions.forEach(({componentId, tag}) => {
            const newLineChar = process.platform === "win32" ? "\r\n" : "\n";
            const {env} = artifacts[componentId];
            fs.writeFileSync("./docker/.env", `${newLineChar}${env}=${tag.replace(/^v/, "")}`, {flag: "a"});
        });

        // eslint-disable-next-line no-restricted-syntax
        try {
            const parsedCypressEnv = Object.entries({...cypressEnv, ...params, ...testEnv}).reduce(parseCypressEnv, "");
            const runTestsCommand = `$(npm bin)/cypress run --env ${parsedCypressEnv}  --spec './cypress/integration/${specFile}/${specFile}*'`
            console.log(`Run tests command: ${runTestsCommand}`)
            // eslint-disable-next-line no-await-in-loop
            await promisifiedExec(runTestsCommand);
            core.setOutput("status", "passed");
        } catch (e) {
            console.log(e)
            core.setOutput("status", "failed");
        }
    })()
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
            fs.writeFileSync("./cypress-log", data.replace(
                /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''), {flag: "a"});
        });
        ls.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
        });

        ls.on('exit', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
}

function parseCypressEnv(acc, [key, value]) {
    return acc ? `${acc},"${key}"="${value}"` : `"${key}"="${value}"`
}

// actionPayload="{\"test2code-ui\": \"0.1.0-93\"}" node start-tests.js
