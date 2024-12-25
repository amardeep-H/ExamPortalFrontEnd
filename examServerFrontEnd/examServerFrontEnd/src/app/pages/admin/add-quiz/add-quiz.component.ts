import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  categories: any;
  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numOfQue: '',
    active: true,
    category: {
      cid: '',
    },
  };

  constructor(
    private categoryService: CategoryService,
    private quizService: QuizService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
        Swal.fire(
          '!!! Error !!!',
          'Error in loading data from server',
          'error'
        );
      }
    );
  }

  addQuiz() {
    // console.log(this.quizData);
    if (this.quizData.title == '' || this.quizData.title == null) {
      this.matSnackBar.open('!!! Title Required !!!', '', {
        duration: 3000,
      });
      return;
    }

    // do validations

    //call server
    //add data to server
    this.quizService.addQuiz(this.quizData).subscribe((data) => {
      Swal.fire('Success', 'Quiz is added', 'success');
      //now make all the input boxes empty
      this.quizData = {
        title: '',
        description: '',
        maxMarks: '',
        numOfQue: '',
        active: true,
        category: {
          cid: '',
        },
      };
    },
    (error)=>{
      Swal.fire('Error', 'Error While adding Quiz', 'error');
      console.log(error);
    }
    );
  }
}
