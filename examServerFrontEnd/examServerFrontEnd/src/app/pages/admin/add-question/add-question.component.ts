import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {


  // public Editor=ClassicEditor;

  qId: any;
  title: any;
  question = {
    quiz: { qId: '' },
    content: '',
    opt1: '',
    opt2: '',
    opt3: '',
    opt4: '',
    ans: '',
  };
  emptyQue: any;

  constructor(
    private aRoute: ActivatedRoute,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this.aRoute.snapshot.params['qId'];
    this.title = this.aRoute.snapshot.params['title'];
    // console.log(this.qId);

    this.question.quiz['qId'] = this.qId;
  }

  addQuestion() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      return;
    }

    if (this.question.opt1.trim() == '' || this.question.opt1 == null) {
      return;
    }

    if (this.question.opt2.trim() == '' || this.question.opt2 == null) {
      return;
    }

    if (this.question.ans.trim() == '' || this.question.ans == null) {
      return;
    }

    this.questionService.addQuestion(this.question).subscribe(
      (data) => {
        Swal.fire('Success', 'Question Added Successfully', 'success');
        //clears all the input fields
        this.question.ans = '';
        this.question.content = '';
        this.question.opt1 = '';
        this.question.opt2 = '';
        this.question.opt3 = '';
        this.question.opt4 = '';
      },
      (error) => {
        Swal.fire('Error', 'Question Not Added', 'error');
      }
    );
  }
}
