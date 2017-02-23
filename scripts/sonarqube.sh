/usr/bin/env sh

if ["$TRAVIS_PULL_REQUEST" == "false"] then
    echo "Sonarqube analysis triggered for normal commit"
    sonar-scanner \
              -Dsonar.host.url=$SONAR_HOST_URL \
              -Dsonar.login=$SONARQUBE_AUTH_TOKEN \
              -Dsonar.branch=$TRAVIS_BRANCH

else
    echo "Sonarqube analysis triggered for pull request"
    sonar-scanner -Dsonar.analysis.mode=preview \
                  -Dsonar.github.pullRequest=$TRAVIS_PULL_REQUEST \
                  -Dsonar.github.repository=$TRAVIS_REPO_SLUG \
                  -Dsonar.github.oauth=$GITHUB_ACCESS_TOKEN \
                  -Dsonar.host.url=$SONAR_HOST_URL \
                  -Dsonar.login=$SONARQUBE_AUTH_TOKEN \
                  -Dsonar.branch=$TRAVIS_BRANCH

fi
