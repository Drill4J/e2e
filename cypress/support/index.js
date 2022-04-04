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
import "./tests/login";
import "./tests/register-agent";
import "./tests/register-group";
import "./tests/finish-scope";
import "./tests/finish-all-scopes";

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;
Cypress.on("uncaught:exception", (err) => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false;
  }
});

register(Cypress, cy, localStorage);
