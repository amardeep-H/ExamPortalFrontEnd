import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  clearData() {
    // alert("!!! Clear Data is clicked !!!")
    this.user = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
    };
    return false;
  }

  formSubmit() {
    if (this.user.username.trim() == '') {
      this._snackBar.open('username is required..!', 'ok', {
        duration: 3000,
      });
      return;
    }

    if (this.user.password.trim() == '') {
      this._snackBar.open('password is required..!', 'ok', {
        duration: 3000,
      });
      return;
    }

    //addUser from userservice
    this.userService.addUser(this.user).subscribe(
      (data) => {
        //success
        console.log(data);
        // this._snackBar.open('User added successfully.', 'ok', {
        //   duration: 3000,
        // });

        Swal.fire('Success', 'User is Registered Successfully.', 'success');
      },
      (error) => {
        console.error();
        this._snackBar.open('Something Went Wrong.', 'ok', {
          duration: 3000,
        });
      }
    );
  }
}
