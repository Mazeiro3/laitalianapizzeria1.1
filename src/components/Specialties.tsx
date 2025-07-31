import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { specialties } from '../data/menu';
import { CartItem } from '../types';

interface SpecialtiesProps {
  onAddToCart: (item: CartItem) => void;
}

const Specialties: React.FC<SpecialtiesProps> = ({ onAddToCart }) => {
  const [selectedBonelessFlavor, setSelectedBonelessFlavor] = useState<{ [key: string]: string }>({});
  const [showBonelessOptions, setShowBonelessOptions] = useState<{ [key: string]: boolean }>({});

  const handleAddToCart = (specialty: typeof specialties[0]) => {
    if (specialty.isBoneless) {
      const selectedFlavor = selectedBonelessFlavor[specialty.id];
      if (!selectedFlavor) {
        alert('Por favor selecciona un sabor para la Pizza Boneless');
        return;
      }
      
      const flavorInfo = specialty.bonelessFlavors?.find(f => f.id === selectedFlavor);
      const cartItem: CartItem = {
        id: `${specialty.id}-${selectedFlavor}`,
        type: 'specialty',
        name: specialty.name,
        price: specialty.price,
        quantity: 1,
        details: `${specialty.description} - Sabor ${flavorInfo?.name}`
      };
      
      onAddToCart(cartItem);
      setSelectedBonelessFlavor(prev => ({ ...prev, [specialty.id]: '' }));
      setShowBonelessOptions(prev => ({ ...prev, [specialty.id]: false }));
    } else {
      const cartItem: CartItem = {
        id: specialty.id,
        type: 'specialty',
        name: specialty.name,
        price: specialty.price,
        quantity: 1,
        details: specialty.description
      };

      onAddToCart(cartItem);
    }
  };

  const toggleBonelessOptions = (specialtyId: string) => {
    setShowBonelessOptions(prev => ({
      ...prev,
      [specialtyId]: !prev[specialtyId]
    }));
  };

  return (
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold gradient-text mb-4">
            Nuestras Especialidades
          </h2>
          <p className="text-white/70 text-lg">
            Pizzas tradicionales con recetas auténticas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {specialties.map((specialty, index) => (
            <motion.div
              key={specialty.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="card-premium"
            >
              <div className="glass-morphism rounded-3xl overflow-hidden premium-shadow-lg border border-white/10 h-full flex flex-col">
                {/* Pizza Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={specialty.image}
                    alt={specialty.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Price badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-italian-red text-white px-4 py-2 rounded-full font-bold text-lg premium-shadow">
                      ${specialty.price}
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-2xl font-playfair font-bold text-white mb-3">
                      {specialty.name}
                    </h3>
                    
                    <p className="text-white/80 mb-4 text-base leading-relaxed">
                      {specialty.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white/60 mb-2">
                        Ingredientes:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {specialty.ingredients.map((ingredient, i) => (
                          <span 
                            key={i}
                            className="text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full border border-white/20"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Boneless Flavor Selection */}
                    {specialty.isBoneless && (
                      <div className="mb-6">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleBonelessOptions(specialty.id)}
                          className="w-full flex items-center justify-between p-3 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-colors"
                        >
                          <span className="font-medium">
                            {selectedBonelessFlavor[specialty.id] 
                              ? `Sabor: ${specialty.bonelessFlavors?.find(f => f.id === selectedBonelessFlavor[specialty.id])?.name}`
                              : 'Seleccionar sabor'
                            }
                          </span>
                          {showBonelessOptions[specialty.id] ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </motion.button>

                        <AnimatePresence>
                          {showBonelessOptions[specialty.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 space-y-2"
                            >
                              {specialty.bonelessFlavors?.map((flavor) => (
                                <motion.button
                                  key={flavor.id}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setSelectedBonelessFlavor(prev => ({
                                    ...prev,
                                    [specialty.id]: flavor.id
                                  }))}
                                  className={`
                                    w-full p-3 rounded-xl border-2 transition-all text-left
                                    ${selectedBonelessFlavor[specialty.id] === flavor.id
                                      ? 'border-italian-red bg-italian-red/20 text-italian-red'
                                      : 'border-white/20 bg-white/5 text-white hover:border-italian-red/50'
                                    }
                                  `}
                                >
                                  <div className="font-semibold">{flavor.name}</div>
                                  <div className="text-sm opacity-70">{flavor.description}</div>
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(specialty)}
                    className="w-full btn-premium text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 premium-shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Agregar al Carrito</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Specialties;