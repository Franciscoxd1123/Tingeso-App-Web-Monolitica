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
        stage('Build Gradle') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Franciscoxd1123/Tingeso-App-Web-Monolitica']])
                dir('App-Web-Monolitica') {
                    bat 'gradle clean build' // Para Windows; usa 'sh' para Unix/Linux
                }
            }
        }
        stage('Unit Tests') {
            steps {
                // Ejecutar pruebas con Gradle
                dir('App-Web-Monolitica'){
                    bat 'gradle test' // Usar 'bat' para Windows o 'sh' para Unix/Linux
                }
            }
        }
        stage('Build Frontend Image') {
            steps {
                echo 'Building Frontend Image...'
                script {
                    docker.build(FRONTEND_IMAGE, "-t ${FRONTEND_IMAGE} -f \"Frontend App Web Monolítica/Dockerfile\" .")
                }
            }
        }
        stage('Build Backend Image') {
            steps {
                echo 'Building Backend Image...'
                script {
                    docker.build(BACKEND_IMAGE, "-t ${BACKEND_IMAGE} -f \"App-Web-Monolitica/Dockerfile\" .")
                }
            }
        }
        stage('Deploy with Docker Compose') {
            steps {
                echo 'Starting Docker Compose...'
                script {
                    // Iniciar los servicios usando el archivo docker-compose.yml
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}