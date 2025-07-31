import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Flame, Leaf } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  index: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onAddToCart, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group card-premium"
    >
      <div className="bg-white rounded-3xl overflow-hidden premium-shadow-lg border border-white/50">
        <div className="relative overflow-hidden">
          <motion.img 
            src={item.image} 
            alt={item.name}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {item.popular && (
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                className="bg-gradient-to-r from-gold to-yellow-500 text-charcoal px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg"
              >
                <Star className="w-3 h-3 fill-current" />
                <span>Más Pedido</span>
              </motion.div>
            )}
            
            {item.spicy && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1"
              >
                <Flame className="w-3 h-3" />
                <span>Picante</span>
              </motion.div>
            )}
            
            {item.vegetarian && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1"
              >
                <Leaf className="w-3 h-3" />
                <span>Vegetariano</span>
              </motion.div>
            )}
          </div>

          {/* Price badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm text-italian-red px-4 py-2 rounded-full font-bold text-lg premium-shadow">
              ${item.price}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-2xl font-cormorant font-bold text-charcoal mb-2 group-hover:text-italian-red transition-colors">
              {item.name}
            </h3>
            <p className="text-charcoal/70 leading-relaxed text-sm">
              {item.description}
            </p>
          </div>

          {/* Ingredients */}
          {item.ingredients && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {item.ingredients.slice(0, 3).map((ingredient, i) => (
                  <span 
                    key={i}
                    className="text-xs bg-cream text-charcoal/70 px-2 py-1 rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
                {item.ingredients.length > 3 && (
                  <span className="text-xs text-charcoal/50">
                    +{item.ingredients.length - 3} más
                  </span>
                )}
              </div>
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(item)}
            className="w-full btn-premium text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 premium-shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Agregar al Pedido</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;