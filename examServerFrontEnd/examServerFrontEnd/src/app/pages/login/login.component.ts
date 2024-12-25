import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };
  constructor(
    private router: Router,
    private snack: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  clearData() {
    this.loginData = {
    username: '',
    password: '',
  };
    return false;
  }

  formSubmit() {
    console.log('login form submitted');
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username is required !!', '', {
        duration: 3000,
      });
      return;
    }

    if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required !!', '', {
        duration: 3000,
      });
      return;
    }

    //request to server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser().subscribe((user: any) => {
          console.log('getting current user');
          this.loginService.setUser(user);
          console.log(user);

          //redirect
          // if role is admin redirect to admin dashboard.
          // if role is normal redirect to normal users dashboard.

          if (this.loginService.getUserRole() == 'NORMAL') {
            //route to the admin dashboard
            // window.location.href = '/user-dashboard';
            this.router.navigate(['user-dashboard/0']);
            this.loginService.loginStatusSubject.next(true);
          } else if (this.loginService.getUserRole() == 'ADMIN') {
            //route to the admin dashboard
            // window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubject.next(true);
          } else {
            this.loginService.logout();
            this.router.navigate(['login']);
          }
        });
      },
      (error) => {
        console.log('Error while Generating Token.');
      }
    );
  }
}
