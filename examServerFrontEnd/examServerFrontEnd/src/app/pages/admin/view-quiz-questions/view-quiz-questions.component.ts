import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  title: any;
  questions: any;

  constructor(
    private aRoute: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this.aRoute.snapshot.params['qId'];
    this.title = this.aRoute.snapshot.params['title'];
    // alert(this.title);
    // alert(this.qId);

    this.questionService.getQuestions(this.qId).subscribe(
      (data) => {
        this.questions = data;
        console.log(this.questions);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteQue(queId: number) {
    Swal.fire({
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are You Sure, want to delete ?',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(queId).subscribe(
          (data) => {
            Swal.fire('Success', 'Question Deleted Successfully', 'success');
            this.questions = this.questions.filter(
              (q: any) => q.queId != queId
            );
          },
          (error) => {
            Swal.fire('Error', 'Question Not Deleted ', 'error');
            console.log(error);
          }
        );
      }
    });
  }

  //update question
}
