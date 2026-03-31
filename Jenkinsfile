pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "avejlanjekar45/todo-app"
        MONGO_URI=credentials('mongo-uri')
    }

    stages {

        stage('Clone Repo') {
            steps {
                git url:'https://github.com/Avejlanjekar/todo-cicd.git', branch:'main'
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
                docker run -d -p 5000:5000 --name todo-container -e MONGO_URI="${MONGO_URI}" $DOCKER_IMAGE
                '''
            }
        }
    }
}