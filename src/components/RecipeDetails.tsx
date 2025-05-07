import React from 'react';
import { ArrowLeft, Clock, Utensils, Heart, Share2, Bookmark } from 'lucide-react';

interface RecipeDetailsProps {
  recipe: {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
    [key: string]: any;
  };
  onBack: () => void;
  userIngredients: string[];
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({ 
  recipe, 
  onBack,
  userIngredients 
}) => {
  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push({
        name: ingredient,
        measure: recipe[`strMeasure${i}`],
        hasIt: userIngredients.some(ui => 
          ui.toLowerCase().includes(ingredient.toLowerCase()) ||
          ingredient.toLowerCase().includes(ui.toLowerCase())
        ),
      });
    }
  }

  return (
    <div className="card overflow-hidden">
      <div className="relative">
        <img
          src={recipe.strMealThumb || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format'}
          alt={recipe.strMeal}
          className="w-full h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="bg-white/90 p-2 rounded-full hover:bg-white transition"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex gap-2">
            <button className="bg-white/90 p-2 rounded-full hover:bg-white transition">
              <Heart size={20} />
            </button>
            <button className="bg-white/90 p-2 rounded-full hover:bg-white transition">
              <Share2 size={20} />
            </button>
            <button className="bg-white/90 p-2 rounded-full hover:bg-white transition">
              <Bookmark size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-3 text-surface-900">{recipe.strMeal}</h1>
        
        <div className="flex gap-6 mb-6 text-surface-600">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-primary-500" />
            <span>30 min</span>
          </div>
          <div className="flex items-center gap-2">
            <Utensils size={18} className="text-primary-500" />
            <span>4 servings</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-surface-800">Ingredients</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ingredients.map((ing, idx) => (
              <li 
                key={idx} 
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  ing.hasIt ? 'bg-primary-50 border border-primary-100' : 'bg-surface-50 border border-surface-100'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${
                  ing.hasIt ? 'bg-primary-500' : 'bg-surface-300'
                }`}></span>
                <span className={ing.hasIt ? 'text-primary-800 font-medium' : 'text-surface-700'}>
                  {ing.measure} {ing.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-surface-800">Instructions</h2>
          <div className="prose max-w-none text-surface-700">
            {recipe.strInstructions.split('\n').map((para, idx) => (
              <p key={idx} className="mb-4">{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
