# Argos frontend

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/bptlab/argos-frontend/master/LICENSE)
[![GitHub release](https://img.shields.io/badge/release-1.1.0-blue.svg)](https://github.com/bptlab/argos-frontend/releases/latest)

[![Quality Gate developer branch](https://bpt-lab.org/sonarqube/api/badges/gate?key=de.hpi.bpt:argos-frontend:developer "Developer Branch")](https://bpt-lab.org/sonarqube/overview?id=de.hpi.bpt%3Aargos-frontend)
[![Build Status](https://travis-ci.org/bptlab/argos-frontend.svg?branch=master)](https://travis-ci.org/bptlab/argos-frontend "Default branch")
[![Coverage Status](https://coveralls.io/repos/github/bptlab/argos-frontend/badge.svg?branch=master)](https://coveralls.io/github/bptlab/argos-frontend?branch=master)

## Requirements
- node & npm

## Configuration
To configure argos-frontend simply access ```src/config/argosConfig.js```

## Development
- ```git clone git@github.com:bptlab/argos-frontend.git && cd argos-frontend```
- ```npm install```
- ```npm start```
- The server is now running at [localhost:3000](http://localhost:3000)

## Testing
Argos frontend uses ReactTestUtils and Jest to test its components. You can run tests by calling ```npm test``` in your cli. 

## Deployment
Let's take it step by step.
1. First of all, deploy a database container (i.e. mysql).
```
docker run --name argos-database -e MYSQL_ALLOW_EMPTY_PASSWORD=yes -d mysql:latest
```
2. Now that you've got yourself a database, deploy Unicorn as an event processing system.
```
docker run --name unicorn -p 8080:8080 --link argos-database:mysql -d bptlab/unicorn:latest
```
3. Final step over here. Just deploy argos.
```
docker run --name argos -p 8989:8989 --link argos-database:mysql --link unicorn:unicorn -d bptlab/argos:latest
```
Note:
- It's important to deploy step by step, because of the --link flags. Link flags only work on currently existing containers.
- The -p flag exposes a port on the Docker host machine. If that port is already in use on your system you should change the second parameter of the -p flag.
