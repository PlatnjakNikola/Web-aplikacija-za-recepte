import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private loggedIn = false;
  private user: any = null;
  //private _recipesList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  //recipesList$: Observable<any[]> = this._recipesList$.asObservable();
  recipesList$!: Observable<any[]>;
  recipeListType!: string;
  search!: string;

  constructor(private router: Router) {
    this.loggedIn = localStorage.getItem('loggedIn') === 'true';
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  setRecipeList(recipeList$: Observable<any[]>) {
    this.recipesList$ = recipeList$;
  }
  setRecipeListType(type: string, search: string) {
    this.recipeListType = type;
    this.search = search;
  }

  getRecipeList(): Observable<any[]> {
    return this.recipesList$;
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
