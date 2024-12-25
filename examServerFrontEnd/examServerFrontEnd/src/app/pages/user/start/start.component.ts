import { LocationStrategy } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qId: any;
  questions: any = 0;
  marksGot: any = 0;
  correctAns: any = 0;
  attempted: any = 0;
  isSubmit = false;
  timer = 0;
  constructor(
    private locStra: LocationStrategy,
    private _aRoute: ActivatedRoute,
    private queSer: QuestionService
  ) {}

  ngOnInit(): void {
    // this.preventBackButton();
    this.qId = this._aRoute.snapshot.params['qId'];
    this.loadQuestions(this.qId);
  }

  loadQuestions(qId: any) {
    this.queSer.getQuestionsForTest(qId).subscribe((data: any) => {
      console.log(data);
      this.questions = data;
      this.timer = this.questions.length * 2 * 60;
      this.startTimer();

      this.questions.forEach((q: any) => {
        q['givenAns'] = '';
      });
    }),
      (error: any) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading Questions of Quiz.', 'error');
      };
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locStra.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to Submit the Test ?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
        this.isSubmit = true;
      } else if (e.isDenied) {
        Swal.fire('Quiz will not Submit', '', 'info');
      }
      // console.log(this.marksGot);
      // console.log(this.correctAns);
      console.log(this.attempted);
    });
  }

  startTimer() {
    let t: any = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let minu = Math.floor(this.timer / 60);
    let seco = this.timer - minu * 60;
    return `${minu} min : ${seco} sec`;
  }

  evalQuiz() {
    this.isSubmit = true;
    this.queSer.evalQuiz(this.questions).subscribe(
      (data: any) => {
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.attempted = data.attempted;
        this.correctAns = data.correctAns;
      },
      (error: any) => {
        console.log(error);
      }
    ); 

    // alert('inside evalQuiz');
    // this.questions.forEach((q: any) => {
    //   if (q.givenAns == q.ans) {
    //     this.correctAns++;
    //     let marksSingleQ =
    //       this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marksSingleQ;
    //   }

    //   if (q.givenAns.trim() != '') {
    //     this.attempted++;
    //   }
    // });
  }

  public printFun(){
    window.print();
  }
}
