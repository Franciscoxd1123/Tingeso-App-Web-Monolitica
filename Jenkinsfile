pipeline {
    agent any
    tools {
        gradle 'gradle_8_10_2'
        nodejs 'node'
    }

    environment {
        FRONTEND_DIR = '"Frontend App Web Monolítica"'
    }

    stages {
        stage('Checkout repository') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Franciscoxd1123/Tingeso-App-Web-Monolitica']])
            }
        }

        stage('Build backend') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'cd App-Web-Monolitica && ./gradlew clean build'
                    } else {
                        bat 'cd App-Web-Monolitica && gradlew clean build'
                    }
                    
                }
            }
        }

        stage('Test backend') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'cd App-Web-Monolitica && ./gradlew test'
                    } else {
                        bat 'cd App-Web-Monolitica && gradlew test'
                    }
                }
            }
        }

        stage('Push backend') {
            steps {

                script {
                    if (isUnix()) {
                        sh 'docker build -t franciscoxd1123/monopb-backend:latest App-Web-Monolitica'
                    } else {
                        bat 'docker build -t franciscoxd1123/monopb-backend:latest App-Web-Monolitica'
                    }
                }
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    script {
                        if (isUnix()) {
                            sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                        } else {
                            bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                        }
                    }
                }
                script {
                    if (isUnix()) {
                        sh 'docker push franciscoxd1123/monopb-backend:latest'
                    } else {
                        bat 'docker push franciscoxd1123/monopb-backend:latest'
                    }
                }
            }
        }

        stage('Build frontend') {
            steps {
                script {
                    if (isUnix()) {
                        sh "cd $FRONTEND_DIR && npm run build"
                    } else {
                        bat "cd $FRONTEND_DIR && npm run build"
                    }
                }
            }
        }

        stage('Push frontend') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker build -t franciscoxd1123/monopb-frontend:latest $FRONTEND_DIR'
                    } else {
                        bat 'docker build -t franciscoxd1123/monopb-frontend:latest $FRONTEND_DIR'
                    }
                }
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    script {
                        if (isUnix()) {
                            sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                        } else {
                            bat 'docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%'
                        }
                    }
                }
                script {
                    if (isUnix()) {
                        sh 'docker push franciscoxd1123/monopb-frontend:latest'
                    } else {
                        bat 'docker push franciscoxd1123/monopb-frontend:latest'
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker-compose up'
                    } else {
                        bat 'docker-compose up'
                    }
                }
            }
        }
    }
}