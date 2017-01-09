node {
    def nodeHome = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"

	stage('Checkout') {
		checkout scm
	}

	stage('Build') {
        sh """npm install"""
        sh """CI=true npm test"""
        sh """CI=true npm run build"""
	}
}