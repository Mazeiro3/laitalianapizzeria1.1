import React from 'react';
import { motion } from 'framer-motion';
import { Pizza, Utensils, Drumstick } from 'lucide-react';

interface CategoryTabsProps {
  activeCategory: 'custom' | 'specialty' | 'boneless';
  onCategoryChange: (category: 'custom' | 'specialty' | 'boneless') => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    { 
      id: 'custom' as const, 
      name: 'Pizza por Ingredientes', 
      icon: Pizza,
      description: 'Crea tu combinación'
    },
    { 
      id: 'specialty' as const, 
      name: 'Especialidades', 
      icon: Utensils,
      description: 'Recetas tradicionales'
    },
    { 
      id: 'boneless' as const, 
      name: 'Antojitos', 
      icon: Drumstick,
      description: 'Boneless y papas'
    }
  ];

  return (
    <div className="container mx-auto px-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-4xl mx-auto">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategoryChange(category.id)}
              className={`
                relative flex-1 p-4 sm:p-6 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? 'glass-morphism premium-shadow-lg border-italian-red/50 bg-italian-red/10' 
                  : 'bg-white/5 hover:bg-white/10 border border-white/20'
                }
              `}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className={`
                  p-2 sm:p-3 rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-br from-italian-red to-red-800 text-white' 
                    : 'bg-white/10 text-white group-hover:bg-italian-red/20 group-hover:text-italian-red'
                  }
                `}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                
                <div>
                  <h3 className={`
                    font-playfair font-semibold text-base sm:text-lg
                    ${isActive ? 'text-italian-red' : 'text-white'}
                  `}>
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 mt-1">
                    {category.description}
                  </p>
                </div>
              </div>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-italian-red/10 to-italian-green/10 rounded-2xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;