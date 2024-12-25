import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http:HttpClient) { }

  public getQuezzes(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  public addQuiz(quiz:any){
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  public deleteQuiz(qId:number){
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  public getQuiz(qId:number){
    return this._http.get(`${baseUrl}/quiz/${qId}`)
  }

  public updateQuiz(quiz:any){
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }

  public getQuizzesOfCategory(cid:number){
    // console.log("inside getQuizzesOfCategory()...quiz.service");
    return this._http.get(`${baseUrl}/quiz/category/${cid}`)
  }


  public getActiveQuezzes(){
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  // get active quizzes  of category
  public getActiveQuezzesOfCategory(cid:number){
    // console.log("inside getActiveQuezzesOfCategory()...quiz.service");
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }



}
