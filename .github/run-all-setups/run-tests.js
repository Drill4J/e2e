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
const axios = require("axios");
const core = require("@actions/core");
const github = require("@actions/github");

try {
    const setupsConfig = JSON.parse(fs.readFileSync("./setups.json", "utf8"));
    const { versions, initiator } = github.context.payload.client_payload;

    axios.get("https://raw.githubusercontent.com/Drill4J/vee-ledger/main/ledger.json").then(async ({data: ledgerData}) => {
        const {setups} = ledgerData;

        core.setOutput("env", JSON.stringify(
            versions.reduce((acc, {componentId, tag}) => ({...acc, [componentId]: tag}), {}),
        ));

        for (const setup of setups) {
            const {params = [], cypressEnv, file} = setupsConfig[setup.id];

            for(const param of params) {
                await axios.post("https://api.github.com/repos/Drill4J/e2e/dispatches", {
                    event_type: "run_setup",
                    client_payload: {
                        params: param,
                        cypressEnv,
                        versions,
                        specFile: file,
                        setupId: setup.id,
                        initiator
                    }
                }, {
                    headers: {
                        "Authorization": `Bearer ${core.getInput('access_token')}`
                    }
                })
            }
        }

    });
} catch (err) {
    console.log(err.message);
    core.setOutput("status", "failed");
}
