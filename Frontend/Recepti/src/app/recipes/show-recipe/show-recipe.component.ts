import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService, Recipe } from '../../services/recipes.service';
//import { AngularFireStorageModule } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

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
  admin: boolean = true;
  edit: boolean = false;
  id!: number;

  constructor(private service: RecipesService, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) { }

  /*@ViewChild('container') container!: ElementRef;
  @ViewChild('textarea') textarea!: ElementRef;

  adjustHeight(): void {
    console.log('adjustHeight called');
    if (this.textarea && this.container) {
      const textareaHeight = this.textarea.nativeElement.scrollHeight;
      this.container.nativeElement.style.height = textareaHeight + 'px';
    }
  }*/

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.recipe = JSON.parse(params['recipe']);
    });

    /*this.route.params.subscribe(params => {
      this.id = params['id'];
    });*/

    //this.recipe = this.service.getRecipeById(this.id);

    /*this.service.getRecipeById(this.id)
      .subscribe(
        (data: any[]) => {
          this.recipe = data;
          console.log('Podaci:', data);
        })

    this.recipe.description = this.recipe.description.replace("\n", '\n');*/
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
  }
  editRecipe(){
    this.edit = true;
  }
}
