# Quiz Service

This is a Spring Boot application for a Quiz Service. The service allows users to create quizzes, retrieve quiz questions, and submit quiz responses. It uses PostgreSQL as the database and communicates with a Question Service using Feign clients.

## Getting Started

### Prerequisites

- Java 17
- Maven
- PostgreSQL

### Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd quiz_service
    ```

2. Configure the database in [application.properties](http://_vscodecontentref_/17):
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5433/quizdb
    spring.datasource.username=postgres
    spring.datasource.password=your_password
    ```

3. Build the project:
    ```sh
    ./mvnw clean install
    ```

4. Run the application:
    ```sh
    ./mvnw spring-boot:run
    ```

### API Endpoints

- **Create Quiz**
    - **URL:** `POST /quiz/create`
    - **Body:** [QuizDto](http://_vscodecontentref_/18)
    - **Response:** [String](http://_vscodecontentref_/19)

- **Get Quiz Questions**
    - **URL:** `GET /quiz/get/{id}`
    - **Response:** [List<QuestionWrapper>](http://_vscodecontentref_/20)

- **Submit Quiz**
    - **URL:** `POST /quiz/submit/{id}`
    - **Body:** [List<Response>](http://_vscodecontentref_/21)
    - **Response:** [Integer](http://_vscodecontentref_/22)

### Explanation

- **Controller:** [QuizController](http://_vscodecontentref_/23) handles the HTTP requests.
- **DTO:** [QuizDto](http://_vscodecontentref_/24) is used to transfer data for creating quizzes.
- **Feign Client:** [QuizInterface](http://_vscodecontentref_/25) communicates with the Question Service.
- **Model:** 
    - [QuestionWrapper](http://_vscodecontentref_/26) represents a quiz question.
    - [Quiz](http://_vscodecontentref_/27) represents a quiz entity.
    - [Response](http://_vscodecontentref_/28) represents a user's response to a quiz question.
- **Repository:** [QuizRepo](http://_vscodecontentref_/29) handles database operations for quizzes.
- **Service:** [QuizService](http://_vscodecontentref_/30) contains the business logic for creating quizzes, retrieving quiz questions, and calculating quiz results.
- **Application:** [QuizServiceApplication](http://_vscodecontentref_/31) is the main entry point of the Spring Boot application.

### Running Tests

To run the tests, use the following command:
```sh
./mvnw test
