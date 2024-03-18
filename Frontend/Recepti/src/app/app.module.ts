import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/*import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';*/
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

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
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
