import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService, Recipe } from '../../services/recipes.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.css']
})
export class ShowRecipeComponent implements OnInit { 
  recipe!: any;
  login: boolean = false;
  comment: string = "";
  open: boolean = false;
  admin: boolean = false;
  edit: boolean = false;
  recipeId!: number | string;
  userId!: number | string;
  favorite: boolean = false;
  favoriteId!: number | string;

  constructor(private service: RecipesService, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) { }


  async ngOnInit(): Promise<void> {
    this.admin = this.route.snapshot.params['admin'];
    this.recipeId = this.route.snapshot.params['recipeId'];

    this.service.getFavoriteRecipes().subscribe(
      (favorites) => {
        const favorite = favorites.find(favorite => favorite.recipeId === +this.recipeId);
        if (favorite) {
          this.favorite = true;
          this.favoriteId = favorite.id;
          //console.log(this.favoriteId);
        } else {
          this.favorite = false;
          this.favoriteId = 0;
        }

        this.service.getRecipeById(this.recipeId).subscribe(
          (response) => {
            this.recipe = response;
            console.log(this.recipe);
          },
          (error) => {
            console.error('Error fetching recipe:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching favorite recipes:', error);
      }
    );
  }


  formateText(originalArray: any[]): any {
    /*const ingredientsArray = originalString.split(', ');
    const formattedString = ingredientsArray.join(',\n');*/
    const ingredientsArray = originalArray.map(obj => obj.toString());
    const formattedString = ingredientsArray.join(',\n');
    return formattedString;
  }

  backToHome() {
    this.router.navigate(['/']);
  }

  addFavorite() {
    this.open = true;
    this.service.addFavorite().subscribe();
    this.favorite = true;
  }

  removeFavorite() {
    this.service.removeFavorite(this.favoriteId).subscribe(
      () => {
        this.favoriteId = 0;
        this.favorite = false;
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  editRecipe(){
    this.edit = true;
  }

  async modalClose() {
    this.recipe = await this.service.getRecipeById(this.recipeId).toPromise();
  }
}
