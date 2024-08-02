# CommetTo-Backend &middot; [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE) ![Static Badge](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white) ![Static Badge](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Static Badge](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white) ![Static Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Static Badge](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)

> Addiontal information of your project

## Installing / Getting started

A quick introduction of the minimal setup you need to get a hello world up &
running.

```shell
npm install && npm run migrate-latest && npm run run migrate-seed
```

### Built With

Express, Knex and Typescript

### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/FilippoQuattrocchi/CommetTo-Frontend.git
cd CommetTo-Frontend/
npm install
```

## File structure in src folder

src <br>
│-global.d.ts //Type difinitions. <br>
│-index.ts //Express server endpoints to maniplutate data in between frontend and backend.<br>
│-knex.ts //knex settings<br>
│<br>
└─event<br>
&emsp;&emsp;event.controller.ts //handle functions for http request.<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;// They call data manipulation functions which communicate with database, using knex. <br>
&emsp;&emsp;event.model.ts //Communication functions with knex.<br>

## Implementation details
### Handle CORS
It uses express middleware "CORS" and manually add response header "Access-Control-Allow-Methods" for GET, POST, PUT, DELETE method.
You can define the origin which you allow to communicate with "VITE_ORIGIN" enviroment variable.
