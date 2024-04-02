import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService, Recipe } from '../../services/recipes.service';
import jsPDF from 'jspdf';
//import * as jsPDF from 'jspdf';
import domToImage from 'dom-to-image';
//import moment from 'moment';
import * as moment from 'moment';
import html2canvas from 'html2canvas';
import { AuthService } from 'src/app/services/auth.service'

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
  favorite: boolean = false;
  favoriteId!: number | string;

  @ViewChild('recipe-content', { static: false }) public dataToExport!: ElementRef;

  constructor(private service: RecipesService, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef, private authService: AuthService) { }


  async ngOnInit(): Promise<void> {
    //this.admin = this.route.snapshot.params['admin'];
    this.admin = this.authService.isAdmin();
    this.recipeId = this.route.snapshot.params['recipeId'];

    this.service.getFavoriteRecipes().subscribe(
      (favorites) => {
        const favorite = favorites.find(favorite => favorite.recipeId === +this.recipeId);
        if (favorite) {
          this.favorite = true;
          this.favoriteId = favorite.id;
          //console.log(this.favoriteId);
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
    this.router.navigate(['/']);
  }

  addFavorite() {
    this.open = true;
    this.service.addFavorite().subscribe();
    this.favorite = true;
  }

  removeFavorite() {
    this.service.removeFavorite(this.favoriteId).subscribe(
      () => {
        this.favoriteId = 0;
        this.favorite = false;
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

  /*async saveAsPDF() {
    const data1: any = document.getElementById('recipeTitle');
    const data: any = document.getElementById('recipe-content'); // Id of the table
    await html2canvas(data).then((canvas) => {
      // Get canvas data URL
      const contentDataURL = canvas.toDataURL('image/jpeg');

      // Create PDF document
      const doc = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      // Add image to PDF
      doc.addImage(contentDataURL, 'JPEG', 0, 0, imgWidth, imgHeight);

      // Add text to PDF
      doc.setFontSize(16);
      doc.setTextColor(80, 77, 78);

      doc.save('recipe.pdf');
    });
  }*/

  async saveAsPDF() {
    const titleElement: any = document.getElementById('recipeTitle');
    const data: any = document.getElementById('recipe-content');

    const doc = new jsPDF('p', 'mm', 'a4');

    const titleText = titleElement.querySelector('h1').innerText; 
    const timeToPrepare = titleElement.querySelector('p').innerText;

    doc.setFontSize(16);
    doc.setTextColor(80, 77, 78);
    doc.text(titleText, 10, 10);
    doc.setFontSize(12);
    doc.text(timeToPrepare, 10, 20);
   // doc.addImage(this.recipe.image, 'JPEG', 10, 30, 100, 90);

    html2canvas(data).then((canvasContent) => {
      const contentDataURL = canvasContent.toDataURL('image/jpeg');

      const contentImgWidth = 208;
      const contentImgHeight = canvasContent.height * contentImgWidth / canvasContent.width;
      doc.addImage(contentDataURL, 'JPEG', 10, 30, contentImgWidth, contentImgHeight);
      doc.save(this.recipe.title +'.pdf');
    });
  }


}
