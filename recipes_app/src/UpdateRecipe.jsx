import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRecipe = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [category, setCategory] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [rating, setRating] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch recipe details when the component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/recipes/${id}`);
        if (!response.ok) throw new Error('Failed to fetch recipe');
        const recipe = await response.json();
        setTitle(recipe.title);
        setIngredients(recipe.ingredients);
        setSteps(recipe.steps);
        setCategory(recipe.category || '');
        setPrepTime(recipe.prepTime);
        setCookTime(recipe.cookTime);
        setDifficulty(recipe.difficulty || '');
        setRating(recipe.rating || '');
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipe = { title, ingredients, steps, category, prepTime, cookTime, difficulty, rating };

    try {
      const response = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) throw new Error('Failed to update recipe');

      // Redirect to recipe list after successful update
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Update Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Ingredients:</label><br />
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </div>
        <div>
          <label>Steps:</label><br />
          <textarea value={steps} onChange={(e) => setSteps(e.target.value)} required />
        </div>
        <div>
          <label>Category:</label><br />
          <input value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label>Prep Time:</label><br />
          <input value={prepTime} onChange={(e) => setPrepTime(e.target.value)} required />
        </div>
        <div>
          <label>Cook Time:</label><br />
          <input value={cookTime} onChange={(e) => setCookTime(e.target.value)} required />
        </div>
        <div>
          <label>Difficulty:</label><br />
          <input value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
        </div>
        <div>
          <label>Rating:</label><br />
          <input value={rating} onChange={(e) => setRating(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
