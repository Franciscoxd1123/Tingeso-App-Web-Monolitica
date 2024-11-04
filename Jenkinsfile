pipeline {
    agent any
    tools {
        gradle 'gradle_8_10_2'
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
                    dir('Frontend App Web Monolítica') {
                        sh 'docker build -t monopb-frontend .'
                    }
                }
            }
        }
        stage('Build Backend Image') {
            steps {
                echo 'Building Backend Image...'
                script {
                    dir('App-Web-Monolitica'){
                        sh 'docker build -t monopb-backend .'
                    }
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