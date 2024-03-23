import { Component } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service'

@Component({
  selector: 'app-login',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {

  firstName: String = "";
  lastName: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  confirm_password: string = "";
  loginPage: boolean = true;

  constructor(private service: RecipesService) { }

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

  async register(): Promise<void> {
    if (this.confirm_password === this.password && this.username !== "" && this.email !== "" && this.password !== "") {
      var user = {
        username: this.username,
        email: this.email,
        password: this.password,
        isAdmin: false

      }
      console.log(user);
      await this.service.addUser(user).subscribe(() => {
      },
        (error: any) => {
          alert(error.error);
        });
    };
  }
}
