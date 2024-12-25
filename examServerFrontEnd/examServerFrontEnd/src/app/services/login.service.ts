import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  //subject is a kind of object using which we can send data anywhere
  // we have created this to know the status of login so that we can avoid error due to null values.
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  //get current user
  public getCurrentUser() {
    // console.log('inside getCurentUser start');
    // console.log(this.http.get(`${baseUrl}/current-user`));
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData: any) {
    // console.log('inside gengerateToken');
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // store token in the local storage .
  // as long as the token is in the local storage user will be logged in.
  public loginUser(token: any) {
    // console.log('inside loginUser');
    localStorage.setItem('token', token);
    // console.log('token is saved in side localstorage');
    // this.loginStatusSubject.next(true);
    return true;
  }

  //check user is logged in or not
  public isLoggedIn() {
    // console.log('inside isLoggedIn');
    let tokenStr = localStorage.getItem('token');
    // console.log(tokenStr);
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // remove token from local storage
  // logout
  public logout() {
    // console.log('inside logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatusSubject.next(false);
    return true;
  }

  // get token
  public getToken() {
    // console.log('inside get token');
    return localStorage.getItem('token');
  }

  // set userDetail
  public setUser(user: any) {
    // console.log('inside setUSer');
    localStorage.setItem('user', JSON.stringify(user));
  }

  // it returns user if logged in else return null
  public getUser() {
    let userStr = localStorage.getItem('user');
    // console.log('inside getUser ' + userStr);
    if (userStr != null) {
      // console.log(JSON.parse(userStr));
      return JSON.parse(userStr);
    } else {
      // this.logout();
      return null;
    }
  }

  // to get role of user or authority
  public getUserRole() {
    // console.log('inside getUSerRole');
    let user = this.getUser();
    // console.log(user.authorities[0].authority);
    return user.authorities[0].authority;
  }
}
