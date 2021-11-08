# e2e
## For start multinstances single java agent tests
``
    cypress run --spec ./cypress/integration/single-agent/single-agent.spec.js --env startApplicationTaskName=startPetclinic,initialApplicationBuildVersion=0.1.0,secondApplicationBuildVersion=0.5.0,startApplicationTestsTaskName=startPetclinicAutoTests
``
