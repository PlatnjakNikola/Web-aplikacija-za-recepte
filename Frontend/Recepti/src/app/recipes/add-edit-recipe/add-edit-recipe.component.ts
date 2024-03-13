import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.css']
})
export class AddEditRecipeComponent implements OnInit {
  recipe: any;
  activateAddEditIngredient: boolean = false;
  ingredientbackUp!: string;
  ingreditnt!:string;
  constructor() { }
  @Input() recipeEdit: any;

  ngOnInit() {
    this.recipe = this.recipeEdit;
  }
}
