import React, { useEffect } from 'react'
import { motion } from 'framer-motion';
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { Star } from 'lucide-react';

export default function BarberCard({ barber, onBook }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={barber.image}
          alt={barber.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm dark:bg-black/60">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-zinc-900 dark:text-white">{barber.rating}</span>
            <span className="text-xs text-zinc-600 dark:text-zinc-400">({barber.reviews})</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{barber.name}</h3>
        <p className="text-sm font-medium text-amber-600 dark:text-amber-400">{barber.role}</p>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{barber.bio}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {barber.specialties.map(spec => (
            <span key={spec} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-white/10 dark:text-zinc-300">
              {spec}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <a
            href={`https://instagram.com/${barber.instagram.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            <FaInstagram className="h-4 w-4" />
            {barber.instagram}
          </a>
          
        </div>
      </div>
    </motion.div>
  );
}