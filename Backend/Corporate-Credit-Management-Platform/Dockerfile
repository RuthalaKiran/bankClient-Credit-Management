# FROM eclipse-temurin:17-jdk
# COPY ./target/Corporate-Credit-Management-Platform-0.0.1-SNAPSHOT.jar .
# CMD ["java","-jar","Corporate-Credit-Management-Platform-0.0.1-SNAPSHOT.jar"]


# ---------- Build Stage ----------
FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom first for dependency caching
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build jar
RUN mvn clean package -DskipTests


# ---------- Runtime Stage ----------
FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY --from=build /app/target/Corporate-Credit-Management-Platform-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
