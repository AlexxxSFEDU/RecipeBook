import { Pipe, PipeTransform } from '@angular/core';
import {RecipeData} from "../shared/interfaces";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(recipes: RecipeData[], search=''): RecipeData[] {
    if (!search.trim())
    {
      return recipes
    }

    return recipes.filter(recipe =>
    {
      return recipe.name.toLowerCase().includes(search.toLowerCase())
    })
  }

}
