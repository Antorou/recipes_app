import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/recipes/${id}`);
        if (!response.ok) throw new Error('Failed to fetch recipe');
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/recipes/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete recipe');
        // Redirect to the recipe list after successful deletion
        navigate('/recipes');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>Prep Time: {recipe.prepTime}</p>
      <p>Cook Time: {recipe.cookTime}</p>
      <p>{recipe.description}</p>

      {/* Edit Recipe Button */}
      <Link to={`/recipes/update/${id}`}>
        <button>Edit Recipe</button>
      </Link>

      {/* Delete Recipe Button */}
      <button onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
        Delete Recipe
      </button>
    </div>
  );
};

export default RecipeDetail;
