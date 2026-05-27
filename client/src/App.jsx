import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home.jsx';
import Cart from './components/Cart';
import { Toaster } from 'sonner';

function App() {
  return (
    <BrowserRouter> {/* This was missing */}
      <ThemeProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/barbershop" element={<Home />} />
          </Routes>
          <Cart />
          <Toaster position="top-center" richColors />
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;