import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { snacks } from '../data/menu';
import { CartItem } from '../types';

interface BonelessProps {
  onAddToCart: (item: CartItem) => void;
}

const Boneless: React.FC<BonelessProps> = ({ onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedProduct) {
      alert('Selecciona un producto');
      return;
    }

    const product = snacks.find(s => s.id === selectedProduct);
    
    if (product?.id === 'boneless' && !selectedFlavor) {
      alert('Selecciona un sabor para los boneless');
      return;
    }

    let details = `${quantity} ${product?.unit}${quantity > 1 ? (product?.unit === 'orden' ? 'es' : '') : ''}`;
    
    if (product?.id === 'boneless') {
      const flavor = product.flavors?.find(f => f.id === selectedFlavor);
      details += ` - Sabor ${flavor?.name} - Incluye aderezo ranch`;
    }

    const cartItem: CartItem = {
      id: `${selectedProduct}${selectedFlavor ? `-${selectedFlavor}` : ''}`,
      type: 'snack',
      name: product?.name || '',
      price: (product?.price || 0) * quantity,
      quantity: 1,
      details
    };

    onAddToCart(cartItem);
    setSelectedProduct('');
    setSelectedFlavor('');
    setQuantity(1);
  };

  const selectedProductData = snacks.find(s => s.id === selectedProduct);

  return (
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-playfair font-bold gradient-text mb-4">
            Antojitos Deliciosos
          </h2>
          <p className="text-white/70 text-lg">
            Perfectos para acompañar tu pizza
          </p>
        </div>

        <div className="glass-morphism rounded-3xl p-8 premium-shadow-lg">
          {/* Product Selection */}
          <div className="mb-8">
            <h3 className="text-2xl font-playfair font-bold text-white mb-6 text-center">
              Selecciona tu Antojito
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {snacks.map((snack, index) => (
                <motion.button
                  key={snack.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedProduct(snack.id);
                    setSelectedFlavor('');
                    setQuantity(1);
                  }}
                  className={`
                    relative overflow-hidden rounded-2xl transition-all duration-300 border-2
                    ${selectedProduct === snack.id
                      ? 'border-italian-red bg-italian-red/10'
                      : 'border-white/20 bg-white/5 hover:border-italian-red/50'
                    }
                  `}
                >
                  {/* Image Section */}
                  <div className="relative h-48">
                    <img
                      src={snack.image}
                      alt={snack.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Price badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-italian-red text-white px-3 py-2 rounded-full font-bold text-lg premium-shadow">
                        ${snack.price}
                      </div>
                    </div>
                  </div>

                  {/* Text Section - Separated from image */}
                  <div className="p-6 bg-white/5 backdrop-blur-sm">
                    <h4 className="font-playfair font-bold text-xl text-white mb-2">
                      {snack.name}
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {snack.description}
                    </p>
                  </div>

                  {selectedProduct === snack.id && (
                    <motion.div
                      layoutId="selectedProduct"
                      className="absolute inset-0 border-2 border-italian-red rounded-2xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Flavor Selection for Boneless */}
          {selectedProduct === 'boneless' && selectedProductData?.flavors && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8"
            >
              <h3 className="text-2xl font-playfair font-bold text-white mb-6 text-center">
                Selecciona tu Sabor
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedProductData.flavors.map((flavor, index) => (
                  <motion.button
                    key={flavor.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFlavor(flavor.id)}
                    className={`
                      p-6 rounded-2xl transition-all duration-300 border-2 relative overflow-hidden
                      ${selectedFlavor === flavor.id
                        ? 'border-italian-red bg-italian-red/20 text-italian-red'
                        : 'border-white/20 bg-white/5 text-white hover:border-italian-red/50'
                      }
                    `}
                  >
                    <div className="text-center relative z-10">
                      <div className="text-4xl mb-3">{flavor.icon}</div>
                      <h4 className="font-bold text-xl mb-2">{flavor.name}</h4>
                      <p className="text-sm opacity-70">
                        {flavor.id === 'bufalo' && 'Picante clásico'}
                        {flavor.id === 'bbq' && 'Dulce ahumado'}
                        {flavor.id === 'habanero' && 'Extra picante'}
                      </p>
                    </div>
                    
                    {selectedFlavor === flavor.id && (
                      <motion.div
                        layoutId="selectedFlavor"
                        className="absolute inset-0 bg-gradient-to-r from-italian-red/10 to-italian-red/5 rounded-2xl"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quantity Selection */}
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8"
            >
              <h3 className="text-2xl font-playfair font-bold text-white mb-6 text-center">
                Cantidad
              </h3>
              <div className="flex items-center justify-center space-x-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <Minus className="w-6 h-6 text-white" />
                </motion.button>
                
                <div className="text-center">
                  <div className="text-4xl font-bold text-italian-red mb-2">
                    {quantity}
                  </div>
                  <div className="text-white/70">
                    {selectedProductData?.unit}{quantity > 1 ? (selectedProductData?.unit === 'orden' ? 'es' : '') : ''}
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <Plus className="w-6 h-6 text-white" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Price and Add to Cart */}
          {selectedProduct && (selectedProduct !== 'boneless' || selectedFlavor) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="mb-6">
                <div className="text-4xl font-bold gradient-text mb-2">
                  ${(selectedProductData?.price || 0) * quantity}
                </div>
                <div className="text-white/70">
                  Total a pagar
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="btn-premium text-white py-4 px-8 rounded-2xl font-semibold flex items-center justify-center space-x-3 premium-shadow-lg mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>Agregar al Carrito</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Boneless;