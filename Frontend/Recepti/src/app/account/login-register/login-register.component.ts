import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service'
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


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

export class LoginRegisterComponent implements OnInit{
  username: string = "";
  email: string = "";
  password: string = "";
  confirm_password: string = "";
  loginPage: boolean = true;
  usernameOrEmail: string = "";
  showErrorMessage: boolean = false;
  errorMessage: string = "";
  usersInDatabase!: Observable<any[]>;

  @Output() loginSuccess: EventEmitter<LoginResponseSuccess> = new EventEmitter<LoginResponseSuccess>();

  constructor(private service: RecipesService) { }

  async ngOnInit() {
    this.usersInDatabase = await this.service.getUsersList();
  }

  showRegister() {
    this.loginPage = false;
    this.email = "";
    this.password = "";
  }

  showLogin() {
    this.loginPage = true;
    this.email = "";
    this.password = "";
    this.resetData();
  }

  login() {
    var login = {
      usernameOrEmail: this.usernameOrEmail,
      password: this.password
    }
    console.log(login);
    if (this.usernameOrEmail !== "" && this.password !== "") {
      this.service.loginUser(login).subscribe(
        (response) => {
          console.log(response);

          if ('id' in response) {
            this.resetData();
            this.loginSuccess.emit(response as LoginResponseSuccess);
          } else {
            this.showErrorMessage = true;
            //console.error('Prijava nije uspjela. Greška:', (response as any).title);
          }
        },
        (error) => {
          this.errorMessage = "Invalid username or password. Please try again.";
          this.showErrorMessage = true;
          console.error('Došlo je do greške prilikom prijave:', error);
        }
      );
    }
    else {
      this.errorMessage = "All fields must be filled in."
      this.showErrorMessage = true;
    }
  }

  async register(): Promise<void> {
    const emailFormControl = new FormControl(this.email, [
      Validators.required,
      Validators.email
    ]);

    if (this.confirm_password === this.password && this.username !== "" && this.email !== "" && this.password !== "") {
      const users = await this.service.getUsersList().toPromise();
      if (users) {
        const existingUserByUsername = users.find(user => user.username === this.username);
        const existingUserByEmail = users.find(user => user.email === this.email);

        if (existingUserByUsername) {
          this.errorMessage = "Username already exists";
          this.showErrorMessage = true;
        }
        else if (existingUserByEmail) {
          this.errorMessage = "Email already exists";
          this.showErrorMessage = true;
        }
        else {
          var user = {
            username: this.username,
            email: this.email,
            password: this.password,
            isAdmin: false

          }
          console.log(user);
          await this.service.addUser(user).subscribe(() => {
            this.resetData();
          },
            (error: any) => {
              alert(error.error);
            });
        }
      }
      }
      
    else if (this.username !== "" || this.email !== "" || this.password !== "" || this.confirm_password !== "") {
      this.errorMessage = "All fields must be filled in.";
      this.showErrorMessage = true;
    }
    else if (this.confirm_password === this.password) {
      this.errorMessage = "Passwords aren't the same!";
      this.showErrorMessage = true;
    }
    else if (!emailFormControl.valid) {
      this.errorMessage = "Invalid email";
      this.showErrorMessage = true;
      }
 }


  resetData() {
    this.loginPage = true;
    this.username = "";
    this.email = "";
    this.password = "";
    this.confirm_password = "";
    this.usernameOrEmail = "";
    this.showErrorMessage = false;
  }
}
