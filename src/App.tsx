import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import BusinessHoursCheck from './components/BusinessHoursCheck';
import CategoryTabs from './components/CategoryTabs';
import CustomPizza from './components/CustomPizza';
import Specialties from './components/Specialties';
import Boneless from './components/Boneless';
import Cart from './components/Cart';
import WhatsAppButton from './components/WhatsAppButton';
import InstallPrompt from './components/InstallPrompt';
import { useCart } from './hooks/useCart';

function App() {
  const [activeCategory, setActiveCategory] = useState<'custom' | 'specialty' | 'boneless'>('custom');
  const {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    toggleCart,
    setIsCartOpen
  } = useCart();

  const renderContent = () => {
    switch (activeCategory) {
      case 'custom':
        return <CustomPizza onAddToCart={addToCart} />;
      case 'specialty':
        return <Specialties onAddToCart={addToCart} />;
      case 'boneless':
        return <Boneless onAddToCart={addToCart} />;
      default:
        return <CustomPizza onAddToCart={addToCart} />;
    }
  };

  return (
    <BusinessHoursCheck>
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-gray-900 to-dark-bg">
        <Header 
          cartItemsCount={getTotalItems()} 
          onCartToggle={toggleCart}
        />

        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="container mx-auto px-6"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold gradient-text mb-6 leading-tight">
                Auténtica Tradición
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 mb-4 leading-relaxed px-4">
                Pizzas artesanales con ingredientes frescos y sabores únicos
              </p>
              <p className="text-base sm:text-lg text-italian-red font-semibold mb-8">
                🍕 Todas nuestras pizzas son tamaño familiar
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/60">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-italian-green rounded-full"></span>
                  <span>Receta Tradicional</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-italian-red rounded-full"></span>
                  <span>Miércoles a Domingo</span>
                </div>
              </div>
            </motion.div>
          </section>

          <CategoryTabs 
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          <section className="pb-20">
            {renderContent()}
          </section>
        </main>

        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          totalPrice={getTotalPrice()}
          onClearCart={clearCart}
        />

        <WhatsAppButton />
        <InstallPrompt />
      </div>
    </BusinessHoursCheck>
  );
}

export default App;