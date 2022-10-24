# DEVS PORTAL

Rest API for LarnU Full-stack Bootcamp's final project for our graduation.

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](#contributing)

## About

DEVS PORTAL is a web app where graduated LarnU students can be contacted and show their skills to recruiters
and future employers.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

```bash
  git clone <this_repo_url>
  npm i
```

<br>

> IMPORTANT:
>
> ### Create a .env file like sample.env for your configurations in the root of your project.

<br>

## Database commands:

```bash
  npm run db:reset
  npm run db:create
  npm run db:drop
  npm run db:seed
  npm run typeorm migration:generate ./src/migrations/<migration_name>
  npm run typeorm migration:run # runs all migrations
  npm run typeorm migration:revert # reverts all migrations
  npm run typeorm -d <your-data-source-path> migration:{run|revert} # runs or reverts migration by file
```

## Starting the server:

Run before starting the server:

```bash
  npm run db:reset # resets db & runs migrations & seeders
```

or

```bash
  npm run db:create # only creates the db if doesn't exist
```

Once the database is created or reset and migrations are run automatically, then we can start our express app.

```bash
  npm run dev:start
  npm run dev:debug
  npm run dev:lint

  npm run test:start
  npm run test:watch
  npm run test:coverage
```

## Usage

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

<br>

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

## Contributing

- [@josseed](https://github.com/josseed)
- [@sefhirothxd](https://github.com/sefhirothxd)
- [@rvelascomosquera](https://github.com/rvelascomosquera)
- [@Ellisvelandia](https://github.com/Ellisvelandia)
- [@T0ny-dev](https://github.com/T0ny-dev)
- [@isavalenzuela](https://github.com/isavalenzuela)
- [@CesarAugusto316](https://github.com/CesarAugusto316)
