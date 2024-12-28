# Question Service

This is a Spring Boot application for managing quiz questions. It provides RESTful APIs to create, retrieve, and manage quiz questions.

## Prerequisites

- Java 17
- Maven
- PostgreSQL

## Getting Started

1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Configure the database:
    - Update the [application.properties](http://_vscodecontentref_/17) file with your PostgreSQL database details.

3. Build the project:
    ```sh
    ./mvnw clean install
    ```

4. Run the application:
    ```sh
    ./mvnw spring-boot:run
    ```

## API Endpoints

### Question Controller

- **Get all questions**
    ```http
    GET /question/allquestions
    ```
    Response: List of all questions.

- **Get questions by category**
    ```http
    GET /question/category/{category}
    ```
    Path Variable: [category](http://_vscodecontentref_/18) (String)  
    Response: List of questions in the specified category.

- **Add a new question**
    ```http
    POST /question/add
    ```
    Request Body: [Question](http://_vscodecontentref_/19) object  
    Response: Success message.

- **Generate questions for a quiz**
    ```http
    GET /question/generate
    ```
    Query Parameters: [categoryName](http://_vscodecontentref_/20) (String), [numQuestions](http://_vscodecontentref_/21) (Integer)  
    Response: List of question IDs.

- **Get questions from IDs**
    ```http
    POST /question/getQuestions
    ```
    Request Body: List of question IDs  
    Response: List of [QuestionWrapper](http://_vscodecontentref_/22) objects.

- **Get score**
    ```http
    POST /question/getScore
    ```
    Request Body: List of [Response](http://_vscodecontentref_/23) objects  
    Response: Score (Integer).

## Models

### Question

- [id](http://_vscodecontentref_/24) (Integer)
- [questionTitle](http://_vscodecontentref_/25) (String)
- [option1](http://_vscodecontentref_/26) (String)
- [option2](http://_vscodecontentref_/27) (String)
- [option3](http://_vscodecontentref_/28) (String)
- [option4](http://_vscodecontentref_/29) (String)
- [rightAnswer](http://_vscodecontentref_/30) (String)
- [difficultylevel](http://_vscodecontentref_/31) (String)
- [category](http://_vscodecontentref_/32) (String)

### QuestionWrapper

- [id](http://_vscodecontentref_/33) (Integer)
- [questionTitle](http://_vscodecontentref_/34) (String)
- [option1](http://_vscodecontentref_/35) (String)
- [option2](http://_vscodecontentref_/36) (String)
- [option3](http://_vscodecontentref_/37) (String)
- [option4](http://_vscodecontentref_/38) (String)

### Response

- [id](http://_vscodecontentref_/39) (Integer)
- [response](http://_vscodecontentref_/40) (String)

## Repository

### QuestionRepo

- [findByCategory(String category)](http://_vscodecontentref_/41): List of questions by category.
- [findRandomQuestionsByCategory(String category, int numQ)](http://_vscodecontentref_/42): List of random question IDs by category.

## License

This project is licensed under the Apache License 2.0. See the LICENSE file for details.
