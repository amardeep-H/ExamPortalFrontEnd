import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qId:any;
  quiz:any;
  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _router:Router) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    console.log("inside instructions.ts");

    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data);
        this.quiz = data;
      },
      (error: any)=>{
        console.log(error);
        alert("error in loading quiz data");
      }
    )
  }

  public startQuiz(){
    Swal.fire({
      title: 'Do you want to start the Quiz ?',
      showCancelButton:true,
      confirmButtonText:"Start",
      icon:'info',
    }).then((result)=>{
      if(result.isConfirmed){
        this._router.navigate(['/start/'+this.qId]);
      }else if(result.isDenied){
        Swal.fire('Quiz will not Start', '', 'info');
      }
    });
  }
}
function result(result: any, any: any) {
  throw new Error('Function not implemented.');
}

