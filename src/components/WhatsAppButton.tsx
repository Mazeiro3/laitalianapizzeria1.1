import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    const message = "Hola! Me gustaria conocer mas sobre La Italiana y hacer un pedido. Podrian ayudarme?";
    const whatsappUrl = `https://wa.me/523411394483?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        delay: 1.5, 
        type: 'spring', 
        stiffness: 260, 
        damping: 20 
      }}
      className="fixed bottom-8 left-8 z-40"
    >
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsAppClick}
        className="relative group"
      >
        {/* Pulsing rings */}
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
        <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-30"></div>
        
        {/* Main button */}
        <div className="relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-full premium-shadow-lg transition-all duration-300">
          <MessageCircle className="w-7 h-7" fill="currentColor" />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-white text-black px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap premium-shadow">
            Chatea con nosotros
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default WhatsAppButton;