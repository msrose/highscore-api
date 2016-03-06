# High Score API

[![Dependency Status](https://david-dm.org/msrose/highscore-api.svg)](https://david-dm.org/msrose/highscore-api)
[![devDependency Status](https://david-dm.org/msrose/highscore-api/dev-status.svg)](https://david-dm.org/msrose/highscore-api#info=devDependencies)

## Development Setup

```
$ git clone https://github.com/msrose/highscore-api.git
$ cd highscore-api
$ npm install
```

[Install mongodb](https://docs.mongodb.org/v3.0/installation/). Make sure a local mongo server is running.

On Linux you may need to install libkrb5-dev to get the mongo driver to install. E.g.:

```
sudo apt-get install libkrb5-dev
```

Start the node server:

```
npm start
```

Run the tests:

```
npm test
```

Generate a migration:

```
node ./node_modules/mongodb-migrate create -runmm create name-of-migration
```

Run migrations for `env` environment (default is development):

```
NODE_ENV=env gulp migrate
```
