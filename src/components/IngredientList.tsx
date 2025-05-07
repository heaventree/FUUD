import React from 'react';
import { X } from 'lucide-react';

interface IngredientListProps {
  ingredients: string[];
  onRemove: (index: number) => void;
}

export const IngredientList: React.FC<IngredientListProps> = ({ ingredients, onRemove }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Your Ingredients</h3>
      {ingredients.length === 0 ? (
        <p className="text-gray-500">No ingredients added yet</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {ingredients.map((ingredient, index) => (
            <li
              key={`${ingredient}-${index}`}
              className="flex items-center gap-1 bg-gray-200 px-3 py-1 rounded-full"
            >
              {ingredient}
              <button
                onClick={() => onRemove(index)}
                className="text-gray-500 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
