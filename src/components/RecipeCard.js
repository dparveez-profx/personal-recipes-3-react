import React, { useState, useEffect } from 'react';
import './RecipeCard.css';

function RecipeCard({ recipe, isFavorite, onToggleFavorite, onClick }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClass('fade-out');
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % recipe.images.length);
        setFadeClass('fade-in');
      }, 300);
    }, 1000);

    return () => clearInterval(interval);
  }, [recipe.images.length]);

  const handleFavoriteClick = () => onToggleFavorite(recipe.id);

  return (
    <div className="recipe-card" onClick={onClick}>
      <div className="recipe-card-image-container">
        <img
          src={recipe.images[currentImageIndex]}
          alt={recipe.title}
          className={`recipe-card-image ${fadeClass}`}
        />
        <button
          className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        {recipe.images.length > 1 && (
          <div className="image-indicator">
            {recipe.images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;

