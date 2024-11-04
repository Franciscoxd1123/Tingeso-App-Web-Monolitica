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
                        try {
                            if (isUnix()) {
                                sh './gradlew clean build'
                            } else {
                                bat 'gradlew clean build'
                            }
                        } catch (Exception e) {
                            error "Gradle build failed: ${e.message}"
                        }
                    }
                }
            }
        }
        stage('Unit Tests') {
            steps {
                dir('App-Web-Monolitica') {
                    script {
                        try {
                            if (isUnix()) {
                                sh './gradlew test'
                            } else {
                                bat 'gradlew test'
                            }
                        } catch (Exception e) {
                            error "Unit tests failed: ${e.message}"
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
                        try {
                            if (isUnix()) {
                                sh 'docker build -t monopb-frontend .'
                            } else {
                                bat 'docker build -t monopb-frontend .'
                            }
                        } catch (Exception e) {
                            error "Frontend image build failed: ${e.message}"
                        }
                    }
                }
            }
        }
        stage('Build Backend Image') {
            steps {
                echo 'Building Backend Image...'
                script {
                    dir('App-Web-Monolitica') {
                        try {
                            if (isUnix()) {
                                sh 'docker build -t monopb-backend .'
                            } else {
                                bat 'docker build -t monopb-backend .'
                            }
                        } catch (Exception e) {
                            error "Backend image build failed: ${e.message}"
                        }
                    }
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                echo 'Starting Docker Compose...'
                script {
                    try {
                        sh 'docker-compose -f docker-compose.yml up -d'
                    } catch (Exception e) {
                        error "Docker Compose failed: ${e.message}"
                    }
                }
            }
        }
    }
}
