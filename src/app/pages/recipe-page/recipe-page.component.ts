import {Component, inject, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import {Ingredient, RecipeData} from '../../shared/interfaces';
import { RecipeService } from '../../services/recipe.service';
import {AuthService} from "../../auth/auth.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit {
  recipe$!: Observable<RecipeData>;
  favoriteRecipes!: RecipeData[];
  ingredients!: Ingredient[];
  email = inject(AuthService).email
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private alert: AlertService,
  ) {}

  ngOnInit(): void {
    const favoriteRecipesLS = localStorage.getItem('favoriteRecipes');
    const ingredientsLS = localStorage.getItem('ingredients');
    if (favoriteRecipesLS) {
      this.favoriteRecipes = JSON.parse(favoriteRecipesLS);
    } else {
      this.favoriteRecipes = [];
    }
    if (ingredientsLS)
    {
      this.ingredients = JSON.parse(ingredientsLS);
    } else
    {
      this.ingredients = [];
    }

    this.recipe$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.recipeService.getById(params['id']);
      })
    );
  }


  addToFavorites(recipe: RecipeData): void {
    const isRecipeAlreadyAdded = this.favoriteRecipes.some(favRecipe => favRecipe.id === recipe.id);
    if (!isRecipeAlreadyAdded) {
      const updatedFavoriteRecipes = [...this.favoriteRecipes, recipe];
      this.favoriteRecipes = updatedFavoriteRecipes;
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
      this.favoriteRecipes = updatedFavoriteRecipes;
      this.alert.success(`Рецепт ${recipe.name} был успешно добавлен в избранное.`);
    }
  }

  isRecipeInFavorites(recipe: RecipeData): boolean {
    const isRecipeAlreadyAdded = this.favoriteRecipes.some(favRecipe => favRecipe.id === recipe.id);
    if (!isRecipeAlreadyAdded)
    {
      return false
    }
    return true
  }

  addToCart(ingredients: Ingredient[]) {
    const ingredientsNames = ingredients.map(ingredient => ingredient.name);
    const isIngredientAlreadyAdded = this.ingredients.some(item => ingredientsNames.includes(item.name));
    if (!isIngredientAlreadyAdded) {
      const updatedIngredients = [...this.ingredients, ...ingredients];
      this.ingredients = updatedIngredients;
      localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
      this.alert.success(`Ингредиенты были добавлены в корзину.`);
    }
  }

  isIngredientsInCart(ingredients: Ingredient[]): boolean {
    if (ingredients.length === 0) {
      return false;
    }

    const ingredientsNames = ingredients.map(ingredient => ingredient.name);

    if (!this.ingredients) {
      return false;
    }

    const isIngredientAlreadyAdded = this.ingredients.some(item => ingredientsNames.includes(item.name));

    if (!isIngredientAlreadyAdded) {
      return false;
    }

    return true;
  }

}
