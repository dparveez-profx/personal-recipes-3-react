import React, { useState, useEffect } from 'react';
import { recipes } from '../data/recipes';
import './RecipePage.css';

function RecipePage({ recipeSlug, onBackClick }) {
  const recipe = recipes.find(r => r.slug === recipeSlug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = sessionStorage.getItem('favoriteRecipes');
    if (storedFavorites && recipe) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(recipe.id));
    }
  }, [recipe]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [recipeSlug]);

  useEffect(() => {
    if (recipe) {
      const interval = setInterval(() => {
        setFadeClass('fade-out');
        setTimeout(() => {
          setCurrentImageIndex((prev) => (prev + 1) % recipe.images.length);
          setFadeClass('fade-in');
        }, 300);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [recipe]);

  const handlePrevImage = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setCurrentImageIndex((prev) => 
        prev === 0 ? recipe.images.length - 1 : prev - 1
      );
      setFadeClass('fade-in');
    }, 300);
  };

  const handleNextImage = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % recipe.images.length);
      setFadeClass('fade-in');
    }, 300);
  };

  const toggleFavorite = () => {
    const storedFavorites = sessionStorage.getItem('favoriteRecipes');
    let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    if (isFavorite) {
      favorites = favorites.filter(id => id !== recipe.id);
    } else {
      favorites.push(recipe.id);
    }
    
    sessionStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (!recipe) {
    return (
      <div className="recipe-page">
        <div className="recipe-not-found">
          <h2>Recipe not found</h2>
          <button onClick={onBackClick} className="back-button">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-page">
      <nav className="recipe-nav">
        <button onClick={onBackClick} className="back-button">
          ← Back to Home
        </button>
        <button
          onClick={toggleFavorite}
          className={`favorite-button-page ${isFavorite ? 'favorite' : ''}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'} {isFavorite ? 'Favorited' : 'Add to Favorites'}
        </button>
      </nav>

      <div className="recipe-header">
        <h1>{recipe.title}</h1>
      </div>

      <div className="recipe-image-section">
        <div className="recipe-image-container">
          <img
            src={recipe.images[currentImageIndex]}
            alt={`${recipe.title} ${currentImageIndex + 1}`}
            className={`recipe-image ${fadeClass}`}
          />
          <>
            <button
              className="image-nav-button prev"
              onClick={handlePrevImage}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className="image-nav-button next"
              onClick={handleNextImage}
              aria-label="Next image"
            >
              ›
            </button>
            <div className="image-counter">
              {currentImageIndex + 1} / {recipe.images.length}
            </div>
          </>
        </div>
      </div>

      <div className="recipe-content">
        <pre>{recipe.content}</pre>
      </div>
    </div>
  );
}

export default RecipePage;

