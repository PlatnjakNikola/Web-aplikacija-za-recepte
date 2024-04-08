import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService, Recipe } from 'src/app/services/recipes.service';
import { FirebaseStorage } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getDownloadURL, ref, Storage, uploadBytes, getStorage, deleteObject } from '@angular/fire/storage';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.css']
})
export class AddEditRecipeComponent implements OnInit {
  recipe!: any;
  id!: string;
  file!: File;
  ingredients!: string;
  ingredientsarray !: string[];
  activateAddEditIngredient: boolean = false;
  ingredientbackUp!: string;
  ingreditnt!: string;
  add: boolean = false;
  showErrorMessage: boolean = false;
  errorMessage: string = "";
  recipeTypes:String[] = ["Breakfast", "Lunch", "Dinner", "Appetizer", "Salad", "Main-course", "Side-dish", "Baked-goods", "Dessert", "Snack", "Soup", "Holiday", "Vegetarian"];
  constructor(private service: RecipesService, private storage: AngularFireStorage) { }

  @Input() recipeEdit!: any;
  //@Output() updateRecipeEvent: EventEmitter<any> = new EventEmitter<void>();

  ngOnInit() {
    this.recipe = { ...this.recipeEdit };
    //this.recipe = this.recipeEdit;
    this.id = this.recipeEdit.id;
    this.ingredients = this.recipe.ingredients.join('\n');
    if (this.id == "0")
      this.add = true;
  }

  onSelectFile(event: any) {
    this.file = event.target.files[0];
  }

  /*async uploadFile(file: File): Promise<void> {
    console.log('Hi!');
    const desertRef = ref(getStorage(), this.recipe.image);
    /*deleteObject(desertRef)
      .then(() => {
        console.log('Image deleted successfully!');*/
        /*const storageRef = ref(getStorage(), `image${this.id}`);
    const uploadTask = uploadBytes(storageRef, file);
    console.log('Hi3!');

        try {
          const snapshot = await uploadTask;
          console.log('Image uploaded successfully!');
          const downloadURL = await getDownloadURL(snapshot.ref);
          this.recipe.image = downloadURL;
          console.log('Download URL:', downloadURL);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      /*})
      .catch((error) => {
        console.error('Error deleting file:', error);
      });
    
  }*/

  async uploadFile(file: File): Promise<void> {
    const filePath = `image${this.id}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`image${this.id}`, file);

    if (this.recipe.image != "https://firebasestorage.googleapis.com/v0/b/web-aplikacija-za-recept-c7e86.appspot.com/o/default.jpg?alt=media&token=414cf1ee-da7a-4bbb-a7c1-83acc126b8c4") {
      try {
        await this.storage.refFromURL(this.recipe.image).delete();
        console.log('File deleted successfully!');
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
    try {
      const snapshot = await task.snapshotChanges().toPromise(); 
      const downloadURL = await fileRef.getDownloadURL().toPromise();
      this.recipe.image = downloadURL;
      console.log('Download URL:', downloadURL);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }


  async saveChanges(): Promise<void>{
    if (this.file) {
      await this.uploadFile(this.file);
    }

    this.recipe.ingredients = this.ingredients.trim().split('\n').filter((ingredient: string) => ingredient !== '')
   
   // console.log(this.recipe.ingredients);
   // console.log(this.recipe);

    if (JSON.stringify(this.recipe) !== JSON.stringify(this.recipeEdit)) {
      this.service.updateRecipe(this.recipe.id, this.recipe).subscribe(() => {
      },
        (error: any) => {
          alert(error.error);
        });
    }
    else {
      this.showErrorMessage = true;
      this.errorMessage = "No changes were made";
    }
  }

  async addRecipe(): Promise<void> {
    if (this.file) {
      await this.uploadFile(this.file);
    }
    else {
      this.recipe.image = "https://firebasestorage.googleapis.com/v0/b/web-aplikacija-za-recept-c7e86.appspot.com/o/default.jpg?alt=media&token=414cf1ee-da7a-4bbb-a7c1-83acc126b8c4";
    }

    if (this.recipe.title !== "" && this.recipe.ingredients !== "" && this.recipe.description !== "" && this.recipe.type !== "") {
      this.recipe.enabled = true;
      this.recipe.ingredients = this.ingredients.trim().split('\n').filter((ingredient: string) => ingredient !== '');
      console.log(this.recipe.ingredients);
      this.service.addRecipe(this.recipe).subscribe(() => {
        this.resetData();
      },
        (error: any) => {
          alert(error.error);
          console.log(error.error);
        });
    }
    else {
      this.errorMessage = "All fields must be filled in!";
      this.showErrorMessage = true;
    }
  }

  resetData() {
    this.recipe.title = "";
    this.recipe.description = "";
    this.recipe.ingredients = "";
    this.recipe.timeToPrepare = 0;
    this.recipe.type = "";
    this.showErrorMessage = false;
  }

  
}
