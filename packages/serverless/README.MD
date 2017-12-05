# Pluto Serverless Application

This is the server powering the Pluto network. Our architecture utilizes the following packages:

* [Serverless Framework](https://serverless.com/framework/docs/)
* [ExpressJS](https://expressjs.com/)
* [Graphcool BaaS](https://www.graph.cool/docs)

![Backend Architecture](./documents/ServerlessArchitecture.png)

Wrapping express will allow us to use already feature complete packages with known best practices. Using `serverless` will allow us to handle scaling out-of-the-box (OOTB) as AWS will manage firing up extra lambda functions. It is important you have a grasp of what exactly a [lambda function](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html) is and what it does.

## Getting Started

To set up your dev environment please see the following steps:

1. Hello world
1. This sucks.
1. What am I doing

1. Clone the repo.
1. Install [docker](https://www.docker.com/) on your local machine
1. `npm i -g graphcool`
1. Make sure you are authenticated with Graphcool
    ```bash
    graphcool login
    ```
1. Build the local graphcool dev containers - `graphcool local up`
1. Set your local webhook server URL in your environment (this must be done for every new shell opening - it does not persist after shell close). You can alternatively add this to your permanant environment variables on your system.

   * If on linux/windows you will run something like `export WEBHOOK_SERVER_URL=http://[YOUR_COMPUTER_NETWORK_IP]:4000`
   * If on mac you will run `export WEBHOOK_SERVER_URL=http://docker.for.mac.localhost:4000`
1. Deploy the built images - `graphcool deploy`
1. Once you deploy you will get a confirmation of you environment setup from graphcool. It will specify the endpoints that are setup locally. You will need these addresses for starting the local lambda funcion-as-a-service (FaaS)

   ![GraphcoolEndpointConfirmation](./documents/GraphcoolConfirmation.png)

1. Now you have installed your Graphcool Baas, time to boot up the lambda server. You will want to install packages with `yarn` so make sure you have that installed. If you don't see [this](https://yarnpkg.com/en/docs/install).
1. Run `yarn` to install related dependencies (you must be in `/serverless` folder)
1. Configure your `env.yml`. A current sample looks like this:

    ```yaml
    dev:
      GRAPHCOOL_SIMPLE_ENDPOINT: http://localhost:60000/simple/v1/cj8vtv36b00050141qxbyj01d
      GRAPHCOOL_SUBSCRIPTION_ENDPOINT: ws://localhost:60000/subscriptions/v1/cj8vtv36b00050141qxbyj01d
      GRAPHCOOL_FILE_ENDPOINT: https://api.graph.cool/file/v1/toktumi-dev
      GRAPHCOOL_AUTH_TOKEN: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDQzOTUwOTIsImNsaWVudElkIjoiY2l6aDRvYWlnYjl4ZTAxNjlob3dtdmdlaiIsInByb2plY3RJZCI6ImNqM2wwb2E5cjF1YWIwMTMwczhudGk3M2siLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqNzN4enVyOTAzMngwMTAwaGFoZWRmb3YifQ.GP19fBm8bzInd-J63rvPkP6ubtYDEBHvDXQZzpv294A
      POSTMARK_API_KEY: 39f2eefa-fc15-491e-be83-64a3ec84a4cc
      PLUTO_CLIENT_DOMAIN: https://toktumi-client.ngrok.io
      TWILIO_ACCOUNT_SID: AC06df83fc1d697ef78b413b465c8ae138
      TWILIO_VIDEO_API_KEY_SID: SKe22d54a9ea21b39ee8fa25e8ea794fab
      TWILIO_VIDEO_API_KEY_SECRET: 1u6RoBUsHpagW8kw8QuqMJqom75x1Fcb
      TWILIO_CHAT_SERVICE_SID: IS2d57b75ef6724d38aeca3bcfebbd663f
    ```

   **Note**: you can get your `GRAPHCOOL_AUTH_TOKEN` for `env.yml` by executing `graphcool root-token adminToken` in your console.

1. You will need to add `graphcool` to your `/etc/hosts` file. You can do that by adding the following line to the bottom of the file:
    ```plaintext
    0.0.0.0         graphcool
    ```
1. Now you can start your local dev server
    ```bash
    yarn start:dev
    ```
  Your environment should be running at `0.0.0.0:4000`