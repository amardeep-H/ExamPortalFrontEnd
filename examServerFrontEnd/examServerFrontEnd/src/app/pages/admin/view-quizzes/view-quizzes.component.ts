import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any;

  constructor(private _quizService: QuizService) {}

  ngOnInit(): void {
    this._quizService.getQuezzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('!!! Error !!!', 'Error in loading Data', 'error');
      }
    );
  }

  deleteQz(qId: any) {
    Swal.fire({
      icon:'warning',
      title:'Confirm, You want to Delete ?',
      confirmButtonText:'Delete',
      showCancelButton:true,
    }).then((result:any)=>{
      if(result.isConfirmed){
        
    this._quizService.deleteQuiz(qId).subscribe(
      (data: any) => {
        this.quizzes = this.quizzes.filter((quiz: any) => quiz.qId != qId);
        Swal.fire('Success', 'Quiz Deleted', 'success');
      },
      (error) => {
        console.log(error);
        Swal.fire('!!! Error !!!', 'Error in Deleting Quiz', 'error');
      }
    );
      }
    })
  }
}
