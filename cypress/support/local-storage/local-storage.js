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
const LOCAL_STORAGE_METHODS = ["setItem", "getItem", "removeItem", "clear"];

function logDisabled(method) {
  return function () {
    this._cy.log(`localStorage.${method} is disabled`);
  };
}

function logDisabledMethodName(localStorageMethod) {
  return `_log${localStorageMethod}Disabled`;
}

export class LocalStorage {
  static get cypressCommands() {
    return [
      "clearLocalStorageSnapshot",
      "saveLocalStorage",
      "restoreLocalStorage",
      "setLocalStorage",
      "getLocalStorage",
      "removeLocalStorage",
      "disableLocalStorage",
    ];
  }

  constructor(localStorage, cy) {
    this._cy = cy;
    this._localStorage = localStorage;
    LOCAL_STORAGE_METHODS.forEach((localStorageMethod) => {
      this[logDisabledMethodName(localStorageMethod)] = logDisabled(localStorageMethod).bind(this);
    });
    this.clearLocalStorageSnapshot();
  }

  clearLocalStorageSnapshot() {
    this._snapshot = {};
  }

  saveLocalStorage() {
    if (!this._localStorage.getItem.wrappedMethod) {
      Object.keys(this._localStorage).forEach((key) => {
        this._snapshot[key] = this._localStorage.getItem(key);
      });
    }
  }

  restoreLocalStorage() {
    Object.keys(this._snapshot).forEach((key) => {
      this._localStorage.setItem(key, this._snapshot[key]);
    });
  }

  getLocalStorage(key) {
    return this._localStorage.getItem(key);
  }

  setLocalStorage(key, value) {
    return this._localStorage.setItem(key, value);
  }

  removeLocalStorage(key) {
    return this._localStorage.removeItem(key);
  }

  disableLocalStorage(options = {}) {
    this._cy.on("window:before:load", (win) => {
      if (
        win.localStorage &&
                !win.localStorage[LOCAL_STORAGE_METHODS[0]].wrappedMethod &&
                !this._localStorage[LOCAL_STORAGE_METHODS[0]].wrappedMethod
      ) {
        LOCAL_STORAGE_METHODS.forEach((localStorageMethod) => {
          this._cy
            .stub(this._localStorage, localStorageMethod)
            .callsFake(this[logDisabledMethodName(localStorageMethod)]);
          this._cy.stub(win.localStorage, localStorageMethod).throws(options.withError);
        });
      }
    });
  }
}
