# e2e

## Development
**Prerequisite:**
1. [Node.js](https://nodejs.org). 
I recommend to using nodejs 14 version because with 16 versions cypress working unstable.
2. [Docker](https://www.docker.com/products/docker-desktop/)   

To launch the development environment, follow these steps:

1.  open console from the project root
2.  run the command `npm install`
3.  run the command `cypress open`
4.  start docker  
5.  enjoy the development.



## Examples of starting setups in headless mode 

### Single Java Agent

## For start single java agent tests

``
cypress run --spec ./cypress/integration/single-java-agent/single-java-agent-gradle.spec.js
``
## For up single java agent with using docker 
```
docker-compose -f docker-compose.admin.yml --env-file docker-compose.admin.env up -d
docker-compose -f single-java-agent.yml --env-file single-java-agent-build-0.1.0.env up -d
```
Registr agent petclinic in drilladmin
```
docker-compose -f single-java-agent-tests.yml up -d
```

## For up microservice java agent with using docker
```
docker-compose -f docker-compose.admin.yml --env-file docker-compose.admin.env up -d
docker-compose -f microservice-java-agents.yml --env-file microservice-java-agents-build-0.1.0.env up -d
```
Registr group in drilladmin
```
docker-compose -f microservice-java-agents-tests.yml up -d
```


## Notes

### Clear docker environment

Before running every spec files scripts will remove all your docker containers and volumes.
The code responsible for this stay in `cypress/support/start-admin.js`

To disable it you need:
1. Open `cypress/support/start-admin.js`
2. Comment `cy.task("removeContainers");`

### Local storage hack

Since all our tests are dependent on the previous steps, and we store the authorization token in local storage, 
we decided to disable storage cleanup before each test.

Implementation:
Inside the "before" hook after the login step you need to add this code
```
    Cypress.LocalStorage.clear = () => {};
```
 
### Known problems 

1. After the group registration on Test2Code page you can see not all registered agents. 
   To fix it you should finish all scope. And after it all agents should display in Test2Code table
2. After the collect coverage multiple times via autotests you can see floating coverage. 
   It assigns with petclinic caching. To fix it you need to run ` cy.task("stopPetclinicMicroservice)"` or `cy.task("stopPetclinic")` command between tests running.
