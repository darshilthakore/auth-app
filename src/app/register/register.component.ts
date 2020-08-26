import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMsg: string;

  constructor(
    public authService: AuthService
  ) { }


  ngOnInit(): void {
  }

  //signUp function
  signUp(email, password, username) {

    //check whether the username and email is allowed to register
    this.authService.getUsersInfo()
      .subscribe(response => {
        console.log(response);
        console.log({
          "user_name": username,
          "user_email": email
        });
        if (response.some( element => element.user_name === username && element.user_email === email)) {
          // if allowed, then create user
          console.log("allowed");
          this.authService.createUser(email, password)
          .then((response) => {
            console.log('Response', response);
            response.user.updateProfile({displayName: username});
            this.errorMsg = "Registration Successful! Login to your account"
          }).catch((error) => {
            this.errorMsg = error.message;
            console.log('Error', error);
          })
        } else {

          //else not allowed
          console.log("not allowed")
          this.errorMsg = "Registration not allowed";
        }

      })

  }
}
