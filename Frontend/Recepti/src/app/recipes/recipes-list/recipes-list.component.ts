import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipesList$!: Observable<any[]>;
  recipesListNoFilter$!: Observable<any[]>;
  recipes: any[] = [];

  //Filtering
  recipesFilter: any = [];
  MealFilter: string = '';
  typeFilter: string = '';
  filtered: boolean = false;
  recipe: any;

  constructor(private service: RecipesService, private http: HttpClient, private router: Router) {}

   ngOnInit() : void{
     this.recipesList$ = this.service.getRecipesList();
   //this.recipesList$ = this.http.get<any>("../../../../recepti.json");
   //this.recipesList$ = this.http.get<any>("..\\..\\..\\assets\\recepti.json");
    }

   recipeShow(item: any) {
     this.router.navigate(['/recipe'], { queryParams: { recipe: JSON.stringify(item) } });
     //this.router.navigate(['/recipe', item.id]);
  }
}
