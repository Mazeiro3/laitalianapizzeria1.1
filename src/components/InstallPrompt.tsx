import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Smartphone, Pizza } from 'lucide-react';

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt after a delay to not overwhelm the user
      setTimeout(() => setShowPrompt(true), 5000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Show again after 24 hours
    setTimeout(() => setShowPrompt(true), 24 * 60 * 60 * 1000);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-8 right-8 max-w-sm z-50"
        >
          <div className="glass-morphism rounded-3xl p-6 premium-shadow-lg border border-white/20">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-italian-red to-red-800 rounded-2xl flex items-center justify-center animate-pulse-glow">
                  <Pizza className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-lg text-white">
                    Instalar La Italiana
                  </h3>
                  <p className="text-sm text-white/60">
                    App Premium
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDismiss}
                className="text-white/40 hover:text-white/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-3">
                <Smartphone className="w-4 h-4 text-italian-red" />
                <span className="text-sm font-medium text-white">
                  Experiencia nativa en tu móvil
                </span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed">
                • Pedidos más rápidos y seguros<br/>
                • Funciona sin conexión a internet<br/>
                • Notificaciones de ofertas especiales
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleInstall}
              className="w-full btn-premium text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-3 premium-shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>Instalar App Gratis</span>
            </motion.button>
            
            <p className="text-xs text-white/50 text-center mt-3">
              Instalación segura y gratuita
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InstallPrompt;