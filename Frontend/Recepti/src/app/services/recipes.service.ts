import { Time } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Recipe {
  id: number,
  title: string,
  ingredients: string[],
  description: string,
  timeToPrepare: Time,
  type: string,
  image: string,
  enabled: boolean
}

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  readonly APIURL = "https://localhost:7227/api";
  constructor(private http: HttpClient) { }

  //Recipes
  getRecipesList(): Observable<any[]> {
    return this.http.get<any>(this.APIURL + '/Recipes');
  }
  getRecipeById(id: number | string): Observable<any[]> {
    return this.http.get<any[]>(this.APIURL + `/Recipes/${id}`);
  }
  updateRecipe(id: number, recipe: any) {
    return this.http.put(this.APIURL + `/Recipes/${id}`, recipe);
  }
  deleteRecipe(id: number) {
    return this.http.delete(this.APIURL + `/Recipes/${id}`);
  }
  /*getFilteredRecipesList(name: string, type: string): Observable<any[]> {
    const params = new HttpParams()
      .set('name', name)
      .set('type', type);

    return this.http.get<any>(this.APIURL + '/recipes/filter', { params });
  }*/
}
