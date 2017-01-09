node {
	stage('Checkout') {
		checkout scm
	}

	stage('Build') {
	    withNodeJsEnv('NodeJS') {
		    sh """npm install"""
		    sh """CI=true npm test"""
		    sh """CI=true npm run build"""
		}
	}
}