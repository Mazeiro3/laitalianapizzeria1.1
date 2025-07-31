import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, MessageCircle, User, Phone, MapPin, Truck, CreditCard, Banknote, Copy, CheckCircle, Store } from 'lucide-react';
import { CartItem, OrderData } from '../types';
import { generateOrderNumber } from '../utils/businessHours';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number, details?: string) => void;
  onRemoveItem: (itemId: string, details?: string) => void;
  totalPrice: number;
  onClearCart: () => void;
}

const Cart: React.FC<CartProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  totalPrice,
  onClearCart 
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [copiedField, setCopiedField] = useState<string>('');
  const [orderNumber] = useState(() => generateOrderNumber()); // Generate once when component mounts

  const deliveryCost = orderType === 'delivery' ? 35 : 0;
  const finalTotal = totalPrice + deliveryCost;

  const bankInfo = {
    bank: 'BBVA',
    name: 'La Italiana',
    clabe: '012342015885272134'
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    });
  };

  const handleWhatsAppOrder = () => {
    if (!customerName.trim()) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    if (orderType === 'delivery' && !address.trim()) {
      alert('La dirección es obligatoria para pedidos a domicilio');
      return;
    }

    const orderData: OrderData = {
      orderNumber,
      customerName,
      orderType: orderType === 'delivery' ? 'takeaway' : 'dine-in',
      items: cartItems,
      total: finalTotal,
      phone,
      address: orderType === 'delivery' ? address : 'Abasolo 515, Col. Compositores',
      deliveryCost,
      paymentMethod
    };

    const message = generateWhatsAppMessage(orderData);
    const whatsappUrl = `https://wa.me/523411394483?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setCustomerName('');
    setPhone('');
    setAddress('');
    setPaymentMethod('cash');
    onClearCart();
    onClose();
  };

  const generateWhatsAppMessage = (order: OrderData): string => {
    const now = new Date();
    const time = now.toLocaleTimeString('es-MX', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    let message = `*🍕 PEDIDO LA ITALIANA*\n\n`;
    
    // Cliente section
    message += `👤 *Cliente*\n`;
    message += `Nombre: ${order.customerName}\n`;
    if (order.phone) {
      message += `Teléfono: ${order.phone}\n`;
    }
    message += `Hora: ${time}\n`;
    message += `Pedido #${order.orderNumber}\n\n`;
    
    // Dirección section
    if (order.orderType === 'takeaway') {
      message += `🚚 *Entrega a domicilio*\n`;
      message += `Dirección: ${order.address}\n\n`;
    } else {
      message += `🏪 *Recoger en tienda*\n`;
      message += `Dirección: ${order.address}\n\n`;
    }
    
    // Pedido section
    message += `📋 *Pedido*\n`;
    order.items.forEach(item => {
      const itemType = item.type === 'boneless' || item.type === 'snack' ? 'ANTOJITO' : 'PIZZA';
      message += `• ${itemType}: ${item.name}`;
      if (item.details) {
        message += ` - ${item.details}`;
      }
      message += ` (${item.quantity}x) - $${item.price * item.quantity}\n`;
    });
    
    message += `\n💵 *Resumen*\n`;
    message += `Subtotal: $${order.total - (order.deliveryCost || 0)} MXN\n`;
    if (order.deliveryCost && order.deliveryCost > 0) {
      message += `Costo de entrega: $${order.deliveryCost} MXN\n`;
    }
    message += `*Total: $${order.total} MXN*\n`;
    message += `Forma de pago: ${order.paymentMethod === 'cash' ? 'EFECTIVO' : 'TRANSFERENCIA BANCARIA'}\n`;
    
    if (order.paymentMethod === 'card') {
      message += `\n*💳 DATOS PARA TRANSFERENCIA:*\n`;
      message += `Banco: ${bankInfo.bank}\n`;
      message += `Nombre: ${bankInfo.name}\n`;
      message += `CLABE: ${bankInfo.clabe}\n`;
      message += `Concepto: Pedido ${order.orderNumber}\n`;
    }
    
    message += `\n¡Gracias por tu pedido! 🍕`;
    
    return message;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-dark-bg z-50 overflow-y-auto border-l border-white/10"
          >
            {/* Header */}
            <div className="glass-morphism border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-italian-red to-red-800 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-playfair font-bold text-white">Tu Pedido</h2>
                    <p className="text-sm text-white/60">
                      {orderType === 'delivery' ? 'Entrega a domicilio' : 'Recoger en tienda'}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>
            </div>

            <div className="p-6">
              {cartItems.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-12 h-12 text-white/30" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-white mb-2">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-white/60">
                    Agrega algunas pizzas deliciosas para comenzar
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 mb-8">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${item.details}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        layout
                        className="glass-morphism rounded-2xl p-4 premium-shadow border border-white/10"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-playfair font-semibold text-white mb-1">
                              {item.name}
                            </h3>
                            {item.details && (
                              <p className="text-white/70 text-sm mb-2">
                                {item.details}
                              </p>
                            )}
                            <p className="text-italian-red font-bold text-lg">
                              ${item.price * item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3 ml-4">
                            <div className="flex items-center space-x-2 bg-white/5 rounded-xl p-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.details)}
                                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                              >
                                <Minus className="w-4 h-4 text-white" />
                              </motion.button>
                              <span className="w-8 text-center font-bold text-white">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.details)}
                                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                              >
                                <Plus className="w-4 h-4 text-white" />
                              </motion.button>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onRemoveItem(item.id, item.details)}
                              className="p-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Customer Form */}
                  <div className="space-y-4 mb-8">
                    <h3 className="text-lg font-playfair font-semibold text-white mb-4">
                      Información del pedido
                    </h3>
                    
                    {/* Order Type Selection */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-white/80 mb-3">
                        Tipo de pedido
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setOrderType('delivery')}
                          className={`
                            p-4 rounded-2xl border-2 transition-all flex flex-col items-center space-y-2
                            ${orderType === 'delivery' 
                              ? 'border-italian-red bg-italian-red/20 text-italian-red' 
                              : 'border-white/20 bg-white/5 text-white hover:border-italian-red/50'
                            }
                          `}
                        >
                          <Truck className="w-6 h-6" />
                          <span className="font-medium">Entrega</span>
                          <span className="text-xs opacity-70">A domicilio (+$35)</span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setOrderType('pickup')}
                          className={`
                            p-4 rounded-2xl border-2 transition-all flex flex-col items-center space-y-2
                            ${orderType === 'pickup' 
                              ? 'border-italian-red bg-italian-red/20 text-italian-red' 
                              : 'border-white/20 bg-white/5 text-white hover:border-italian-red/50'
                            }
                          `}
                        >
                          <Store className="w-6 h-6" />
                          <span className="font-medium">Recoger</span>
                          <span className="text-xs opacity-70">En tienda (gratis)</span>
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="text"
                        placeholder="Tu nombre completo *"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl focus:ring-2 focus:ring-italian-red/50 focus:border-italian-red/50 transition-all placeholder-white/40 text-white"
                      />
                    </div>
                    
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input
                        type="tel"
                        placeholder="Tu número de teléfono (opcional)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-2xl focus:ring-2 focus:ring-italian-red/50 focus:border-italian-red/50 transition-all placeholder-white/40 text-white"
                      />
                    </div>

                    {orderType === 'delivery' ? (
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input
                          type="text"
                          placeholder="Tu dirección completa *"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className={`
                            w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl focus:ring-2 focus:ring-italian-red/50 focus:border-italian-red/50 transition-all placeholder-white/40 text-white
                            ${address.trim() === '' 
                              ? 'border-red-400/50' 
                              : 'border-white/20'
                            }
                          `}
                        />
                        <p className="text-xs text-white/60 mt-2 flex items-center space-x-1">
                          <Truck className="w-3 h-3" />
                          <span>Campo obligatorio para entrega a domicilio</span>
                        </p>
                      </div>
                    ) : (
                      <div className="glass-morphism rounded-2xl p-4 border border-italian-green/30 bg-italian-green/10">
                        <div className="flex items-center space-x-3 mb-2">
                          <Store className="w-5 h-5 text-italian-green" />
                          <span className="font-semibold text-italian-green">Recoger en tienda</span>
                        </div>
                        <p className="text-white/80 text-sm">
                          <strong>Dirección:</strong> Abasolo 515, Col. Compositores
                        </p>
                        <p className="text-white/60 text-xs mt-1">
                          Tu pedido estará listo en 20-30 minutos
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Payment Method Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-playfair font-semibold text-white mb-4">
                      Forma de pago
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPaymentMethod('cash')}
                        className={`
                          p-4 rounded-2xl border-2 transition-all flex flex-col items-center space-y-2
                          ${paymentMethod === 'cash' 
                            ? 'border-italian-red bg-italian-red/20 text-italian-red' 
                            : 'border-white/20 bg-white/5 text-white hover:border-italian-red/50'
                          }
                        `}
                      >
                        <Banknote className="w-6 h-6" />
                        <span className="font-medium">Efectivo</span>
                        <span className="text-xs opacity-70">Pago al recibir</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setPaymentMethod('card')}
                        className={`
                          p-4 rounded-2xl border-2 transition-all flex flex-col items-center space-y-2
                          ${paymentMethod === 'card' 
                            ? 'border-italian-red bg-italian-red/20 text-italian-red' 
                            : 'border-white/20 bg-white/5 text-white hover:border-italian-red/50'
                          }
                        `}
                      >
                        <CreditCard className="w-6 h-6" />
                        <span className="font-medium">Transferencia</span>
                        <span className="text-xs opacity-70">Pago anticipado</span>
                      </motion.button>
                    </div>

                    {/* Bank Transfer Information */}
                    {paymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glass-morphism rounded-2xl p-6 border border-blue-500/30 bg-blue-500/10"
                      >
                        <h4 className="font-semibold text-blue-400 mb-4 flex items-center space-x-2">
                          <CreditCard className="w-5 h-5" />
                          <span>Datos para transferencia</span>
                        </h4>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                            <div>
                              <span className="text-white/60 text-sm">Banco:</span>
                              <p className="text-white font-medium">{bankInfo.bank}</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => copyToClipboard(bankInfo.bank, 'bank')}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              {copiedField === 'bank' ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-white/60" />
                              )}
                            </motion.button>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                            <div>
                              <span className="text-white/60 text-sm">Nombre:</span>
                              <p className="text-white font-medium">{bankInfo.name}</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => copyToClipboard(bankInfo.name, 'name')}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              {copiedField === 'name' ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-white/60" />
                              )}
                            </motion.button>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                            <div>
                              <span className="text-white/60 text-sm">CLABE:</span>
                              <p className="text-white font-medium font-mono">{bankInfo.clabe}</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => copyToClipboard(bankInfo.clabe, 'clabe')}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              {copiedField === 'clabe' ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-white/60" />
                              )}
                            </motion.button>
                          </div>

                          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                            <div>
                              <span className="text-white/60 text-sm">Número de pedido:</span>
                              <p className="text-white font-medium font-mono">{orderNumber}</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => copyToClipboard(orderNumber, 'orderNumber')}
                              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              {copiedField === 'orderNumber' ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-white/60" />
                              )}
                            </motion.button>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                          <p className="text-yellow-400 text-sm">
                            <strong>Importante:</strong> En el concepto de pago anota el número de pedido proporcionado.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Total Breakdown */}
                  <div className="glass-morphism rounded-2xl p-6 mb-8 border border-italian-red/20">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-white/80">
                        <span>Subtotal:</span>
                        <span>${totalPrice}</span>
                      </div>
                      
                      {orderType === 'delivery' && (
                        <div className="flex justify-between items-center text-white/80">
                          <span className="flex items-center space-x-2">
                            <Truck className="w-4 h-4" />
                            <span>Costo de entrega:</span>
                          </span>
                          <span>${deliveryCost}</span>
                        </div>
                      )}
                      
                      {orderType === 'pickup' && (
                        <div className="flex justify-between items-center text-italian-green">
                          <span className="flex items-center space-x-2">
                            <Store className="w-4 h-4" />
                            <span>Recoger en tienda:</span>
                          </span>
                          <span>Gratis</span>
                        </div>
                      )}
                      
                      <div className="border-t border-white/20 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-playfair font-semibold text-white">
                            Total a pagar:
                          </span>
                          <span className="text-3xl font-bold gradient-text">
                            ${finalTotal}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsAppOrder}
                    className="w-full btn-success text-white py-5 rounded-2xl font-semibold flex items-center justify-center space-x-3 premium-shadow-lg transition-all"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span>Enviar por WhatsApp</span>
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;