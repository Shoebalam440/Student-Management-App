FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
# Copy source and build using the maven binary included in the image to avoid
# potential issues with the mvnw wrapper (CRLF or permission problems on Linux).
COPY . .
RUN mvn -B -DskipTests clean package

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]