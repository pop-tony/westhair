import React from 'react'
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export default function ServiceCard({ service, onBook }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-zinc-900 backdrop-blur dark:bg-zinc-900/90 dark:text-white">
          ${service.price}
        </div>
      </div> {/* <-- This was missing */}
      
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
          {service.category}
        </p>
        <h3 className="mt-1 text-lg font-bold text-zinc-900 dark:text-white">{service.name}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <Clock className="h-4 w-4" />
          {service.duration} mins
        </div>
        <p className="mt-3 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
          {service.description}
        </p>
        <button
          type="button"
          onClick={() => onBook(service)}
          className="mt-4 w-full rounded-full bg-zinc-900 py-3 font-semibold text-white transition hover:bg-amber-500 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-amber-500 dark:hover:text-white"
        >
          Book This
        </button>
      </div>
    </motion.div>
  );
}