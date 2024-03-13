import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {

  firstName: String = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  confirm_password: string = "";
  loginPage: boolean = true;

  showRegister() {
    this.loginPage = false;
    this.email = "";
    this.password = "";
  }
  showLogin() {
    this.loginPage = true;
    this.email = "";
    this.password = "";
  }

  login() {

  }

  register() {
    if (this.confirm_password == this.password) {

    }
  }
}
