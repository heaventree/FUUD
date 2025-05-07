import React from 'react';
import { Clock, Utensils } from 'lucide-react';

interface RecipeCardProps {
  recipe: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
  };
  onClick: () => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="card cursor-pointer group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.strMealThumb || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format'}
          alt={recipe.strMeal}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="font-semibold text-lg text-white">{recipe.strMeal}</h3>
          {recipe.strCategory && (
            <span className="inline-block mt-1 px-2 py-1 bg-primary-500/90 text-white text-xs rounded-full">
              {recipe.strCategory}
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-4 text-sm text-surface-600">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            30 min
          </span>
          <span className="flex items-center gap-1">
            <Utensils size={14} />
            4 servings
          </span>
        </div>
      </div>
    </div>
  );
};
