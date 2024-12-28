package com.quizservice.quiz_service.Service;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.quizservice.quiz_service.Model.QuestionWrapper;
import com.quizservice.quiz_service.Model.Quiz;
import com.quizservice.quiz_service.Model.Response;
import com.quizservice.quiz_service.Repo.QuizRepo;
import com.quizservice.quiz_service.feign.QuizInterface;
@Service
public class QuizService {
    @Autowired
    QuizRepo quizrepo;

    @Autowired
    QuizInterface quizInterface;

    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {

        List<Integer> questions=quizInterface.getQuestionsForQuiz(category, numQ).getBody();
        Quiz quiz=new Quiz();
        quiz.setTitle(title);
        quiz.setQuestionIds(questions);
        quizrepo.save(quiz);
        return new ResponseEntity<>("Success",HttpStatus.CREATED);
       
    }
    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
        Quiz quiz=quizrepo.findById(id).get();
        List<Integer> questionIds=quiz.getQuestionIds();
        ResponseEntity<List<QuestionWrapper>> questions=quizInterface.getQuestionsFromId(questionIds);
       return questions;
    }
    public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
        ResponseEntity<Integer> score=quizInterface.getScore(responses);
      return score;
    }
}
