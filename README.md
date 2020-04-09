# Express + TypeScript Boilerplate
## Purpose
To make you set Express and TypeScript project easily.
This is for API server but you can also use Fullstack web server if you set View layer by yourself.

## Getting started
```
$ git clone --depth=1 https://github.com/pipopotamasu/express-typescript-starter-for-api.git <project_name>
$ cd <project_name>
$ yarn or npm install
$ start your local mongodb
$ yarn build && yarn start
$ curl http://localhost:3000/api/v1
"api root"
```

## Default content
### APIs
- root api (it returns "api root" literal.)
- auth apis
  - signup
  - login
  - logout
  - delete account
  - sign with mail activation # setup your smtp server before you use
  - activateAccount           # setup your smtp server before you use

### Dependencies
- Node.js
- Express
- TypeScript
- MongoDB
- etc...

## LICENSE
MIT
