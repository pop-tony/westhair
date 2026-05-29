import React from 'react'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, CreditCard, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import axios from 'axios';

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    clearCart
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orderRef, setOrderRef] = useState('');
  const [checkoutItem, setCheckoutItem] = useState(null); // Track which item is being checked out

  const handleQuantityChange = (cartItemId, change) => {
    const item = cartItems.find(i => i.cartItemId === cartItemId);
    if (item) {
      const newQty = item.quantity + change;
      if (newQty < 1) {
        removeFromCart(cartItemId);
      } else {
        updateQuantity(cartItemId, newQty);
      }
    }
  };

  const handleSingleCheckout = (item) => {
    setCheckoutItem(item);
    setCheckoutStep('checkout');
  };

  const key = import.meta.env.VITE_PAYSTACK_LIVE_PUBLIC_KEY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const payWithPaystack = (e) => {
    e.preventDefault();

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast.error('Please fill all required fields');
      return;
    }

    if (typeof window.PaystackPop === 'undefined') {
      toast.error('Payment service not loaded. Please refresh.');
      return;
    }

    if (!checkoutItem) {
      toast.error('No item selected for checkout');
      return;
    }

    const itemTotal = checkoutItem.price * checkoutItem.quantity;

    const handlePaymentSuccess = async (response) => {
      try {
        await createOrder(response.reference, checkoutItem);
        toast.success(`Payment complete! Ref: ${response.reference}`);
        setOrderRef(response.reference);
        setCheckoutStep('success');
      } catch (err) {
        toast.error('Payment succeeded but order save failed');
        console.error(err);
      }
    };

    const handlePaymentClose = () => {
      toast.info('Payment window closed');
    };

    const handler = window.PaystackPop.setup({
      key: key,
      email: customerInfo.email,
      amount: Math.round(itemTotal * 100), // Single item total
      currency: 'GHS',
      ref: `AURA_${checkoutItem.cartItemId}_${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: customerInfo.name
          },
          {
            display_name: "Product",
            variable_name: "product",
            value: checkoutItem.name
          },
          {
            display_name: "Quantity",
            variable_name: "quantity",
            value: checkoutItem.quantity.toString()
          },
          {
            display_name: "Cart Item ID",
            variable_name: "cart_item_id",
            value: checkoutItem.cartItemId
          }
        ]
      },
      callback: (response) => handlePaymentSuccess(response),
      onClose: handlePaymentClose,
    });

    handler.openIframe();
  };

  const createOrder = async (reference, item) => {
    try {
      const orderData = {
        customer: customerInfo,
        items: [{
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          category: item.category
        }],
        total: item.price * item.quantity,
        paymentRef: reference,
        status: 'paid',
      };

      const order = await axios.post(`${backendUrl}/api/order/create-order`, {orderData});
      if (order.data.success) {
        toast.success("Order placed successfully!");
        removeFromCart(item.cartItemId); // Remove only this item
      } else {
        console.log(order.data)
      }
    } catch (error) {
      toast.error("Order saved locally. Contact support with ref: " + reference);
      console.log(error);
      removeFromCart(item.cartItemId);
    }
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setCheckoutStep('cart');
      setCustomerInfo({ name: '', email: '', phone: '', address: '' });
      setCheckoutItem(null);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[90] h-full w-full bg-white shadow-2xl dark:bg-zinc-900 sm:w-"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-zinc-200 p-6 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                  {checkoutStep !== 'cart' && checkoutStep !== 'success' && (
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('cart')}
                      className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                  )}
                  <ShoppingBag className="h-6 w-6 text-zinc-900 dark:text-white" />
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                    {checkoutStep === 'cart' && `Cart (${cartCount})`}
                    {checkoutStep === 'checkout' && 'Checkout'}
                    {checkoutStep === 'success' && 'Order Confirmed'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {checkoutStep === 'cart' && (
                <>
                  <div className="flex-1 overflow-y-auto p-6">
                    {cartItems.length === 0 ? (
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        <ShoppingBag className="h-16 w-16 text-zinc-300 dark:text-zinc-700" />
                        <p className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">
                          Your cart is empty
                        </p>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                          Add some items to get started
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <motion.div
                            key={item.cartItemId}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50"
                          >
                            <div className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-20 w-20 rounded-xl object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                                      {item.name}
                                    </h3>
                                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                      {item.category}
                                    </p>
                                    <p className="mt-1 font-bold text-rose-500">${item.price}</p>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(item.cartItemId)}
                                    className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-500/10"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>

                                <div className="mt-3 flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleQuantityChange(item.cartItemId, -1)}
                                    className="rounded-lg bg-zinc-200 p-1.5 text-zinc-900 hover:bg-zinc-300 active:scale-95 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="w-10 text-center font-semibold text-zinc-900 dark:text-white">
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleQuantityChange(item.cartItemId, 1)}
                                    className="rounded-lg bg-zinc-200 p-1.5 text-zinc-900 hover:bg-zinc-300 active:scale-95 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                  <span className="ml-auto font-bold text-zinc-900 dark:text-white">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Individual Checkout Button */}
                            <button
                              type="button"
                              onClick={() => handleSingleCheckout(item)}
                              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-500 active:scale-95 dark:bg-white dark:text-black"
                            >
                              <CreditCard className="h-4 w-4" />
                              Checkout ${(item.price * item.quantity).toFixed(2)}
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <div className="border-t border-zinc-200 p-6 dark:border-zinc-800">
                      <div className="flex items-center justify-between text-zinc-900 dark:text-white">
                        <span className="text-lg font-semibold">Cart Total</span>
                        <span className="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
                      </div>
                      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
                        Checkout items individually above
                      </p>
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'checkout' && checkoutItem && (
                <>
                  <div className="flex-1 overflow-y-auto p-6">
                    <form onSubmit={payWithPaystack} className="space-y-4">
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-400/20 dark:bg-amber-500/10">
                        <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                          Checking out: {checkoutItem.name} x{checkoutItem.quantity}
                        </p>
                        <p className="mt-1 text-lg font-bold text-amber-900 dark:text-amber-200">
                          Total: ${(checkoutItem.price * checkoutItem.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                          placeholder="+233..."
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Delivery Address
                        </label>
                        <textarea
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                          rows={3}
                          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                          placeholder="Enter delivery address"
                        />
                      </div>

                      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-zinc-800/50">
                        <h4 className="mb-3 font-semibold text-zinc-900 dark:text-white">Order Summary</h4>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="text-zinc-600 dark:text-zinc-400">
                            {checkoutItem.name} x{checkoutItem.quantity}
                          </span>
                          <span className="font-medium text-zinc-900 dark:text-white">
                            ${(checkoutItem.price * checkoutItem.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div className="mt-3 border-t border-zinc-300 pt-3 dark:border-zinc-700">
                          <div className="flex justify-between font-bold text-zinc-900 dark:text-white">
                            <span>Total</span>
                            <span>${(checkoutItem.price * checkoutItem.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="border-t border-zinc-200 p-6 dark:border-zinc-800">
                    <button
                      type="button"
                      onClick={payWithPaystack}
                      className="w-full rounded-full bg-zinc-900 py-4 font-semibold text-white transition hover:bg-rose-500 hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-rose-500 dark:hover:text-white"
                    >
                      Pay GHS {(checkoutItem.price * checkoutItem.quantity).toFixed(2)} with Paystack
                    </button>
                  </div>
                </>
              )}

              {checkoutStep === 'success' && (
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10"
                    >
                      <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </motion.div>

                    <h3 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">
                      Order Confirmed!
                    </h3>
                    <p className="mt-2 text-balance text-sm text-zinc-600 dark:text-zinc-400">
                      Order ref: <span className="font-semibold text-zinc-900 dark:text-white">{orderRef}</span>
                    </p>
                    <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                      We’ve sent confirmation to <span className="font-semibold text-zinc-900 dark:text-white">{customerInfo.email}</span>
                    </p>

                    <button
                      type="button"
                      onClick={closeCart}
                      className="mt-8 w-full rounded-full border-2 border-zinc-900 py-4 font-semibold text-zinc-900 transition hover:bg-zinc-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}