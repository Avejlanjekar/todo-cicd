pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "yourdockerhubusername/todo-app"
    }

    stages {

        stage('Clone Repo') {
            steps {
                git 'https://github.com/Avejlanjekar/todo-cicd.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop todo-container || true
                docker rm todo-container || true
                docker run -d -p 5000:5000 --name todo-container $DOCKER_IMAGE
                '''
            }
        }
    }
}