pipeline {

    agent any

    stages {

        stage('Clone Repository') {

            steps {

                git branch: 'main',
                url: 'https://github.com/Sriramp24/deploypulse-ai.git'

            }

        }

        stage('Build Docker Image') {

            steps {

                sh 'docker build -t deploypulse-backend ./backend'

            }

        }

        stage('Stop Old Container') {

            steps {

                sh 'docker stop deploypulse || true'
                sh 'docker rm deploypulse || true'

            }

        }

        stage('Run New Container') {

            steps {

                sh 'docker run -d --name deploypulse -p 3000:3000 deploypulse-backend'

            }

        }

    }

}
