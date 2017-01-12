node {
    def nodeHome = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"

	stage('Checkout') {
		checkout scm
	}

  stage('SonarQube analysis') {
      // requires SonarQube Scanner 2.8+
      def scannerHome = tool 'SonarScanners';
      withSonarQubeEnv('SonarQube BP16') {
        sh "${scannerHome}/bin/sonar-scanner -Dsonar.branch=${env.BRANCH_NAME}"
      }
    }

	stage('Build') {
        sh """npm install"""
        sh """CI=true npm test"""
        sh """CI=true npm run build"""
	}
}
