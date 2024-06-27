import {Component, OnInit} from '@angular/core';
import {RecipeData} from "../../shared/interfaces";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss'
})
export class FavoritesPageComponent implements OnInit {
  favoriteRecipes: RecipeData[] = [];

  constructor(private alert: AlertService) {
  }

  ngOnInit() {
    const favoriteRecipesLS = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipesLS) {
      this.favoriteRecipes = JSON.parse(favoriteRecipesLS);
    }
  }

  remove(id: string | undefined) {
    const deletedRecipeId = id;
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')!);
    const updatedRecipes = favoriteRecipes.filter((recipe: { id: string; }) => recipe.id !== deletedRecipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
    this.favoriteRecipes = updatedRecipes;
    this.alert.success('Рецепт был успешно удалён из избранных.')
  }
}
