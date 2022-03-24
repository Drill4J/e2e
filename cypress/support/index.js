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
import "@reportportal/agent-js-cypress/lib/commands/reportPortalCommands";
import { register } from "./local-storage/register";
import "./report-portal";
import "./commands";
import "./tests/methods-table";
import "./tests/tests-table";
import "./tests/covered-methods-pane";
import "./tests/associated-tests-pane";
import "./tests/risks-count-in-the-cards";
import "./tests/risks-table";
import "./tests/tests-to-run-table";
import "./start-admin";
import "./tests/covered-methods-pane-with-methods-check";

register(Cypress, cy, localStorage);
