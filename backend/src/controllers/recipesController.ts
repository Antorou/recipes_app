import { Request, Response, RequestHandler} from "express";
import logger from "../logger";
import { 
    findAllRecipes, 
    findRecipeById, 
    insertRecipe, 
    updateRecipeInDB,
    deleteRecipeFromDB } from "../models/recipeModel";

export async function getAllRecipes(req: Request, res: Response) {
    try {
      const recipes = await findAllRecipes();
      res.json(recipes);
    } catch (err) {
      logger.error("Erreur lors de la récupération des recettes :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
}

export const getRecipeById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        res.status(400).json({ error: "ID invalide" });
        return;
    }

    try {
        const Recipe = await findRecipeById(id);
        if (!Recipe) {
        res.status(404).json({ error: "Recipe not found" });
        return;
        }

        res.json(Recipe);
        logger.info(`Recipe ${id} found`, id);
    } catch (err) {
        console.error("Error while retrieving recipe:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
}

export const createRecipe: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { title, ingredients, steps, category, prepTime, cookTime, difficulty, rating } = req.body;
  
    if (!title || !ingredients || !steps) {
      res.status(400).json({ error: "Champs obligatoires manquants : title, ingredients, steps" });
      return;
    }
  
    try {
      const newRecipe = await insertRecipe({
        title,
        ingredients,
        steps,
        category,
        prepTime,
        cookTime,
        difficulty,
        rating
      });
  
      res.status(201).json(newRecipe);
      logger.info(`Recette créée : ${title}`);
    } catch (err) {
      logger.error("Erreur lors de la création de la recette :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
};

export const updateRecipe: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const recipeId = parseInt(req.params.id, 10);
    const { title, ingredients, steps, category, prepTime, cookTime, difficulty, rating } = req.body;
  
    if (isNaN(recipeId)) {
      res.status(400).json({ error: "ID de recette invalide" });
      return;
    }
  
    try {
      const updated = await updateRecipeInDB(recipeId, {
        title,
        ingredients,
        steps,
        category,
        prepTime,
        cookTime,
        difficulty,
        rating,
      });
  
      if (!updated) {
        res.status(404).json({ error: "Recette non trouvée" });
      } else {
        res.status(200).json({ message: "Recette mise à jour avec succès" });
        logger.info(`Recette mise à jour : ID ${recipeId}`);
      }
    } catch (err) {
      logger.error("Erreur lors de la mise à jour de la recette :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
};
  
export const deleteRecipe: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const recipeId = parseInt(req.params.id, 10);
  
    if (isNaN(recipeId)) {
      res.status(400).json({ error: "ID de recette invalide" });
      return;
    }
  
    try {
      const deleted = await deleteRecipeFromDB(recipeId);
  
      if (!deleted) {
        res.status(404).json({ error: "Recette non trouvée" });
      } else {
        res.status(200).json({ message: "Recette supprimée avec succès" });
        logger.info(`Recette supprimée : ID ${recipeId}`);
      }
    } catch (err) {
      logger.error("Erreur lors de la suppression de la recette :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  ;
}