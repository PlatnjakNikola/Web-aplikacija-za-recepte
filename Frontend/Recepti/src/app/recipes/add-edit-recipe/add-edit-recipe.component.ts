import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService, Recipe } from 'src/app/services/recipes.service';
import { FirebaseStorage } from '@angular/fire/storage';
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
  recipeTypes:String[] = ["Breakfast", "Lunch", "Dinner", "Appetizer", "Salad", "Main-course", "Side-dish", "Baked-goods", "Dessert", "Snack", "Soup", "Holiday", "Vegetarian"];
  constructor(private service:RecipesService) { }

  @Input() recipeEdit!: any;
  //@Output() updateRecipeEvent: EventEmitter<any> = new EventEmitter<void>();

  ngOnInit() {
    this.recipe = { ...this.recipeEdit };
    //this.recipe = this.recipeEdit;
    this.id = this.recipeEdit.id;
    this.ingredients = this.recipe.ingredients.join('\n');
  }

  onSelectFile(event: any) {
    this.file = event.target.files[0];
  }

  async uploadFile(file: File) {
    const desertRef = ref(getStorage(), this.recipe.image);
    /*deleteObject(desertRef)
      .then(() => {
        console.log('Image deleted successfully!');*/
        const storageRef = ref(getStorage(), `image${this.id}`);
        const uploadTask = uploadBytes(storageRef, file);

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
      });*/
    
  }

  async saveChanges(): Promise<void>{
    if (this.file) {
      await this.uploadFile(this.file);
    }

    this.recipe.ingredients = this.ingredients.trim().split('\n').filter((ingredient: string) => ingredient !== '')
   
      


    console.log(this.recipe.ingredients);

   /*var recipe = {
      title: this.recipe.title,
      ingredients: this.recipe.ingredients,
      description: this.recipe.description,
      timeToPrepare: this.recipe.timeToPrepare,
      type: this.recipe.type,
      image: this.recipe.image,
      enabled: true
    }*/
    console.log(this.recipe);

    if (JSON.stringify(this.recipe) !== JSON.stringify(this.recipeEdit)) {
      this.service.updateRecipe(this.recipe.id, this.recipe).subscribe(() => {
      },
        (error: any) => {
          alert(error.error);
        });
    }
    else {
      console.log("no changes were made")
    }
  }

  
}
