pipeline {

    agent any

    environment {

        DOCKER_PATH = "/usr/local/bin/docker"

    }

    stages {

        stage('Build Docker Image') {

            steps {

                sh '${DOCKER_PATH} build -t deploypulse-backend ./backend'

            }

        }

        stage('Stop Old Container') {

            steps {

                sh '${DOCKER_PATH} stop deploypulse || true'
                sh '${DOCKER_PATH} rm deploypulse || true'

            }

        }

        stage('Run New Container') {

            steps {

                sh '${DOCKER_PATH} run -d --name deploypulse -p 3002:3000 deploypulse-backend'

            }

        }

    }

}
