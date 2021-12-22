# e2e

## For development

For development you need a [node.js](https://nodejs.org).

To launch the development environment, follow these steps:

1.  open console from the project root
2.  run the command `npm install`
3.  run the command `cypress open`
4.  start docker  
6.  enjoy the development.

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
