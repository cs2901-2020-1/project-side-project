# IBM Visual Recognition - BackEnd

Visual recognition interface connected to the IBM Cloud

## Configuration
In file `/backend/src/main/resources/application.properties`
```
spring.datasource.url = jdbc:postgresql://localhost:5432/## Database name ##
spring.datasource.username = ## Username ##
spring.datasource.password = ## Password ##
```

## Build and Execute
```
mvn spring-boot:run
```