import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { Auth, getAuth, User, provideAuth } from "@angular/fire/auth";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireStorageModule } from '@angular/fire/compat/storage'
//import { environment } from '../environments/environment';



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
/*const firebaseConfig = {
  apiKey: "AIzaSyBvM8600BoA5vGuLViqwffnxN-C_Lo31pc",
  authDomain: "web-app-za-prikaz-recepata.firebaseapp.com",
  projectId: "web-app-za-prikaz-recepata",
  storageBucket: "web-app-za-prikaz-recepata.appspot.com",
  messagingSenderId: "450548185656",
  appId: "1:450548185656:web:30a96d830672f73c6284cd"
};*/


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
    /*provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStorage(() => getStorage())*/
  ],
  providers: [/*importProvidersFrom([
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage())
  ])*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
