import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, CheckCircle, MessageCircle, Facebook } from 'lucide-react';

const ShareMenuButton: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const menuUrl = window.location.href;
  const shareText = "¡Mira el delicioso menú de La Italiana! 🍕 Pizzas artesanales auténticas con ingredientes premium.";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const handleWhatsAppShare = () => {
    const logoUrl = `${window.location.origin}/LAITALIANA-LOGO.png`;
    const message = `${shareText}\n\n🍕 Ver menú completo: ${menuUrl}\n\n📸 Logo: ${logoUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFacebookShare = () => {
    const logoUrl = `${window.location.origin}/LAITALIANA-LOGO.png`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(menuUrl)}&picture=${encodeURIComponent(logoUrl)}&title=${encodeURIComponent('La Italiana - Pizzería Auténtica')}&description=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank');
  };

  const handleNativeShare = async () => {
    // Always show custom share options instead of native share
    setShowOptions(!showOptions);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNativeShare}
        className="btn-premium text-white p-3 rounded-2xl premium-shadow-lg flex items-center space-x-2"
      >
        <Share2 className="w-5 h-5" />
      </motion.button>

      {showOptions && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="absolute top-full right-0 mt-2 w-64 bg-dark-bg/95 backdrop-blur-xl rounded-2xl p-4 premium-shadow-lg border border-white/30 z-50"
        >
          <h3 className="text-white font-semibold mb-3 text-center">Compartir</h3>
          
          <div className="space-y-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopyLink}
              className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
              <span>{copied ? '¡Copiado!' : 'Copiar enlace'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWhatsAppShare}
              className="w-full flex items-center space-x-3 p-3 bg-green-500/20 hover:bg-green-500/30 rounded-xl transition-colors text-white"
            >
              <MessageCircle className="w-5 h-5 text-green-400" />
              <span>WhatsApp</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFacebookShare}
              className="w-full flex items-center space-x-3 p-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-xl transition-colors text-white"
            >
              <Facebook className="w-5 h-5 text-blue-400" />
              <span>Facebook</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ShareMenuButton;