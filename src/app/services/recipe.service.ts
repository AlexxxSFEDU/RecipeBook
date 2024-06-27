import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbCreateResponse, RecipeData} from "../shared/interfaces";
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) {
  }

  create(recipe: RecipeData): Observable<RecipeData> {
    return this.http.post<RecipeData>('https://recipe-book-7b83e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipe).pipe(map
    ((response: FbCreateResponse) => {
        return {
          ...recipe,
          id: response.name,
          date: new Date(recipe.date)
        }
      }
    ))
  }

  getAll(): Observable<RecipeData[]> {
    return this.http.get("https://recipe-book-7b83e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json")
      .pipe(map((response: { [key: string]: any }) => {
        return response ? Object.keys(response).map(key => ({
          ...response[key],
          id: key,
          date: new Date(response[key].date)
        })) : [];
      }))

  }

  getById(id: string): Observable<RecipeData> {
    return this.http.get<RecipeData>(`https://recipe-book-7b83e-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}.json`)
      .pipe(map((recipe: RecipeData) => {
        return {
          ...recipe, id,
          date: new Date(recipe.date)
        }
      }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`https://recipe-book-7b83e-default-rtdb.europe-west1.firebasedatabase.app/recipes/${id}.json`)
  }

  update(recipe: RecipeData): Observable<RecipeData> {
    return this.http.patch<RecipeData>(`https://recipe-book-7b83e-default-rtdb.europe-west1.firebasedatabase.app/recipes/${recipe.id}.json`, recipe)
  }


}
