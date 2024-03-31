import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe, RecipesService } from 'src/app/services/recipes.service';
import { Router } from '@angular/router';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipesList$!: Observable<any[]>;
  recipesListNoFilter$!: Observable<any[]>;
  recipes: any[] = [];
  admin: boolean = true;
  add: boolean = false;

  //Filtering
  recipesFilter: any = [];
  search: string = '';
  //typeFilter: string = '';
  filtered: boolean = false;
  recipe!: Recipe;

  constructor(private service: RecipesService, private http: HttpClient, private router: Router) {}

   ngOnInit() : void{
     this.recipesList$ = this.service.getRecipesList();
     this.recipesListNoFilter$ = this.service.getRecipesList();
   //this.recipesList$ = this.http.get<any>("../../../../recepti.json");
   //this.recipesList$ = this.http.get<any>("..\\..\\..\\assets\\recepti.json");
    }

   recipeShow(item: any) {
     this.router.navigate(['/recipe'], { queryParams: { recipe: JSON.stringify(item) } });
     //this.router.navigate(['/recipe', item.id]);
  }

  modalClose() {
    this.recipesList$ = this.service.getRecipesList();
  }
  addRecipe() {
    this.add = true;
    this.recipe = {
      id: 0,
      title: "",
      ingredients:[],
      description: "",
      timeToPrepare: 0,
      type: "",
      image: "",
      enabled: false
    }
  }

  deleteRecipe(recipe:any) {
    this.service.deleteRecipe(recipe.id).subscribe(() => {
      this.recipesList$ = this.service.getRecipesList();
    },
      (error: any) => {
        alert(error.error);
      });

  }

  searchRecipe() {
    this.recipesListNoFilter$ = this.recipesList$.pipe(share());
    console.log("Search:" + this.search);
    this.recipesList$ = this.service.getFilteredRecipesList(this.search);
  }
}
