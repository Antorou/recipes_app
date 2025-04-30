import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail'; // We'll create this next
import CreateRecipe from './CreateRecipe';
import UpdateRecipe from './UpdateRecipe';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/recipes" element={<App />}>
          <Route index element={<RecipeList />} />
          <Route path=":id" element={<RecipeDetail />} />
          <Route path="create" element={<CreateRecipe />} />
          <Route path='update/:id' element={<UpdateRecipe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
