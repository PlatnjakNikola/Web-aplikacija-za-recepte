import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService, Recipe } from 'src/app/services/recipes.service';
import { FirebaseStorage } from '@angular/fire/storage';

import { doc, docData, Firestore, setDoc, getDoc, } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString, uploadBytes, getStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.css']
})
export class AddEditRecipeComponent implements OnInit {
  recipe!: any;
  id!: string;
  file!: File;
  activateAddEditIngredient: boolean = false;
  ingredientbackUp!: string;
  ingreditnt!: string;
  recipeTypes:String[] = ["Breakfast", "Lunch", "Dinner", "Appetizer", "Salad", "Main-course", "Side-dish", "Baked-goods", "Dessert", "Snack", "Soup", "Holiday", "Vegetarian"];
  constructor(private storage: Storage) { }

  @Input() recipeEdit!: any;

  ngOnInit() {
    this.recipe = { ...this.recipeEdit };
    this.id = this.recipeEdit.id;
  }
  url = `../../assets/img/image${this.id}.png`;

  onSelectFile(event: any) {
    this.file = event.target.files[0];
  }

  async uploadFile(file: File) {
    const storageRef = ref(getStorage(), `image${this.id}`);
    const uploadTask = uploadBytes(storageRef, file);

    try {
      const snapshot = await uploadTask;
      console.log('Image uploaded successfully!');
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Download URL:', downloadURL);
      // Save the URL to your database or use it as needed
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  saveChanges() {
    if (this.file) {
      this.uploadFile(this.file);
    }
  }

  
}
