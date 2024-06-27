import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {RecipeService} from "../../services/recipe.service";
import {switchMap, Subscription} from 'rxjs';
import {RecipeData} from "../../shared/interfaces";
import {Location} from '@angular/common';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss'
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup
  recipe!: RecipeData
  uSub!: Subscription

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private location: Location, private alert: AlertService) {
  }

  ingredientsControl() {
    return this.form.get('ingredients') as FormArray;
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.recipeService.getById(params['id']);
      })
    ).subscribe((recipe: RecipeData) => {
      this.recipe = recipe;
      this.form = new FormGroup({
        name: new FormControl(recipe.name, Validators.required),
        description: new FormControl(recipe.description, Validators.required),
        imgSrc: new FormControl(recipe.imgSrc, Validators.required),
        instruction: new FormControl(recipe.instruction, Validators.required),
        ingredients: new FormArray([])
      });
      recipe.ingredients.forEach((ingredient) => {
        const ingredientControl = new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          quantity: new FormControl(ingredient.quantity, Validators.required),
          quantityUnit: new FormControl(ingredient.quantityUnit, Validators.required)
        });

        this.ingredientsControl().push(ingredientControl);
      });
    });
  }

  addIngredient() {
    const newIngredientControl = new FormGroup({
      name: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      quantityUnit: new FormControl('', Validators.required)
    });

    this.ingredientsControl().push(newIngredientControl);
  }

  removeIngredient(index: number) {
    this.ingredientsControl().removeAt(index);
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe()
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.recipeService.update(
      {
        authorEmail: this.recipe.authorEmail,
        id: this.recipe.id,
        name: this.form.value.name,
        description: this.form.value.description,
        imgSrc: this.form.value.imgSrc,
        instruction: this.form.value.instruction,
        ingredients: this.form.value.ingredients,
        date: this.recipe.date
      }).subscribe(() => {
      this.location.back();
      this.alert.success("Рецепт был успешно отредактирован.");
    })
  }
}
