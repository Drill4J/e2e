# e2e

## Development

### Prerequisite

1. [Node.js](https://nodejs.org). I recommend to using nodejs 14 version because with 16 versions cypress working unstable.
2. [Docker](https://www.docker.com/products/docker-desktop/)

To launch the development environment, follow these steps:

1. open console from the project root
2. run the command `npm install`
3. run the command `cypress open`
4. start docker
5. enjoy the development.

## Structure of repository

* docker folder -  compose files for start applications and tests for it. All files has only one environment file: ``.env``
* cypress/support folder - common utilities functions and scripts that should execute before all tests
* cypress/plugins folder - tasks with scripts for start applications and tests for them
* setups.json - object with data for starting setups with using vee-table
* artifacts.json - object with ``key`` =  ``component id from vee-table``  and ``value`` = ``environment variable name for start using in docker compose files ``

## Single agent setup

### Environment

* startApplicationTaskName - task name that will up application up the docker
    * `startPetclinic`
    * `startToDoMVC`
    * `startPetclinicMultinstacesAutoTests`
* initialApplicationBuildVersion - string, that will pass to startApplicationTaskName task as an argument. Second build will compare with
  this version
    * `0.1.0` for `startPetclinic` and `startPetclinicMultinstaces`
    * `1.0.0` for `startToDoMVC`
* secondApplicationBuildVersion - string, that will pass to startApplicationTaskName task as an argument. Build will compare with
  initialApplicationBuildVersion
    * `0.2.0` for `startPetclinic` and `startPetclinicMultinstaces`
    * `2.0.0` for `startToDoMVC`
* startApplicationTestsTaskName - task name that will run tests for testing application
    * `startPetclinicAutoTests` for `startPetclinic` and `startPetclinicMultinstaces`
    * `startToDoMVCAutotests` for `startToDoMVC`
* autotestsImage - string, that will pass to startApplicationTestsTaskName task as an argument
    * `drill4j/petclinic-autotests-execute:0.3.2` for `startPetclinic` and `startPetclinicMultinstaces`
    * For `startToDoMVC` it is unnecessary variable
* autotestsParams - string, that will pass to startApplicationTestsTaskName task as an argument
    * `:testng:test -DtestNGVersion=7.4.0 -Dtestng.dtd.http=true` for `startPetclinic` and `startPetclinicMultinstaces`
    * `:junit5:test -Djunit5Version=5.8.0 --tests *.standalone.*` for `startPetclinic` and `startPetclinicMultinstaces`
    * `:junit4:test -Djunit4Version=4.13.2 --tests *.standalone.*` for `startPetclinic` and `startPetclinicMultinstaces`
    * For `startToDoMVC` it is unnecessary variable
* fixtureFile - key of **dataObject** object. Values of **dataObject** is json files with data for setups
    * `multinstances-single-java-agent`
    * `single-java-agent-testNG`
    * `single-java-agent-junit4`
    * `single-java-agent-junit5`
    * `single-js-agent`

### Default environment

* startApplicationTaskName - startPetclinic
* initialApplicationBuildVersion - 0.1.0
* secondApplicationBuildVersion - 0.2.0
* autotestsImage - drill4j/petclinic-autotests-execute:0.3.2
* autotestsParams - :testng:test -DtestNGVersion=7.4.0 -Dtestng.dtd.http=true
* fixtureFile - single-java-agent-testNG

### Starting cypress on Windows
```
$(npm bin)/cypress run --spec ...
```

### Examples of starting setups in headless mode

* with default parameters

  ```
  cypress run --spec ./cypress/integration/single-agent/single-agent.spec.js
  ```

* single java-agent with testNG runner

  ```
  cypress run --env "initialApplicationBuildVersion"="0.1.0","secondApplicationBuildVersion"="0.5.0","startApplicationTaskName"="startPetclinic","startApplicationTestsTaskName"="startPetclinicAutoTests","autotestsImage"="drill4j/petclinic-autotests-execute:0.3.2","autotestsParams"=":testng:test -DtestNGVersion=7.4.0 -Dtestng.dtd.http=true","fixtureFile"="single-java-agent-testNG"  --spec './cypress/integration/single-agent/single-agent.spec.js'
  ```

* single js-agent
  ```
  cypress run --env "initialApplicationBuildVersion"="1.0.0","secondApplicationBuildVersion"="2.0.0","startApplicationTaskName"="startToDoMVC","startApplicationTestsTaskName"="startToDoMVCAutotests","fixtureFile"="single-js-agent"  --spec './cypress/integration/single-agent/single-agent.spec.js'
  ```

## Microservice java agent setup environment

### Environment

* fixtureFile - key of **dataObject** object. Values of **dataObject** is json files with data for setups
    * `microservice-java-agents-testNG`

  Since there is only one parameter option, it can not be passed, it will be selected by default

### Example of starting setups in headless mode

``
    cypress run --spec ./cypress/integration/microservice-java-agents/microservice-java-agents.spec.js
``

## Single java agent with multiple scope setup environment

### Environment

* scopesCount

### Example of starting setup in headless mode

``
cypress run --spec ./cypress/integration/single-java-agent-with-multiple-scopes/single-java-agent-with-multiple-scopes.spec.js --env "scopesCount"="8"
``


## Github actions

* run-tests - started after the deploying some artifact in github
* manual-run-tests-for-component - start after manual trigger from vee-table
* run-all-setups - start after manual trigger from vee-table
* run-setup - start after manual trigger from vee-table or after api call in actions:
    * run-tests
    * manual-run-tests-for-component
    * run-all-setups

## How create a new setup 

### Vee-table

1. Click to Add "Setup" link in the header
2. Add uniq id for the setup
3. Add name for the setup
4. Select components that assign with this setup. After the publish some of selected component this setup will start
5. Click to "Submit" button

### E2E repo

1. Open ``cypress.json`` file
2. Add preperty with key = *uniq id* that we select in *vee-table* step and value = object with properties:
  * ``file`` - spec file
  * ``cypressEnv`` - object with not configured params that won`t send to *vee-table*
  * ``params`` - array with objects with configured params that will send to *vee-table* 
3. If you was create new component you need to update ``artifact.json``

## Notes

### Clearing docker environment

Before running every spec files scripts will remove all your docker containers and volumes. The code responsible for this is
in `cypress/support/start-admin.js`

To disable it you need:

1. Open `cypress/support/start-admin.js`
2. Comment out `cy.task("removeContainers");`

### Local storage hack

Since all our tests are dependent on the previous steps, and we store the authorization token in local storage, we decided to disable
storage cleanup before each test. 

If you were redirected to login page between tests you need to add inside the "before" hook after the login step 

```
    Cypress.LocalStorage.clear = () => {};
```

### Known problems

1. After the group registration on Test2Code page you can see not all registered agents. To fix it you should finish all scope. And after it
   all agents should display in Test2Code table
2. After the collect coverage multiple times with using autotests you can see floating coverage. It assigns with petclinic caching. To fix it you
   need to run ` cy.task("stopPetclinicMicroservice)"` or `cy.task("stopPetclinic")` command between tests running.
   


