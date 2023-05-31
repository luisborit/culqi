# Culqi dev test
## Local Deployment
-   In order have everything ready to deploy the project locally you will need:
    - To have node version 14.16.0
    - Have Redis installed and running on port 6379
    - Run npm i, in order to install the dependencies

- The project has two endpoints
    - /v2/tokens for store card and token information after certain validations
    - /v2/charges for retrive the card info except the cvv field, after the token validation

- package.json has two scripts available
    - dev: for create the build and deploy the application locally
    - jester: for testing three diferent tets suites with a individual test each one