# DEVS PORTAL

Rest API for LarnU Full-stack Bootcamp's final project for our graduation.

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [How Initialize Project From Scratch](#how_initialize_project_from_scratch)
- [Database Commands](#database_commands)
- [Usage](#usage)
- [Contributing](#contributing)

## About

DEVS PORTAL is a web app where graduated LarnU students can be contacted and show their skills to recruiters
and future employers.

<br>

> IMPORTANT:
>
> ### Create a .env file like sample.env for your configurations in the root of your project.

<br>

## Getting_Started

<br>

### 1. Installation:

```bash
  git clone <this_repo_url>
  npm i && sudo npm install -g firebase-tools && sudo apt install default-jdk
  npm run db:up # resets db & runs migrations & seeders
```

### 2. Authenticate to Firebase with:

```bash
  # generates google application credential file for Firebase login
  node ./src/services/firebase/genGoogleCrendentials.js

  # export our private_key
  export GOOGLE_APPLICATION_CREDENTIALS=~/larnU_bootcamp/devs_portal_backend/src/services/firebase/larnu-devs-portal-2ba51ded54fa.json

  # CHECKING
  echo $GOOGLE_APPLICATION_CREDENTIALS

  # Run firebase Emulators
  firebase emulators:start
```

### 3. Run the Dev Server

```bash
  npm run dev:start
```

<br>

## How_Initialize_Project_From_Scratch

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

How to set the environment from scratch.

```bash
  npm init --y
```

Then we install all dependecies and devDependencies with
npm i [dependencies] & npm i --save-dev [devDependencies]

```bash
  npx tsc --init
  npx ts-jest config:init
  npm init @eslint/config
```

## Database_Commands

```bash
  npm run db:up
  npm run db:create
  npm run db:drop
  npm run db:seed
  npm run typeorm migration:generate ./src/migrations/<migration_name>
  npm run typeorm migration:run # runs all migrations
  npm run typeorm migration:revert # reverts all migrations
  npm run typeorm -d <your-data-source-path> migration:{run|revert} # runs or reverts migration by file
```

## Thunder-Client

Install thunder-client vscode extension to save the collections into our workspace.

```bash
  ctrl + shift + p
```

Open Preferences: User Settings (JSON) vscode command palette and insert
into settings.json:

```json
{ "thunder-client.saveToWorkspace": true }
```

Then you can visualise the folder thunder-tests to test the endpoints and save any change or test.

<br>

## Firebase Service Account Authentication

In order to install firebase-cli and login without opening a browser window and use CI/CD workflow

Now go to the following link:

https://firebase.google.com/docs/app-distribution/authenticate-service-account?platform=ios

```bash
  # INSTALLATION
  sudo npm install -g firebase-tools

  # AUTHENTICATION
  export GOOGLE_APPLICATION_CREDENTIALS=~/larnU_bootcamp/devs_portal_backend/src/services/firebase/larnu-devs-portal-2ba51ded54fa.json

  echo $GOOGLE_APPLICATION_CREDENTIALS
  $ /home/cesar/larnU_bootcamp/devs_portal_backend/src/services/firebase/larnu-devs-portal-2ba51ded54fa.json
```

## Install Java

```bash
  sudo apt update
  sudo apt install default-jdk
```

## Firebase first steps

```bash
  firebase --version
  firebase --help # list all commands
  firebase init
  or
  firebase init emulators # firestore, hosting, etc...
```

## Initialize Firebase/Storage Emulator

```bash
  firebase emulators:start --only storage # firestore, hosting, etc...

  # FOR CI/CD WORKFLOWS
  firebase emulators:exec <scriptCommand> # "npm run test:start", etc...
```

## Contributing

- [@josseed](https://github.com/josseed)
- [@sefhirothxd](https://github.com/sefhirothxd)
- [@rvelascomosquera](https://github.com/rvelascomosquera)
- [@Ellisvelandia](https://github.com/Ellisvelandia)
- [@T0ny-dev](https://github.com/T0ny-dev)
- [@isavalenzuela](https://github.com/isavalenzuela)
- [@CesarAugusto316](https://github.com/CesarAugusto316)
