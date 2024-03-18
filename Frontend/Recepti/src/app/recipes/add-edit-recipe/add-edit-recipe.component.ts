import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService, Recipe } from 'src/app/services/recipes.service';
//import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.css']
})
export class AddEditRecipeComponent implements OnInit {
  recipe!: Recipe;
  activateAddEditIngredient: boolean = false;
  ingredientbackUp!: string;
  ingreditnt!: string;
  recipeTypes:String[] = ["Breakfast", "Lunch", "Dinner", "Appetizer", "Salad", "Main-course", "Side-dish", "Baked-goods", "Dessert", "Snack", "Soup", "Holiday", "Vegetarian"];
  constructor(private fireStorage: AngularFireStorage) { }

  @Input() recipeEdit!: Recipe;

  ngOnInit() {
    //this.recipe = this.recipeEdit;
    this.recipe = { ...this.recipeEdit };
  }

  async onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const path = `yt/${file.name}`;
      const uploadTask = await this.fireStorage.upload(path, file);
      const url = await uploadTask.ref.getDownloadURL();
      console.log(url);
    }
  }

  /*handleFileInput(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.saveFileToLocalAssets(file);
  }

  saveFileToLocalAssets(file: File) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const base64Image: string = event.target.result;
      const img = new Image();
      img.src = base64Image;

      // Pretpostavljamo da ćemo sliku spremiti u assets/images folderu
      const filePath = `../../assets/images/${file.name}`;

      // Stvaranje slike na canvasu i spremanje u assets folder
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx !== null) {
        ctx.drawImage(img, 0, 0);
      }
      else {
        console.error("Canvas context is null.");
      }
      const imageData = canvas.toDataURL('image/jpeg', 1.0);

      // Pretvaranje base64 slike u File objekt
      const byteCharacters = atob(imageData.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const imageFile = new File([byteArray], file.name, { type: 'image/jpeg' });

      // Spremanje slike u lokalni assets folder
      const a = document.createElement('a');
      a.href = imageData;
      a.download = file.name;
      a.click();
    };

    reader.readAsDataURL(file);
  }*/
}
