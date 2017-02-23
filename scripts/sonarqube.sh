#!/bin/bash

echo "Sonarqube analysis triggered"
echo $TRAVIS_PULL_REQUEST

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    echo "normal commit"
    sonar-scanner \
              -Dsonar.host.url=$SONAR_HOST_URL \
              -Dsonar.login=$SONARQUBE_AUTH_TOKEN \
              -Dsonar.branch=$TRAVIS_BRANCH

else
    echo "pull request"
    sonar-scanner -Dsonar.analysis.mode=preview \
                  -Dsonar.github.pullRequest=$TRAVIS_PULL_REQUEST \
                  -Dsonar.github.repository=$TRAVIS_REPO_SLUG \
                  -Dsonar.github.oauth=$GITHUB_ACCESS_TOKEN \
                  -Dsonar.host.url=$SONAR_HOST_URL \
                  -Dsonar.login=$SONARQUBE_AUTH_TOKEN \
                  -Dsonar.branch=$TRAVIS_BRANCH

fi
