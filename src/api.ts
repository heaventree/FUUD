import axios from 'axios';

const API_KEY = '1'; // Free public key for TheMealDB
const BASE_URL = 'https://www.themealdb.com/api/json/v1';

// Cache for API responses (respects 1-hour caching limit)
const cache = new Map();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export const searchByIngredients = async (ingredients: string[], filters = {}) => {
  const cacheKey = `search-${ingredients.join(',')}-${JSON.stringify(filters)}`;
  
  if (cache.has(cacheKey)) {
    const { timestamp, data } = cache.get(cacheKey);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/filter.php?i=${ingredients.join(',')}`);
    let meals = response.data.meals || [];
    
    // Apply basic filters
    if (filters.category) {
      meals = meals.filter(meal => meal.strCategory === filters.category);
    }
    
    cache.set(cacheKey, {
      timestamp: Date.now(),
      data: meals
    });
    
    return meals;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

export const getRecipeDetails = async (id: string) => {
  const cacheKey = `details-${id}`;
  
  if (cache.has(cacheKey)) {
    const { timestamp, data } = cache.get(cacheKey);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/lookup.php?i=${id}`);
    const meal = response.data.meals?.[0] || null;
    
    if (meal) {
      cache.set(cacheKey, {
        timestamp: Date.now(),
        data: meal
      });
    }
    
    return meal;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return null;
  }
};

export const getIngredientSuggestions = async (query: string) => {
  // Enhanced with common ingredient synonyms
  const commonIngredients = [
    'Chicken', 'Beef', 'Pork', 'Fish', 'Eggs', 'Milk', 
    'Cheese', 'Rice', 'Pasta', 'Tomato', 'Tomatoes', 'Potato', 'Potatoes',
    'Onion', 'Onions', 'Garlic', 'Carrot', 'Carrots', 'Broccoli', 
    'Flour', 'Sugar', 'Salt', 'Pepper', 'Butter', 'Oil', 'Vinegar',
    'Lemon', 'Lime', 'Apple', 'Banana', 'Bread', 'Chocolate'
  ];
  
  return commonIngredients.filter(ingredient =>
    ingredient.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/categories.php`);
    return response.data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
