import React from 'react';

interface RecipeFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  strictMatch: boolean;
  onStrictMatchChange: (strict: boolean) => void;
}

export const RecipeFilters: React.FC<RecipeFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  strictMatch,
  onStrictMatchChange
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meal Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="strictMatch"
            checked={strictMatch}
            onChange={(e) => onStrictMatchChange(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="strictMatch" className="text-sm text-gray-700">
            Strict ingredient match
          </label>
        </div>
      </div>
    </div>
  );
};
