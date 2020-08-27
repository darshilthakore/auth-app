import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMsg: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  //login function
  logIn(email, password) {
    this.authService.loginUser(email, password)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/home']);
      }).catch((error) => {
        this.errorMsg = error;
      })
  }

}
