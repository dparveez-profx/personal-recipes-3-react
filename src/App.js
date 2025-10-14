import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import RecipePage from './components/RecipePage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Parse URL on mount
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash.startsWith('recipe/')) {
      const slug = hash.replace('recipe/', '');
      setSelectedRecipe(slug);
      setCurrentPage('recipe');
    } else {
      setCurrentPage('home');
      setSelectedRecipe(null);
    }
  }, []);

  const navigateToRecipe = (slug) => {
    window.location.hash = `recipe/${slug}`;
    setSelectedRecipe(slug);
    setCurrentPage('recipe');
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    window.location.hash = '';
    setCurrentPage('home');
    setSelectedRecipe(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      {currentPage === 'home' ? (
        <HomePage onRecipeClick={navigateToRecipe} />
      ) : (
        <RecipePage recipeSlug={selectedRecipe} onBackClick={navigateToHome} />
      )}
    </div>
  );
}

export default App;

