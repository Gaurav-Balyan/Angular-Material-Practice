import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../shared/models/user.model';
import { ClientDetails } from 'src/app/shared/models/client-details.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  clientDetails: ClientDetails;
  loginError: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getClientDetails();
  }

  // Needed resolver to prevent route being loaded before receiving client data
  getClientDetails() {
    this.route.data.subscribe(({ data }) => {
      this.clientDetails = data[0];
    });
  }

  onLogin(loginForm: NgForm) {
    const userid: string = loginForm.value.email;
    const password: string = loginForm.value.password;
    const userLoginData: UserLogin = {
      userid,
      password
    };

   // Authenticate the user and set the token
    this.authService.authenticateUser(userLoginData).subscribe(
      res => {
        if (res.token!= 'Invalid User!') {
          this.authService.setUserData(res);
          
          localStorage.setItem('ACCESS_TOKEN', res.token);
          this.router.navigateByUrl('/cards');
        }
        else{
          this.loginError = 'Email or Password is incorrect';
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
