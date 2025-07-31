import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import ShareMenuButton from './ShareMenuButton';
import HoursButton from './HoursButton';

interface HeaderProps {
  cartItemsCount: number;
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartToggle }) => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center space-x-4"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden premium-shadow-lg animate-pulse-glow border-2 border-italian-red/30">
                <img 
                  src="/LAITALIANA-LOGO.png" 
                  alt="La Italiana Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-italian-green rounded-full border-2 border-black"></div>
            </div>
            <div>
              <h1 className="text-3xl font-playfair font-bold gradient-text leading-tight">
                La Italiana
              </h1>
              <p className="text-white/70 text-sm font-medium -mt-1">
                Pizzería
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center space-x-3"
          >
            <ShareMenuButton />
            <HoursButton />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartToggle}
              className="relative btn-premium text-white p-4 rounded-2xl premium-shadow-lg"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-italian-green text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-lg"
                >
                  {cartItemsCount > 9 ? '9+' : cartItemsCount}
                </motion.div>
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;