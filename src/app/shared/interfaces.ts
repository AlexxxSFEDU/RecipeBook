export interface Ingredient {
  name: string;
  quantity: number;
  quantityUnit: string;
}

export interface RecipeData {
  authorEmail: string
  name: string;
  description: string;
  imgSrc: string;
  instruction: string;
  ingredients: Ingredient[];
  date: Date
  id?: string
}
export interface FbCreateResponse
{
  name: string
}

export interface Alert
{
  type: AlertType,
  text: string
}

export type AlertType = 'success' | 'danger'

