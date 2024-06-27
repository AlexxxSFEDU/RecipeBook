import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../services/recipe.service";
import {Router} from "@angular/router";
import {RecipeData} from "../../shared/interfaces";
import {AuthService} from "../../auth/auth.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.scss'
})
export class CreatePageComponent implements OnInit {
  form!: FormGroup;

  constructor(private recipeService: RecipeService, private router: Router, private authService: AuthService, private alert: AlertService) {
  }

  ingredientsControl = () => this.form.get('ingredients') as FormArray;

  onIngredientAdd() {
    const ingredientControl = new FormGroup({
      name: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      quantityUnit: new FormControl(null, Validators.required)
    });
    this.ingredientsControl().push(ingredientControl);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      imgSrc: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      instruction: new FormControl(null, Validators.required),
      ingredients: new FormArray([])
    });
  }

  submit() {
    const recipe: RecipeData =
      {
        authorEmail: this.authService.email!,
        name: this.form.value.name,
        imgSrc: this.form.value.imgSrc,
        description: this.form.value.description,
        ingredients: this.form.value.ingredients,
        instruction: this.form.value.instruction,
        date: new Date()
      }
    this.recipeService.create(recipe).subscribe(() => {
      this.form.reset()
      this.alert.success("Recipe added successfully.");
    })
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }
}
