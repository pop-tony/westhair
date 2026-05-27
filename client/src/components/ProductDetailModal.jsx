import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetailModal({ product, isOpen, onClose }) {
  const { addToCart } = useCart();

  if (!isOpen ||!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-x-4 top-[50%] z-[110] mx-auto max-w-2xl translate-y-[-50%] rounded-3xl bg-white shadow-2xl dark:bg-zinc-900 md:inset-x-auto md:w-full"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-lg bg-white/80 p-2 text-zinc-500 backdrop-blur hover:bg-white hover:text-zinc-900 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid gap-6 p-8 md:grid-cols-2">
          <img
            src={product.image}
            alt={product.name}
            className="h-80 w-full rounded-2xl object-cover"
          />

          <div>
            <span className="inline-block rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-500">
              {product.category}
            </span>
            <h3 className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white">
              {product.name}
            </h3>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">(4.8)</span>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {product.description}
            </p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-zinc-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 py-4 font-semibold text-white transition hover:bg-rose-500 hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-rose-500 dark:hover:text-white"
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}