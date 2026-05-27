import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProductsSection({ products, handleViewProduct, addToCart }) {
  const [showAll, setShowAll] = useState(false);
  const initialCount = 4; // shows 4 on mobile = 2 rows, 8 on desktop = 2 rows
  const displayedProducts = showAll ? products : products.slice(0, initialCount);
  const hasMore = products.length > initialCount;

  return (
    <section id="products" className="bg-zinc-50 py-20 transition-colors dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white sm:text-5xl">Shop Products</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Professional grade for home use</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-xl dark:bg-zinc-800/50 dark:ring-white/10"
            >
              <div
                className="relative aspect-[3/4] overflow-hidden cursor-pointer"
                onClick={() => handleViewProduct(product)}
              >
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 rounded-full bg-rose-500 px-2 py-1 text-xs font-bold text-white sm:top-3 sm:left-3">
                    SALE
                  </div>
                )}
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-xs text-zinc-500 dark:text-zinc-500">{product.category}</p>
                <h3
                  className="mt-1 line-clamp-1 cursor-pointer text-sm font-semibold text-zinc-900 hover:text-rose-500 dark:text-white sm:text-base"
                  onClick={() => handleViewProduct(product)}
                >
                  {product.name}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-zinc-900 dark:text-white sm:text-lg">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-zinc-500 line-through sm:text-sm">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="rounded-full bg-zinc-900 p-1.5 text-white transition hover:bg-rose-500 hover:scale-110 active:scale-95 dark:bg-white dark:text-black sm:p-2"
                  >
                    <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              {showAll ? (
                <>
                  Show Less <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show All {products.length} Products <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}