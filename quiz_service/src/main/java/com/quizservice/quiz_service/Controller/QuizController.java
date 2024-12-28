package com.quizservice.quiz_service.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quizservice.quiz_service.Dto.QuizDto;
import com.quizservice.quiz_service.Model.QuestionWrapper;
import com.quizservice.quiz_service.Model.Response;
import com.quizservice.quiz_service.Service.QuizService;




@RestController
@RequestMapping("quiz")
public class QuizController {
    @Autowired
    QuizService quizservice;

    @PostMapping("create")
    public ResponseEntity<String> createQuiz(@RequestBody QuizDto quizDto){
        return quizservice.createQuiz(quizDto.getCategoryName(), quizDto.getNumQuestions(),quizDto.getTitle());
    }
    @GetMapping("get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable  Integer id){
        return quizservice.getQuizQuestions(id);
    }
    @PostMapping("submit/{id}")
    public ResponseEntity<Integer> submitQuiz(@PathVariable Integer id,@RequestBody List<Response> responses){
        System.out.println("Received responses: " + responses);
        return quizservice.calculateResult(id,responses);
    }
}
