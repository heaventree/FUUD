import React, { useState, useEffect } from 'react';
import { Search, Plus, Crown } from 'lucide-react';
import { IngredientInput } from './components/IngredientInput';
import { IngredientList } from './components/IngredientList';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetails } from './components/RecipeDetails';
import { RecipeFilters } from './components/RecipeFilters';
import { AdBanner } from './components/AdBanner';
import { PremiumBadge } from './components/PremiumBadge';
import { searchByIngredients, getRecipeDetails, getCategories } from './api';
import { Toaster } from 'react-hot-toast';

function App() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [strictMatch, setStrictMatch] = useState(false);

  // Load categories and saved ingredients on mount
  useEffect(() => {
    const loadData = async () => {
      const cats = await getCategories();
      setCategories(cats.map((c: any) => c.strCategory));
      
      const savedIngredients = localStorage.getItem('pantryIngredients');
      if (savedIngredients) {
        setIngredients(JSON.parse(savedIngredients));
      }
    };
    
    loadData();
  }, []);

  // Save ingredients to localStorage when they change
  useEffect(() => {
    localStorage.setItem('pantryIngredients', JSON.stringify(ingredients));
  }, [ingredients]);

  const handleAddIngredient = (ingredient: string) => {
    const normalized = ingredient.trim().toLowerCase();
    if (!ingredients.some(i => i.toLowerCase() === normalized)) {
      setIngredients([...ingredients, ingredient.trim()]);
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSearch = async () => {
    if (ingredients.length === 0) return;
    
    setIsLoading(true);
    const results = await searchByIngredients(ingredients, {
      category: selectedCategory || undefined
    });
    
    // Basic strict match filtering (client-side)
    let filtered = results;
    if (strictMatch) {
      filtered = results.filter((recipe: any) => {
        return ingredients.some(ing => 
          recipe.strMeal.toLowerCase().includes(ing.toLowerCase()) ||
          recipe.strTags?.toLowerCase().includes(ing.toLowerCase())
        );
      });
    }
    
    setRecipes(filtered);
    setIsLoading(false);
  };

  const handleRecipeSelect = async (id: string) => {
    setIsLoading(true);
    const recipe = await getRecipeDetails(id);
    setSelectedRecipe(recipe);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Toaster position="top-center" />
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary-700 mb-2 font-display">
            PantryChef
          </h1>
          <p className="text-surface-600">
            Find delicious recipes with what you have
            <PremiumBadge />
          </p>
        </header>

        <AdBanner />

        {!selectedRecipe ? (
          <main>
            <div className="card p-6 mb-6">
              <IngredientInput onAdd={handleAddIngredient} />
              <IngredientList 
                ingredients={ingredients} 
                onRemove={handleRemoveIngredient} 
              />
              
              <RecipeFilters
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                strictMatch={strictMatch}
                onStrictMatchChange={setStrictMatch}
              />
              
              <button
                onClick={handleSearch}
                disabled={ingredients.length === 0 || isLoading}
                className={`btn-primary w-full flex items-center justify-center gap-2 ${
                  ingredients.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Search size={18} />
                {isLoading ? 'Searching...' : 'Find Recipes'}
              </button>
            </div>

            {isLoading && recipes.length === 0 && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
                <p className="mt-4 text-surface-600">Finding delicious recipes...</p>
              </div>
            )}

            {recipes.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-6 text-surface-800">
                  {recipes.length} Recipes Found
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.idMeal}
                      recipe={recipe}
                      onClick={() => handleRecipeSelect(recipe.idMeal)}
                    />
                  ))}
                </div>
              </div>
            )}
          </main>
        ) : (
          <RecipeDetails 
            recipe={selectedRecipe} 
            onBack={() => setSelectedRecipe(null)}
            userIngredients={ingredients}
          />
        )}
      </div>
    </div>
  );
}

export default App;
