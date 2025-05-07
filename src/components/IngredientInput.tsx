import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { getIngredientSuggestions } from '../api';

interface IngredientInputProps {
  onAdd: (ingredient: string) => void;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ onAdd }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (input.length > 1) {
      getIngredientSuggestions(input).then(setSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add ingredients..."
          className="flex-1 p-2 border rounded-lg"
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <button
          onClick={handleAdd}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          <Plus size={20} />
        </button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg">
          {suggestions.map((item) => (
            <li
              key={item}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={() => {
                onAdd(item);
                setInput('');
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
