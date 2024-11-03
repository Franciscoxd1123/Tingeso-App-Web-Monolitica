FROM openjdk:17-jdk-slim

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Usar un argumento dinámico para el archivo JAR
ARG JAR_FILE=build/libs/App-Web-Monolitica-0.0.1-SNAPSHOT.jar

# Copiar el archivo .jar al contenedor con un nombre
COPY ${JAR_FILE} MonoPB-Backend.jar

# Exponer el puerto en el que corre la aplicación
EXPOSE 8095

# Definir el comando de ejecución
ENTRYPOINT ["java", "-jar", "MonoPB-Backend.jar"]