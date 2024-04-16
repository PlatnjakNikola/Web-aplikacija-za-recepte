import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../services/recipes.service';
import jsPDF from 'jspdf';
import domToImage from 'dom-to-image';
import * as moment from 'moment';
import html2canvas from 'html2canvas';
import { AuthService } from 'src/app/services/auth.service';
import { RecipesListComponent } from 'src/app/recipes/recipes-list/recipes-list.component';

@Component({
  selector: 'app-show-recipe',
  templateUrl: './show-recipe.component.html',
  styleUrls: ['./show-recipe.component.css']
})
export class ShowRecipeComponent implements OnInit { 
  recipe!: any;
  login: boolean = false;
  comment: string = "";
  open: boolean = false;
  admin: boolean = false;
  edit: boolean = false;
  recipeId!: number | string;
  userId!: number | string;
  user: any;
  favorite: boolean = false;
  favoriteId!: number | string;
  foundUnits: boolean = false;

  @ViewChild('recipe-content', { static: false }) public dataToExport!: ElementRef;
  @ViewChild(RecipesListComponent) recipePage!: RecipesListComponent;

  constructor(private service: RecipesService, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef, private authService: AuthService, private location : Location) { }


  async ngOnInit(): Promise<void> {
    this.admin = this.authService.isAdmin();
    this.user = this.authService.getUserData();
    this.recipeId = this.route.snapshot.params['recipeId'];
    console.log("User: " + this.user);
    this.service.getFavoriteRecipesByUserId(this.user.id).subscribe(
      (favorites) => {
        const favorite = favorites.find(favorite => favorite.recipeId === +this.recipeId);
        if (favorite) {
          this.favorite = true;
          this.favoriteId = favorite.id;
        } else {
          this.favorite = false;
          this.favoriteId = 0;
        }

        this.service.getRecipeById(this.recipeId).subscribe(
          (response) => {
            this.recipe = response;
            console.log(this.recipe);
          },
          (error) => {
            console.error('Error fetching recipe:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching favorite recipes:', error);
      }
    );
  }


  formateText(originalArray: any[]): any {
    /*const ingredientsArray = originalString.split(', ');
    const formattedString = ingredientsArray.join(',\n');*/
    const ingredientsArray = originalArray.map(obj => obj.toString());
    const formattedString = ingredientsArray.join(',\n');
    return formattedString;
  }

  backToHome() {
    this.location.back();
    //this.recipePage.goBack();
  }

  addFavorite() {
    this.open = true;
    const addFavorite = {
      recipeId: this.recipeId,
      userId: this.user.id
    }
    console.log(addFavorite);
    this.service.addFavorite(addFavorite).subscribe(
      (response:any) => {
        this.favoriteId = response.id;
        console.log(this.favoriteId);
      });
    this.favorite = true;
    this.recipe.numberOfFavorites++;
  }

  removeFavorite() {
    this.service.removeFavorite(this.favoriteId).subscribe(
      () => {
        this.favoriteId = 0;
        this.favorite = false;
        this.recipe.numberOfFavorites--;
      },
      (error: any) => {
        alert(error.error);
      }
    );
  }

  editRecipe(){
    this.edit = true;
  }

  async modalClose() {
    this.recipe = await this.service.getRecipeById(this.recipeId).toPromise();
  }

  async saveAsPDF() {
    const titleElement: any = document.getElementById('recipeTitle');
    const data: any = document.getElementById('recipe-content');

    const doc = new jsPDF('p', 'mm', 'a4');

    const titleText = titleElement.querySelector('h1').innerText; 
    const timeToPrepare = titleElement.querySelector('p').innerText;

    doc.setFontSize(16);
    doc.setTextColor(80, 77, 78);
    doc.setFont('helvetica', 'bold');
    doc.text(titleText, 10, 20);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(timeToPrepare, 10, 30);
   // doc.addImage(this.recipe.image, 'JPEG', 10, 30, 100, 90);

    html2canvas(data).then((canvasContent) => {
      const contentDataURL = canvasContent.toDataURL('image/jpeg');

      const contentImgWidth = 208;
      const contentImgHeight = canvasContent.height * contentImgWidth / canvasContent.width;
      doc.addImage(contentDataURL, 'JPEG', 5, 40, contentImgWidth, contentImgHeight);
      doc.save(this.recipe.title +'.pdf');
    });
  }

  async convertUnits() {
    const europeanUnits = [
      'kg', 'g', 'kilogram(me)?s?',
      'gramm', 'gram(me)?s?',
      'liter', 'lit(er)?s?', 'l',
      'mililiter', 'mililit(er)?s?', 'ml',
      'decilit(er)?s?', 'dl'
    ];

    const regex = new RegExp('\\b(' + europeanUnits.join('|') + ')\\b', 'gi');

    const hasEuropeanUnits = this.recipe.ingredients.some((ingredient: string) => {
      return regex.test(ingredient.toLowerCase());
    });

    console.log(hasEuropeanUnits);

    if (hasEuropeanUnits) {
      await this.service.convertToAmerican(this.recipeId).subscribe(
        (response) => this.recipe = response)
    }
    else {
      await this.service.convertFromAmerican(this.recipeId).subscribe(
        (response) => this.recipe = response)
    }
  }


}
