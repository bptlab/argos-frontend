# Argos frontend

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/bptlab/argos-frontend/master/LICENSE)
[![GitHub release](https://img.shields.io/badge/release-2.1.1-blue.svg)](https://github.com/bptlab/argos-frontend/releases/latest)

[![Quality Gate developer branch](https://bpt-lab.org/sonarqube/api/badges/gate?key=de.hpi.bpt:argos-frontend:developer "Developer Branch")](https://bpt-lab.org/sonarqube/overview?id=de.hpi.bpt%3Aargos-frontend)
[![Build Status](https://travis-ci.org/bptlab/argos-frontend.svg?branch=master)](https://travis-ci.org/bptlab/argos-frontend "Default branch")

## Requirements
- node & npm

## Configuration
To configure argos-frontend simply access ```src/config/argosConfig.js```

## Development
### Quick Start
- ```git clone git@github.com:bptlab/argos-frontend.git && cd argos-frontend```
- ```npm install```
- ```npm start```
- The server is now running at [localhost:3000](http://localhost:3000)

### Development Environment
1. Set the intendation inside the IDE of your choice to:
	- tabs, smart tabs
	- tab size 4
	- indent 4, continuation indent 4

## Conventions
### Git
#### Feature branch naming
Branches are named in this style: BP_[JIN]_[DWU]
* JIN = Jira issue number
* DWU = Story description with underscores


### Code Structure
#### Break component initialisations
If initialising a component with more than two parameters, insert a linebreak after the components name and each parameter. 

Right
```
<EventTable
	header={this.state.activeEventType.attributes}
	events={this.state.activeEvents}
	filter={this.state.filter} />
```
Wrong
```
<EventTable header={this.state.activeEventType.attributes} events={this.state.activeEvents} filter={this.state.filter} />
```

## Constructor method
Constructor methods should be structured in this way:
1. Call the parent constructor.
2. Initialize the components state.
3. Execute initialisation functions.
4. Bind ```this``` to functions.


## Testing
Argos frontend uses ReactTestUtils and Jest to test its components. You can run tests by calling ```npm test``` in your cli. 

## Deployment 
Please see the [Installation Guide](https://github.com/bptlab/wiki-resources/wiki/Argos-deployment) for explanations.