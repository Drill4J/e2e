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
const axios = require("axios");

exports.ping = async (url) => new Promise((resolve, reject) => {
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
      if (count > 80) {
        clearInterval(intervalId);
        reject();
      }
    }
  }, 3000);
});
