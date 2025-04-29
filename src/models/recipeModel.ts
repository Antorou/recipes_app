import { connectionDB } from "../db/connectionDB";
import logger from "../logger";
import { Recipe } from "../types/recipe";

export async function findAllRecipes(): Promise<Recipe[]> {
    try {
      const connection = await connectionDB();
      const [rows] = await connection.execute("SELECT * FROM recipes");
      return rows as Recipe[];
    } catch (err) {
      logger.error("Erreur dans findAllRecipes:", err);
      throw err;
    }
}

export async function findRecipeById(id: number): Promise<Recipe | null> {
    try {
        const connection = await connectionDB();
        const [rows] = await connection.execute("SELECT * FROM recipes WHERE id = ?", [id]);

        const results = rows as Recipe[];
        return results.length > 0 ? results[0] : null;
    } catch (err) {
        logger.error(`Erreur dans findRecipeById(${id}):`, err);
        throw err;
    }
}

export async function insertRecipe(recipeData: Omit<Recipe, "id">): Promise<Recipe> {
    try {
      const connection = await connectionDB();
      const [result]: any = await connection.execute(
        `INSERT INTO recipes (title, ingredients, steps, category, prepTime, cookTime, difficulty, rating)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          recipeData.title,
          recipeData.ingredients,
          recipeData.steps,
          recipeData.category,
          recipeData.prepTime,
          recipeData.cookTime,
          recipeData.difficulty,
          recipeData.rating,
        ]
      );
  
      const id = result.insertId;
      return { id, ...recipeData };
    } catch (err) {
      logger.error("Erreur dans insertRecipe :", err);
      throw err;
    }
}

export async function updateRecipeInDB(id: number, recipeData: Partial<Omit<Recipe, "id">>): Promise<boolean> {
    try {
      const connection = await connectionDB();
      const [result]: any = await connection.execute(
        `UPDATE recipes SET title = ?, ingredients = ?, steps = ?, category = ?, prepTime = ?, cookTime = ?, difficulty = ?, rating = ?
         WHERE id = ?`,
        [
          recipeData.title,
          recipeData.ingredients,
          recipeData.steps,
          recipeData.category,
          recipeData.prepTime,
          recipeData.cookTime,
          recipeData.difficulty,
          recipeData.rating,
          id,
        ]
      );
  
      return result.affectedRows > 0;
    } catch (err) {
      logger.error("Erreur dans updateRecipeInDB :", err);
      throw err;
    }
}

export async function deleteRecipeFromDB(id: number): Promise<boolean> {
    try {
      const connection = await connectionDB();
      const [result]: any = await connection.execute(
        `DELETE FROM recipes WHERE id = ?`,
        [id]
      );
  
      return result.affectedRows > 0;
    } catch (err) {
      logger.error("Erreur dans deleteRecipeFromDB :", err);
      throw err;
    }
  }
  