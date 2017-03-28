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
### Deploy a database.
```
docker run --name argos-database -e MYSQL_ROOT_PASSWORD=[secret] -e MYSQL_USER=[user] -e MYSQL_PASSWORD=[password] -d mysql:latest
```
e.g.
```
docker run --name argos-database -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_USER=user -e MYSQL_PASSWORD=password -d mysql:latest
```

Then grant new user root privileges: 
1. Execute ```mysql -u root -p``` in container. Enter your root password.
1. Execute ```GRANT ALL PRIVILEGES ON *.* TO user@localhost WITH GRANT OPTION;```


### Deploy Unicorn.
```
docker run --name unicorn -p 8080:8080 --link argos-database:mysql -d bptlab/unicorn:latest
```
### Deploy Argos. 
Windows only: please share the drive in your docker settings, that your event types directory is located on.
```
docker run --name argos -p 8989:8989 --link argos-database:mysql --link unicorn:unicorn -d -v [PATH TO DIR WITH EVENT TYPES WITH TRAILING SLASH]:/target/classes/event_types bptlab/argos:latest
```
Note:
- It's important to deploy step by step, because of the --link flags. Link flags only work on currently existing containers.
- The -p flag exposes a port on the Docker host machine. If that port is already in use on your system you should change the second parameter of the -p flag.
