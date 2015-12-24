# High Score API

## Development Setup

```
$ git clone https://github.com/msrose/highscore-api.git
$ cd highscore-api
$ npm install
```

[Install mongodb](https://docs.mongodb.org/v3.0/installation/). Start a local mongo server (defaults to port 27017):

```
$ mongod
```

Start the node server:

```
$ node index.js
```

On Linux you may need to install libkrb5-dev to get the mongo driver to install. E.g.:

```
sudo apt-get install libkrb5-dev
```
