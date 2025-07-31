import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, Clock } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-italian-red/10 to-gold/10 px-6 py-3 rounded-full border border-italian-red/20 mb-8"
          >
            <Award className="w-5 h-5 text-italian-red" />
            <span className="text-charcoal font-medium">Premiada Pizzería Italiana</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl md:text-7xl font-cormorant font-bold gradient-text mb-6 leading-tight"
          >
            Sapori d'Italia
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-charcoal/80 mb-8 leading-relaxed font-light"
          >
            Ingredientes premium importados directamente de Italia, 
            <br className="hidden md:block" />
            preparados con técnicas tradicionales de más de 100 años
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center gap-8 text-charcoal/70"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="font-medium">Ingredientes Premium</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-italian-green" />
              <span className="font-medium">Recetas Tradicionales</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;