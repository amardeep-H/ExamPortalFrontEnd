import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    // // get data from local storage 
    this.user = this.loginService.getUser();

    // // get user data from server
    // this.loginService.getCurrentUser().subscribe(
    //   (user: any) => {
    //     this.user = user;
    //   },
    //   (error) => {
    //     alert('Error');
    //   }
    // );
  }
}
