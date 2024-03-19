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
  admin: boolean = true;
  edit: boolean = false;
  id!: number | string;

  constructor(private service: RecipesService, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) { }


  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      this.recipe = JSON.parse(params['recipe']);
    });
    

    this.id = this.recipe.id;
    this.recipe = await this.service.getRecipeById(this.id).toPromise();
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
  }
  editRecipe(){
    this.edit = true;
  }

  async modalClose() {
    this.recipe = await this.service.getRecipeById(this.id).toPromise();
  }
}
