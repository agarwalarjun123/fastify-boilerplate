## Fastify-Boilerplate

This Repo is a template for future fastify APIs needed to be maintained.

### Steps for configuration

1.Install Dependencies

```bash
npm install
```

2.Create a .env and add the following values:

```.env
NODE_ENV=development
PORT=<port>
LOG_LEVEL=<log-level>
MONGODB_URL=<db-connection-string>
```

3.Running locally

```bash
npm start
```

### Directory Structure

```
.
├── Dockerfile
├── Readme.md
├── package-lock.json
├── package.json
├── src
│   ├── api
│   │   ├── index.js
│   │   └── v1
│   │   ├── authentication
│   │   │   ├── authentication.controller.js
│   │   │   ├── authentication.route.js
│   │   │   ├── authentication.schema.js
│   │   │   └── authentication.service.js
│   │   └── index.js
│   ├── app.js
│   ├── common
│   │   ├── authentication.util.js
│   │   └── validation.util.js
│   ├── config
│   │   ├── config.js
│   │   ├── error.js
│   │   ├── logger.js
│   │   └── server.js
│   ├── index.js
│   └── model

```
