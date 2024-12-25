import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-loadquiz',
  templateUrl: './loadquiz.component.html',
  styleUrls: ['./loadquiz.component.css'],
})
export class LoadquizComponent implements OnInit {
  catId: any;
  quizzes: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId == 0) {
        this.quizService.getActiveQuezzes().subscribe(
          (data: any) => {
            this.quizzes = data;
          },
          (error) => {
            console.log(error);
            alert('Error in loading all quizzes.');
          }
        );
      }else{
        console.log("load by category Id");
        this.quizService.getActiveQuezzesOfCategory(this.catId).subscribe(
          (data:any)=>{
            // console.log(data);
            this.quizzes=data;
          },
          (error)=>{
            console.log(error);
          alert("error in loading quizzes by category");
          }
        )
      }
    });
  }
}
