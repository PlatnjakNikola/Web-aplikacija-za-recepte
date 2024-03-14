import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { ShowRecipeComponent } from './recipes/show-recipe/show-recipe.component';
import { AppRoutingModule, RoutingModule } from './app-routing.module';
import { LoginRegisterComponent } from './account/login-register/login-register.component';
import { AddEditRecipeComponent } from './recipes/add-edit-recipe/add-edit-recipe.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    RecipesListComponent,
    ShowRecipeComponent,
    LoginRegisterComponent,
    AddEditRecipeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
