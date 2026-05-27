// src/components/Footer.jsx
import React from 'react'
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({ name: '', message: '' });

  const handleNewsletter = (e) => {
    e.preventDefault();
    toast.success('Subscribed! Check your inbox 💌');
    setEmail('');
  };

  const handleContact = (e) => {
    e.preventDefault();
    toast.success('Message sent! We’ll reply within 24h');
    setFormData({ name: '', message: '' });
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      {/* Contact Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Info */}
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white lg:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Questions about services or products? We’re here to help you glow.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10">
                  <Phone className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Phone</p>
                  <p className="text-zinc-600 dark:text-zinc-400">+233 24 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10">
                  <Mail className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Email</p>
                  <p className="text-zinc-600 dark:text-zinc-400">hello@auraglow.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10">
                  <MapPin className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <p className="font-semibold text-zinc-900 dark:text-white">Location</p>
                  <p className="text-zinc-600 dark:text-zinc-400">East Legon, Accra, Ghana</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <form onSubmit={handleContact} className="space-y-4">
            <div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Your Name"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
              />
            </div>
            <div>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                placeholder="Your Message"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 py-3 font-semibold text-white transition hover:bg-rose-500 hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-black dark:hover:bg-rose-500 dark:hover:text-white"
            >
              <Send className="h-4 w-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-rose-500" />
                <span className="text-xl font-bold text-zinc-900 dark:text-white">Aura Glow</span>
              </div>
              <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                Elevating beauty through expert hair care, premium products, and personalized service.
              </p>
              
              {/* Newsletter */}
              <form onSubmit={handleNewsletter} className="mt-6 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 outline-none focus:border-rose-500 dark:border-white/10 dark:bg-zinc-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 dark:bg-white dark:text-black dark:hover:bg-rose-500 dark:hover:text-white"
                >
                  Join
                </button>
              </form>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                {['Services', 'Products', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => scrollTo(link.toLowerCase())}
                      className="text-sm text-zinc-600 transition hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-400"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">Follow Us</h3>
              <div className="mt-4 flex gap-3">
                {[FaInstagram, FaFacebookF, FaTwitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-200 text-zinc-700 transition hover:bg-rose-500 hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-rose-500 dark:hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-zinc-200 pt-8 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            <p>© 2026 Aura Glow. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}