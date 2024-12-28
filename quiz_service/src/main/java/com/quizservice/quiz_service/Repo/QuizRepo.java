package com.quizservice.quiz_service.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quizservice.quiz_service.Model.Quiz;

public interface QuizRepo extends JpaRepository<Quiz,Integer> {
    
}
