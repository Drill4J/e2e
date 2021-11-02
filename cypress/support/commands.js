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
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import axios from "axios";
import { convertUrl } from "../utils";

const TOKEN_HEADER = "Authorization";
const TOKEN_KEY = "auth_token";

Cypress.Commands.add("login", { }, () => {
  cy.intercept("/api/login").as("login");

  cy.wrap(null).then(async () => {
    const response = await axios.post(convertUrl("/api/login"));
    const authToken = response.headers[TOKEN_HEADER.toLowerCase()];
    if (authToken) {
      localStorage.setItem(TOKEN_KEY, authToken);
    }
  });
  cy.wait(["@login"]);
});

Cypress.Commands.add("req", { }, (url) => ping(url));

async function ping(url) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const intervalId = setInterval(async () => {
      count += 1;
      try {
        const res = await axios.get(url);
        if (res.status === 200) {
          clearInterval(intervalId);
          resolve();
        }
      } catch (e) {
        if (count > 15) {
          clearInterval(intervalId);
          reject();
        }
      }
    }, 3000);
  });
}

Cypress.Commands.add("getByDataTest", (selector, ...args) => cy.get(`[data-test="${selector}"]`, ...args));
