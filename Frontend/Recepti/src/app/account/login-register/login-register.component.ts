import { Component, Output, EventEmitter } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service'


interface LoginResponseSuccess {
  id: number;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface LoginResponseError {
  type: string;
  title: string;
  status: number;
  traceId: string;
}

type LoginResponse = LoginResponseSuccess | LoginResponseError;

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
  usernameOrEmail: string = "";

  //@Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();
  @Output() loginSuccess: EventEmitter<LoginResponseSuccess> = new EventEmitter<LoginResponseSuccess>();

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
    var login = {
      usernameOrEmail: this.usernameOrEmail,
      password: this.password
    }
    console.log(login);
    this.service.loginUser(login).subscribe(
      (response) => {
        console.log(response); 

        if ('id' in response) {
          this.loginPage = true;
          this.firstName = "";
          this.lastName = "";
          this.username = "";
          this.email = "";
          this.password = "";
          this.confirm_password = "";
          this.loginPage = true;
          this.usernameOrEmail = "";
          this.loginSuccess.emit(response as LoginResponseSuccess);
        } else {
          console.error('Prijava nije uspjela. Greška:', (response as any).title);
        }
      },
      (error) => {
        // Greška prilikom komunikacije s serverom
        console.error('Došlo je do greške prilikom prijave:', error);
      }
    );
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
        this.loginPage = true;
        this.firstName= "";
        this.lastName = "";
        this.username = "";
        this.email= "";
        this.password= "";
        this.confirm_password= "";
        this.loginPage= true;
        this.usernameOrEmail = "";
      },
        (error: any) => {
          alert(error.error);
        });
    };
  }
}
