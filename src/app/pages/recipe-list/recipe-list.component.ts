import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {RecipeService} from "../../services/recipe.service";
import {RecipeData} from "../../shared/interfaces";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  constructor(private recipeService: RecipeService, private authService: AuthService) {
  }

  recipes: RecipeData[] = []
  email: string | undefined;
  rSub: Subscription | undefined;
  dSub: Subscription | undefined
  searchStr = ''

  remove(id: string) {
    this.dSub = this.recipeService.remove(id).subscribe(() => {
      this.recipes = this.recipes.filter(recipe => recipe.id !== id)
    })
    const deletedRecipeId = id;
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')!) || [];
    const updatedRecipes = favoriteRecipes.filter((recipe: { id: string; }) => recipe.id !== deletedRecipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
  }

  ngOnInit() {
    this.email = this.authService.email!;
    this.rSub = this.recipeService.getAll().subscribe(recipes => {
      this.recipes = recipes
    })
  }

  ngOnDestroy() {
    if (this.rSub) {
      this.rSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

  clearStr() {
    this.searchStr = ''
  }
}
