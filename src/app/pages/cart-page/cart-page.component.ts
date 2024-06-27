import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../shared/interfaces";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private alert: AlertService) {
  }

  ngOnInit() {
    const ingredientsLS = localStorage.getItem('ingredients');
    if (ingredientsLS) {
      this.ingredients = JSON.parse(ingredientsLS);
    }
  }

  remove(name: string) {
    const deletedIngredientName = name;
    let ingredients = JSON.parse(localStorage.getItem('ingredients')!);
    const updatedIngredients = ingredients.filter((ingredient: {
      name: string;
    }) => ingredient.name !== deletedIngredientName);
    localStorage.setItem('ingredients', JSON.stringify(updatedIngredients));
    this.ingredients = updatedIngredients;
    this.alert.success('Ингредиент был успешно удалён.')
  }

  downloadIngredientsList(ingredients: any[]) {
    const formattedIngredients = ingredients.map(ingredient => `${ingredient.name} - ${ingredient.quantity} ${ingredient.quantityUnit}`).join('\n');

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(formattedIngredients));
    element.setAttribute('download', 'ингредиенты.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
}
