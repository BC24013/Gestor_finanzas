# ─────────────────────────────────────────────
# Stage 1: Compilar el proyecto con Maven
# ─────────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-21-alpine AS build

WORKDIR /app

# Copiar solo el pom.xml primero para cachear la descarga de dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el código fuente y compilar (sin tests)
COPY src ./src
RUN mvn package -DskipTests -B

# ─────────────────────────────────────────────
# Stage 2: Imagen mínima de ejecución (JRE)
# ─────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine

# Instalar wget para el healthcheck del docker-compose
RUN apk add --no-cache wget

WORKDIR /app

COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
