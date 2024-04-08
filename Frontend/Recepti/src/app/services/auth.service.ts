import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private loggedIn = false;
  private user: any = null;

  constructor(private router: Router) {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  isAdmin(): boolean {
    return this.user.isAdmin;
  }

  getUserData(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  login(userData: any) {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    this.loggedIn = true;
    this.user = userData;
  }

  logout() {
    this.loggedIn = false;
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('user');
    this.loggedIn = false;
    this.user = null;
  }
}
