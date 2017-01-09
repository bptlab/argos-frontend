node {
	stage('Checkout') {
		checkout scm
	}

	stage('Build') {
        sh """npm install"""
        sh """CI=true npm test"""
        sh """CI=true npm run build"""
	}
}