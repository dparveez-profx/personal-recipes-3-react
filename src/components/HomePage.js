import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import { recipes } from '../data/recipes';
import './HomePage.css';

function HomePage({ onRecipeClick }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem('favoriteRecipes');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (recipeId) => {
    let newFavorites;
    if (favorites.includes(recipeId)) {
      newFavorites = favorites.filter(id => id !== recipeId);
    } else {
      newFavorites = [...favorites, recipeId];
    }
    setFavorites(newFavorites);
    sessionStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  // Sort recipes: favorited ones first, then the rest
  const sortedRecipes = [...recipes].sort((a, b) => {
    const aIsFavorite = favorites.includes(a.id);
    const bIsFavorite = favorites.includes(b.id);
    
    if (aIsFavorite && !bIsFavorite) return 1;
    if (!aIsFavorite && bIsFavorite) return -1;
    return 0;
  });

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>My Recipe Collection</h1>
        <p>Delicious recipes from my kitchen to yours</p>
      </header>
      <div className="recipe-grid">
        {sortedRecipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favorites.includes(recipe.id)}
            onToggleFavorite={toggleFavorite}
            onClick={() => onRecipeClick(recipe.slug)}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;

