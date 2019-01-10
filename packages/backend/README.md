# coding-challenge: backend

This workspace contains the back-end of the website infrastructure which respond to handle API requests.

<!-- TOC -->

- [coding-challenge: backend](#coding-challenge-backend)
  - [Package scripts](#package-scripts)
    - [`start`](#start)
    - [`dev`](#dev)
    - [`deploy`](#deploy)

<!-- /TOC -->

## Package scripts

### `start`

Run yarn dev. It's the script you want to run if you are working on the development of backend part.

### `dev`

Start the endpoint locally.

### `deploy`

Deploys the stack to AWS. Will default to `STAGE=dev` if no stage environment variable is provided (see: [serverless.yml](./serverless.yml)).
