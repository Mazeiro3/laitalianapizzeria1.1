import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, Loader2, Wifi, WifiOff } from 'lucide-react';
import { useSchedule } from '../hooks/useSchedule';

interface BusinessHoursCheckProps {
  children: React.ReactNode;
}

const BusinessHoursCheck: React.FC<BusinessHoursCheckProps> = ({ children }) => {
  const { businessStatus, loading, error, getFormattedSchedules } = useSchedule();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-gray-900 to-dark-bg flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="glass-morphism rounded-3xl p-8 premium-shadow-lg border border-white/10 text-center">
            <div className="w-20 h-20 bg-italian-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-italian-red animate-spin" />
            </div>
            
            <h2 className="text-2xl font-playfair font-bold text-white mb-4">
              Cargando Horarios
            </h2>
            
            <p className="text-white/70">
              Verificando disponibilidad...
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-gray-900 to-dark-bg flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="glass-morphism rounded-3xl p-8 premium-shadow-lg border border-white/10 text-center">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <WifiOff className="w-10 h-10 text-red-400" />
            </div>
            
            <h2 className="text-2xl font-playfair font-bold text-white mb-4">
              Error de Conexión
            </h2>
            
            <p className="text-white/70 mb-6">
              {error}. Por favor, verifica tu conexión a internet.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="btn-premium text-white py-3 px-6 rounded-2xl font-semibold premium-shadow-lg"
            >
              Reintentar
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show closed state
  if (!businessStatus.isOpen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-bg via-gray-900 to-dark-bg flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="glass-morphism rounded-3xl p-8 premium-shadow-lg border border-white/10 text-center">
            <div className="w-20 h-20 bg-italian-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-italian-red" />
            </div>
            
            <h2 className="text-3xl font-playfair font-bold text-white mb-4">
              Estamos Cerrados
            </h2>
            
            <div className="mb-6">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Horario de Servicio</span>
              </div>
              
              {businessStatus.message && (
                <p className="text-lg text-white font-medium mb-4">
                  {businessStatus.message}
                </p>
              )}
              
              {businessStatus.nextOpenTime && (
                <p className="text-italian-green font-semibold">
                  Próxima apertura: {businessStatus.nextOpenTime.day} a las {businessStatus.nextOpenTime.time}
                </p>
              )}
            </div>
            
            {/* Schedule Display */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">Horarios de la Semana</h3>
              <div className="space-y-2">
                {getFormattedSchedules().map((schedule, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between items-center p-2 rounded-lg transition-colors ${
                      schedule.closed 
                        ? 'bg-red-500/10 border border-red-500/20' 
                        : 'bg-green-500/10 border border-green-500/20'
                    }`}
                  >
                    <span className="text-white font-medium text-sm">{schedule.day}</span>
                    <span className={`text-xs font-medium ${
                      schedule.closed ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-white/70 leading-relaxed mb-6">
              Regresa durante nuestro horario de atención para realizar tu pedido. 
              ¡Te esperamos con las mejores pizzas artesanales!
            </p>
            
            <div className="glass-morphism rounded-2xl p-4 border border-italian-green/30 bg-italian-green/10">
              <p className="text-italian-green text-sm font-medium">
                🍟 Tip: Al pedir tu pizza acompáñala con nuestras papas a la francesa
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

export default BusinessHoursCheck;