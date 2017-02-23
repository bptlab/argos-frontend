#!/bin/bash

echo "Sonarqube analysis triggered"
echo $TRAVIS_PULL_REQUEST
echo $SONARQUBE_SKIPPED

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    echo "normal commit"
    sonar-scanner \
              -Dsonar.host.url=$SONAR_HOST_URL \
              -Dsonar.login=$SONAR_AUTH_TOKEN \
              -Dsonar.branch=$TRAVIS_BRANCH

else
    echo "pull request"
    SONARQUBE_SKIPPED=false
    echo $SONARQUBE_SKIPPED
    sonar-scanner -Dsonar.analysis.mode=preview \
                  -Dsonar.github.pullRequest=$TRAVIS_PULL_REQUEST \
                  -Dsonar.github.repository=$TRAVIS_REPO_SLUG \
                  -Dsonar.github.oauth=$GITHUB_ACCESS_TOKEN \
                  -Dsonar.host.url=$SONAR_HOST_URL \
                  -Dsonar.login=$SONAR_AUTH_TOKEN \
                  -Dsonar.branch=$TRAVIS_BRANCH
    echo $SONARQUBE_SKIPPED

fi
