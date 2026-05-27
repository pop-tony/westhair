import React from 'react'
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Scissors } from 'lucide-react';

export default function Hero() {
  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h- overflow-hidden pt-16 lg:pt-20">
        <img
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1474"
          alt="Barbershop"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 backdrop-blur"
            >
              <Scissors className="h-8 w-8 text-amber-500" />
            </motion.div>
            <h1 className="text-5xl font-black text-white sm:text-7xl lg:text-8xl">
              Fade & Co
            </h1>
            <p className="mt-6 text-xl text-white/90 sm:text-2xl">
              Cuts. Color. Confidence.
            </p>
            <p className="mt-4 text-base text-white/70">
              Premium barbering & styling in East Legon. Walk-ins welcome.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => scrollTo('services')}
                className="rounded-full bg-amber-500 px-8 py-4 text-lg font-bold text-black transition hover:bg-amber-400 hover:scale-105 active:scale-95"
              >
                Book Appointment
              </button>
              <button
                type="button"
                onClick={() => scrollTo('products')}
                className="rounded-full border-2 border-white px-8 py-4 text-lg font-bold text-white transition hover:bg-white hover:text-black hover:scale-105 active:scale-95"
              >
                Shop Products
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
    </>
  );
}