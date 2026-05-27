import React from 'react'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ServiceBookingModal({ service, isOpen, onClose }) {
  const [step, setStep] = useState('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  if (!isOpen ||!service) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!formData.name ||!formData.email ||!formData.date ||!formData.time) {
      toast.error('Please fill all required fields');
      return;
    }
    setStep('success');
    toast.success('Booking confirmed!');
  };

  const handleClose = () => {
    setStep('details');
    setFormData({ name: '', email: '', phone: '', date: '', time: '', notes: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed inset-x-4 top-[50%] z-[110] mx-auto max-w-lg translate-y-[-50%] rounded-3xl bg-white p-8 shadow-2xl dark:bg-zinc-900 md:inset-x-auto md:w-full"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {step === 'details' && (
          <div>
            <div className="mb-6 flex gap-4">
              <img
                src={service.image}
                alt={service.name}
                className="h-24 w-24 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <span className="inline-block rounded-full bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-500">
                  {service.category}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
                  {service.name}
                </h3>
                <div className="mt-2 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration || '60 min'}</span>
                  </div>
                  <div className="font-bold text-rose-500">${service.price}</div>
                </div>
              </div>
            </div>

            <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
              {service.description}
            </p>

            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200">
              <p className="leading-relaxed">
                Confirm this service to proceed with booking. You’ll enter your details next.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 rounded-full border-2 border-zinc-300 py-3 font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setStep('booking')}
                className="flex-1 rounded-full bg-zinc-900 py-3 font-semibold text-white transition hover:bg-rose-500 hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-rose-500 dark:hover:text-white"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}

        {step === 'booking' && (
          <form onSubmit={handleConfirm}>
            <h3 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
              Book {service.name}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value })}
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
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                  placeholder="+233..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value })}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value })}
                    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                  placeholder="Any special requests..."
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="flex-1 rounded-full border-2 border-zinc-300 py-3 font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 rounded-full bg-zinc-900 py-3 font-semibold text-white transition hover:bg-rose-500 hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-rose-500 dark:hover:text-white"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10"
            >
              <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </motion.div>

            <h3 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">
              Booking Confirmed!
            </h3>
            <p className="mt-2 text-balance text-sm text-zinc-600 dark:text-zinc-400">
              Your appointment for <span className="font-semibold text-zinc-900 dark:text-white">{service.name}</span> is set.
            </p>

            <div className="mt-6 rounded-2xl bg-zinc-50 p-4 text-left dark:bg-zinc-800/50">
              <div className="mb-3 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Calendar className="h-4 w-4" />
                <span>{formData.date} at {formData.time}</span>
              </div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">
                Confirmation sent to <span className="font-semibold text-zinc-900 dark:text-white">{formData.email}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="mt-6 w-full rounded-full bg-zinc-900 py-3 font-semibold text-white transition hover:bg-rose-500 hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-rose-500 dark:hover:text-white"
            >
              Done
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}