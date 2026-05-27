import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Sparkles, ShoppingBag, Star, Clock, MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceBookingModal from '../components/ServiceBookingModal';
import ProductDetailModal from '../components/ProductDetailModal';
import { Toaster } from 'sonner';
import BarberCard from '../components/BarberCard';
import BookingModal from '../components/BookingModal';
import { services, gallery, timeSlots, barbers, products } from '../data/barbershopData';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const { addToCart } = useCart();

  const categories = ['All',...new Set(services.map(s => s.category))];
  const filteredServices = filter === 'All'? services : services.filter(s => s.category === filter);

  const handleBookService = (service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  const handleBookBarber = (barber) => {
    setSelectedBarber(barber);
    setSelectedService(services[0]); // Default to first service, user can change
    setIsBookingOpen(true);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsProductOpen(true);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={darkMode? 'dark' : ''}>
      <Toaster position="top-center" richColors />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

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

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white sm:text-5xl">Our Services</h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Expert cuts, color & grooming</p>
        </div>

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition ${
                filter === cat
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-black'
                  : 'bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {filteredServices.map(service => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ y: -4 }}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-xl dark:bg-zinc-900 dark:ring-white/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={service.image} alt={service.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute top-2 right-2 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-zinc-900 backdrop-blur sm:top-3 sm:right-3 sm:px-3 sm:text-sm">
                  ${service.price}
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-xs text-amber-600 dark:text-amber-400">{service.category} • {service.duration}</p>
                <h3 className="mt-1 line-clamp-1 text-sm font-bold text-zinc-900 dark:text-white sm:text-base">
                  {service.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
                  {service.description}
                </p>
                <button
                  type="button"
                  onClick={() => handleBookService(service)}
                  className="mt-3 w-full rounded-full bg-zinc-900 py-2 text-xs font-semibold text-white transition hover:bg-amber-500 active:scale-95 dark:bg-white dark:text-black sm:py-2.5 sm:text-sm"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="bg-white py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-black text-zinc-900 dark:text-white sm:text-5xl">Shop Products</h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">Professional grade for home use</p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {products.map(product => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                className="group overflow-hidden rounded-2xl bg-zinc-50 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-xl dark:bg-zinc-800/50 dark:ring-white/10"
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
        </div>
      </section>

      {/* Barbers */}
      <section id="barbers" className="bg-white py-20 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white">Meet The Team</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Book your favorite barber directly</p>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {barbers.map(barber => (
              <BarberCard key={barber.id} barber={barber} onBook={handleBookBarber} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-4xl font-black text-zinc-900 dark:text-white">Recent Work</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {gallery.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="aspect-square overflow-hidden rounded-2xl"
            >
              <img src={img} alt={`Gallery ${i}`} className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer with Contact */}
      <Footer />

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        service={selectedService}
        barber={selectedBarber}
      />
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductOpen}
        onClose={() => setIsProductOpen(false)}
      />
    </div>
  );
}