import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShowRecipeComponent } from './recipes/show-recipe/show-recipe.component';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  //{ path: 'recipe/:id', component: ShowRecipeComponent }
  { path: 'recipe/:admin/:recipeId', component: ShowRecipeComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export class RoutingModule { }
