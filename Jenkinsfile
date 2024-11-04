pipeline {
    agent any
    tools {
        gradle 'gradle_8_10_2'
    }
    environment {
        FRONTEND_IMAGE = 'monopb-frontend'
        BACKEND_IMAGE = 'monopb-backend'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Franciscoxd1123/Tingeso-App-Web-Monolitica']])
            }
        }
        stage('Build Gradle') {
            steps {
                dir('App-Web-Monolitica') {
                    script {
                        if (isUnix()) {
                            sh './gradlew clean build'
                        } else {
                            bat 'gradlew clean build'
                        }
                    }
                }
            }
        }
        stage('Unit Tests') {
            steps {
                dir('App-Web-Monolitica') {
                    script {
                        if (isUnix()) {
                            sh './gradlew test'
                        } else {
                            bat 'gradlew test'
                        }
                    }
                }
            }
        }
        stage('Build Frontend Image') {
            steps {
                echo 'Building Frontend Image...'
                script {
                    // Change the directory to the one containing the Dockerfile
                    dir('Frontend App Web Monolítica') {
                        // Build the Docker image with the correct context
                        docker.build("${FRONTEND_IMAGE}", ".")
                    }
                }
            }
        }
        stage('Build Backend Image') {
            steps {
                echo 'Building Backend Image...'
                script {
                    docker.build("${BACKEND_IMAGE}", "-f App-Web-Monolitica/Dockerfile .")
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                echo 'Starting Docker Compose...'
                script {
                    sh 'docker-compose -f docker-compose.yml up -d'
                }
            }
        }
    }
}