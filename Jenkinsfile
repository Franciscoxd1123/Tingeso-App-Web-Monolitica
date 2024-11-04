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
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Franciscoxd1123/Tingeso-App-Web-Monolitica.git']])
                bat 'gradle clean build' // Para Windows; usar 'sh' y 'gradle clean build' en Unix/Linux
            }
        }
        stage('Unit Tests') {
            steps {
                // Ejecutar pruebas con Gradle
                bat 'gradle test' // Usar 'bat' para Windows o 'sh' para Unix/Linux
            }
        }
        stage('Build Frontend Image') {
            steps {
                echo 'Building Frontend Image...'
                script {
                    docker.build(FRONTEND_IMAGE, '-t ${FRONTEND_IMAGE} -f "Frontend App Web Monolítica/Dockerfile" .')
                }
            }
        }
        stage('Build Backend Image') {
            steps {
                echo 'Building Backend Image...'
                script {
                    docker.build(BACKEND_IMAGE, '-t ${BACKEND_IMAGE} -f "App-Web-Monolitica/Dockerfile" .')
                }
            }
        }
        stage('Push Images to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dhpswid', passwordVariable: 'dhpsw', usernameVariable: 'dhpuser')]) {
                        // Iniciar sesión en Docker Hub
                        bat "docker login -u ${dhpuser} -p ${dhpsw}"
                    }
                    // Subir las imágenes de frontend y backend a Docker Hub
                    bat 'docker push franciscoxd1123/monopb-frontend:latest' // Subir imagen de frontend
                    bat 'docker push franciscoxd1123/monopb-backend:latest' // Subir imagen de backend
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