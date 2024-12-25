import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private quizService: QuizService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  quiz: any;
  qId: any;
  categories: any;

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
        Swal.fire(
          '!!! Error !!!',
          'Error in loading data from server',
          'error'
        );
      }
    );

    this.qId = this._route.snapshot.params['qId'];
    // alert(this.qId);
    this.quizService.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
        // console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateQuiz() {
    //validations
    this.quizService.updateQuiz(this.quiz).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Quiz Updated Successfully', 'success').then((e:any)=>{
          this.router.navigate(['admin/quizzes']);
        });
      },
      (error) => {
        Swal.fire('Error', 'Quiz Not Updated', 'error');
        console.log(error);
      }
    );
  }
}
