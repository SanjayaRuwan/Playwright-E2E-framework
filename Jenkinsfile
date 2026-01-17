pipeline {
    agent any

    environment {
        PLAYWRIGHT_BROWSERS_PATH = '.playwright' // to store browsers locally in workspace
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Or 'npm install' if not using package-lock.json
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            junit 'playwright-report/*.xml' // if you convert Playwright results to JUnit XML
        }
    }
}
