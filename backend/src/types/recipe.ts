export interface Recipe {
  id: number;
  title: string;
  ingredients: string;
  steps: string;
  category: string;
  prepTime: number;
  cookTime: number;
  difficulty: string;
  rating: number;
}