import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';


import { AppComponent } from './app.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { ShowRecipeComponent } from './recipes/show-recipe/show-recipe.component';
import { AppRoutingModule, RoutingModule } from './app-routing.module';
import { LoginRegisterComponent } from './account/login-register/login-register.component';
import { AddEditRecipeComponent } from './recipes/add-edit-recipe/add-edit-recipe.component';

const firebaseConfig = {
  apiKey: "AIzaSyAQykz8OsI4oB8IRd4tE8XoRjLR0hnDBfE",
  authDomain: "web-aplikacija-za-recept-c7e86.firebaseapp.com",
  projectId: "web-aplikacija-za-recept-c7e86",
  storageBucket: "web-aplikacija-za-recept-c7e86.appspot.com",
  messagingSenderId: "856621045537",
  appId: "1:856621045537:web:6080fd981b5d0313599060"
};


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
    AppRoutingModule,
  ],
  providers: [importProvidersFrom([
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage())
  ])],
  bootstrap: [AppComponent]
})
export class AppModule { }
