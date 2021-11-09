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
import { BASE_URL } from "../fixtures/constants.js";

export const manualLogin = () => {
  cy.visit(BASE_URL);
  cy.contains("Continue as a guest (with admin rights)").click().then(() => {
    const AUTH_TOKEN = localStorage.getItem("auth_token");
    expect(AUTH_TOKEN).to.not.equal(null);
    expect(AUTH_TOKEN).to.not.equal("");
    expect(AUTH_TOKEN).to.not.equal(undefined);
  });
};
