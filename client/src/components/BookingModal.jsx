import React from 'react'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CreditCard, CheckCircle2, ArrowLeft } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { toast } from 'sonner';
import axios from 'axios';
import { timeSlots, barbers } from '../data/barbershopData';

export default function BookingModal({ isOpen, onClose, service, barber }) {
  const [step, setStep] = useState('details');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedBarber, setSelectedBarber] = useState(barber || null);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
  const [bookingRef, setBookingRef] = useState('');

  const next7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  const key = import.meta.env.VITE_PAYSTACK_LIVE_PUBLIC_KEY;
  const availableBarbers = service? barbers.filter(b => service.barbers.includes(b.id)) : [];
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const handlePaymentSuccess = async (response) => {
  
    try {
      toast.success(`Booked! Ref: ${response.reference}`);
      setBookingRef(response.reference);
      await createBooking(response.reference);
      setStep('success');
    } catch (err) {
      toast.error('Payment succeeded but order save failed');
      console.error(err);
    }
  }

  const handlePaymentClose = () => {
    toast.info('Payment window closed');
  };

  const handlePay = () => {
    if (!customer.name ||!customer.email ||!customer.phone) {
      toast.error('Fill all fields');
      return;
    }
    if (!selectedDate ||!selectedTime ||!selectedBarber) {
      toast.error('Pick date, time & barber');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: key,
      email: customer.email,
      amount: Math.round(service.price * 1),
      currency: 'GHS',
      ref: `FADE_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
      metadata: {
        custom_fields: [
          { display_name: "Service", variable_name: "service", value: service.name },
          { display_name: "Barber", variable_name: "barber", value: selectedBarber.name },
          { display_name: "Date", variable_name: "date", value: selectedDate },
          { display_name: "Time", variable_name: "time", value: selectedTime }
        ]
      },
      callback: (response)=>handlePaymentSuccess(response),
      onClose: () => handlePaymentClose,
    });
    handler.openIframe();
  };

  const createBooking = async (ref) => {

    try {
      const book = await axios.post(`${backendUrl}/api/order/consult`, {
        service: service.name,
        barber: selectedBarber.name,
        date: selectedDate,
        time: selectedTime,
        customer,
        amount: service.price,
        paymentRef: ref,
        status: 'paid'
      });

      if (book.data.success) {
        toast.success("Order placed successfully!");
        clearCart();
      }else{
        console.log(book.data)
      }
    } catch (err) {
      console.error(err);
    }
  };

  const reset = () => {
    setStep('details');
    setSelectedDate('');
    setSelectedTime('');
    setCustomer({ name: '', email: '', phone: '' });
    setBookingRef('');
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  if (!isOpen ||!service) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 max-h- overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-zinc-900"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200 bg-white/80 p-6 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
            <div className="flex items-center gap-3">
              {step!== 'details' && step!== 'success' && (
                <button type="button" onClick={() => setStep('details')} className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-white/10">
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                {step === 'details' && 'Book Appointment'}
                {step === 'datetime' && 'Pick Time'}
                {step === 'payment' && 'Confirm & Pay'}
                {step === 'success' && 'Booked!'}
              </h2>
            </div>
            <button type="button" onClick={handleClose} className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            {step === 'details' && (
              <div className="space-y-6">
                <div className="flex gap-4">
                  <img src={service.image} alt={service.name} className="h-24 w-24 rounded-2xl object-cover" />
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{service.name}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{service.category}</p>
                    <p className="mt-2 text-2xl font-bold text-amber-600">${service.price}</p>
                    <p className="text-xs text-zinc-500">{service.duration} mins</p>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400">{service.description}</p>

                <div>
                  <h4 className="mb-3 font-semibold text-zinc-900 dark:text-white">Choose Barber</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {availableBarbers.map(b => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBarber(b)}
                        className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition ${
                          selectedBarber?.id === b.id
                          ? 'border-amber-500 bg-amber-500/10'
                            : 'border-zinc-200 hover:border-zinc-300 dark:border-white/10'
                        }`}
                      >
                        <img src={b.image} alt={b.name} className="h-12 w-12 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">{b.name}</p>
                          <p className="truncate text-xs text-zinc-600 dark:text-zinc-400">{b.role}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => selectedBarber && setStep('datetime')}
                  disabled={!selectedBarber}
                  className="w-full rounded-full bg-zinc-900 py-4 font-semibold text-white hover:bg-amber-500 disabled:opacity-50 disabled:hover:bg-zinc-900 dark:bg-white dark:text-black"
                >
                  Choose Date & Time
                </button>
              </div>
            )}

            {step === 'datetime' && (
              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
                    <Calendar className="h-5 w-5" /> Select Date
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {next7Days.map(date => {
                      const dateStr = format(date, 'yyyy-MM-dd');
                      return (
                        <button
                          key={dateStr}
                          type="button"
                          onClick={() => setSelectedDate(dateStr)}
                          className={`rounded-xl border-2 p-3 text-center transition ${
                            selectedDate === dateStr
                            ? 'border-amber-500 bg-amber-500 text-white'
                              : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-800'
                          }`}
                        >
                          <div className="text-xs font-medium">{format(date, 'EEE')}</div>
                          <div className="text-lg font-bold">{format(date, 'd')}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
                      <Clock className="h-5 w-5" /> Select Time
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-xl border-2 p-3 text-sm font-medium transition ${
                            selectedTime === time
                            ? 'border-amber-500 bg-amber-500 text-white'
                              : 'border-zinc-200 bg-white hover:border-zinc-300 dark:border-white/10 dark:bg-zinc-800'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <button
                    type="button"
                    onClick={() => setStep('payment')}
                    className="w-full rounded-full bg-zinc-900 py-4 font-semibold text-white hover:bg-amber-500 dark:bg-white dark:text-black"
                  >
                    Continue to Payment
                  </button>
                )}
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-zinc-800/50">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-600 dark:text-zinc-400">Service</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">{service.name}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-600 dark:text-zinc-400">Barber</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">{selectedBarber?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-600 dark:text-zinc-400">Date</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">{format(new Date(selectedDate), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Time</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">{selectedTime}</span>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Full Name *"
                  value={customer.name}
                  onChange={(e) => setCustomer({...customer, name: e.target.value })}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email *"
                  value={customer.email}
                  onChange={(e) => setCustomer({...customer, email: e.target.value })}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                />
                <input
                  type="tel"
                  placeholder="Phone *"
                  value={customer.phone}
                  onChange={(e) => setCustomer({...customer, phone: e.target.value })}
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 dark:border-white/10 dark:bg-zinc-800 dark:text-white"
                />

                <button
                  type="button"
                  onClick={handlePay}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-zinc-900 py-4 font-semibold text-white hover:bg-amber-500 dark:bg-white dark:text-black"
                >
                  <CreditCard className="h-5 w-5" />
                  Pay ${service.price} with Paystack
                </button>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10"
                >
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </motion.div>
                <h3 className="mt-6 text-2xl font-bold text-zinc-900 dark:text-white">Appointment Confirmed!</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Ref: <span className="font-semibold">{bookingRef}</span>
                </p>
                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {service.name} with {selectedBarber?.name}<br/>
                  {format(new Date(selectedDate), 'MMM d, yyyy')} at {selectedTime}
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-8 w-full rounded-full border-2 border-zinc-900 py-4 font-semibold hover:bg-zinc-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}