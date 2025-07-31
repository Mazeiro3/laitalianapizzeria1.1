import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { ingredients } from '../data/menu';
import { CartItem } from '../types';

interface CustomPizzaProps {
  onAddToCart: (item: CartItem) => void;
}

const CustomPizza: React.FC<CustomPizzaProps> = ({ onAddToCart }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const { ingredientCount, price } = useMemo(() => {
    let count = 0;
    selectedIngredients.forEach(ingredientId => {
      const ingredient = ingredients.find(ing => ing.id === ingredientId);
      count += ingredient?.isDouble ? 2 : 1;
    });

    let calculatedPrice = 150; // Base price
    if (count >= 3 && count <= 4) calculatedPrice = 180;
    else if (count >= 5) calculatedPrice = 210;

    return { ingredientCount: count, price: calculatedPrice };
  }, [selectedIngredients]);

  const toggleIngredient = (ingredientId: string) => {
    setSelectedIngredients(prev => {
      const isSelected = prev.includes(ingredientId);
      
      if (isSelected) {
        // Remove ingredient
        return prev.filter(id => id !== ingredientId);
      } else {
        // Check if adding this ingredient would exceed the limit
        const ingredient = ingredients.find(ing => ing.id === ingredientId);
        const currentCount = prev.reduce((count, id) => {
          const ing = ingredients.find(i => i.id === id);
          return count + (ing?.isDouble ? 2 : 1);
        }, 0);
        
        const newCount = currentCount + (ingredient?.isDouble ? 2 : 1);
        
        if (newCount > 6) {
          // Show alert when trying to exceed limit
          alert('Máximo 6 ingredientes permitidos');
          return prev;
        }
        
        // Add ingredient
        return [...prev, ingredientId];
      }
    });
  };

  const handleAddToCart = () => {
    if (selectedIngredients.length === 0) {
      alert('Selecciona al menos un ingrediente');
      return;
    }

    const selectedNames = selectedIngredients.map(id => 
      ingredients.find(ing => ing.id === id)?.name
    ).filter(Boolean);

    const cartItem: CartItem = {
      id: 'custom-pizza',
      type: 'custom',
      name: 'Pizza por Ingredientes',
      price,
      quantity: 1,
      details: `${ingredientCount} ingredientes: ${selectedNames.join(', ')}`
    };

    onAddToCart(cartItem);
    setSelectedIngredients([]);
  };

  return (
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Price Calculator */}
        <div className="glass-morphism rounded-3xl p-8 mb-8 premium-shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-playfair font-bold text-white mb-4">
              Crea tu Pizza Perfecta
            </h2>
            <div className="flex justify-center items-center space-x-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-italian-red">
                  {ingredientCount}
                </div>
                <div className="text-white/70 text-sm">
                  Ingredientes
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text">
                  ${price}
                </div>
                <div className="text-white/70 text-sm">
                  Precio Final
                </div>
              </div>
            </div>
            
            {/* Ingredient limit indicator */}
            <div className="mt-4">
              <div className="flex justify-center items-center space-x-2 mb-2">
                <span className="text-white/60 text-sm">Límite:</span>
                <div className="flex space-x-1">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < ingredientCount 
                          ? 'bg-italian-red' 
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white/60 text-sm">6 máx</span>
              </div>
              {ingredientCount >= 5 && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`text-sm font-medium ${
                    ingredientCount === 6 
                      ? 'text-red-400' 
                      : 'text-yellow-400'
                  }`}
                >
                  {ingredientCount === 6 
                    ? '¡Límite alcanzado!' 
                    : `${6 - ingredientCount} ingrediente${6 - ingredientCount === 1 ? '' : 's'} restante${6 - ingredientCount === 1 ? '' : 's'}`
                  }
                </motion.p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center text-sm text-white/60 mb-6">
            <div>1-2 ingredientes: $150</div>
            <div>3-4 ingredientes: $180</div>
            <div>5-6 ingredientes: $210</div>
          </div>

          {selectedIngredients.length > 0 && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="w-full btn-premium text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-3 premium-shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Agregar al Carrito - ${price}</span>
            </motion.button>
          )}
        </div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {ingredients.map((ingredient, index) => {
            const isSelected = selectedIngredients.includes(ingredient.id);
            const currentCount = selectedIngredients.reduce((count, id) => {
              const ing = ingredients.find(i => i.id === id);
              return count + (ing?.isDouble ? 2 : 1);
            }, 0);
            const wouldExceedLimit = !isSelected && (currentCount + (ingredient.isDouble ? 2 : 1)) > 6;
            
            return (
              <motion.button
                key={ingredient.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: wouldExceedLimit ? 1 : 1.05 }}
                whileTap={{ scale: wouldExceedLimit ? 1 : 0.95 }}
                onClick={() => toggleIngredient(ingredient.id)}
                disabled={wouldExceedLimit}
                className={`
                  ingredient-item p-3 sm:p-4 md:p-6 rounded-2xl glass-morphism premium-shadow transition-all duration-300 relative
                  ${isSelected ? 'selected' : ''}
                  ${wouldExceedLimit ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">{ingredient.icon}</div>
                  <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">
                    {ingredient.name}
                  </h3>
                  {ingredient.isDouble && (
                    <div className="text-xs text-italian-red font-bold text-xs">
                      Cuenta como 2
                    </div>
                  )}
                </div>
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-italian-red rounded-full flex items-center justify-center"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </motion.div>
                )}

                {wouldExceedLimit && (
                  <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                    <span className="text-white/80 text-xs font-bold text-center px-1">
                      Límite alcanzado
                    </span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default CustomPizza;