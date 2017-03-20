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

## Deplyoment
Argos frontend uses Docker for a simple deployment process.
Call ```docker build . -t bptlab/argos-frontend:latest -t bptlab/argos-frontend:[VERSION]``` to create a new docker-container (replace VERSION using a sufficient version-number e.g.: 1.1.0).
Afterwards switch to your deplyoment system, make sure all necessary dependencies are running (Unicorn and Argos backend) and call ```docker run --name argos-frontend --link argos-backend:backend -d bptlab/argos-frontend:latest```.
