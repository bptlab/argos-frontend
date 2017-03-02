#!/bin/bash

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    sonar-scanner \
              -Dsonar.host.url=$SONAR_HOST_URL \
              -Dsonar.branch=$TRAVIS_BRANCH

else
    sonar-scanner -Dsonar.analysis.mode=preview \
                  -Dsonar.github.pullRequest=$TRAVIS_PULL_REQUEST \
                  -Dsonar.github.repository=$TRAVIS_REPO_SLUG \
                  -Dsonar.host.url=$SONAR_HOST_URL \
                  -Dsonar.branch=$TRAVIS_BRANCH

fi
