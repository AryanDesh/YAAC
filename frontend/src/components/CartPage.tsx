import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline';

// Mock cart data (in a real app, you'd manage this with state management like Redux or Zustand)
const initialCartItems = [
  { id: 1, name: 'Product 1', price: 19.99, quantity: 2, image: '/placeholder.svg' },
  { id: 2, name: 'Product 2', price: 29.99, quantity: 1, image: '/placeholder.svg' },
];

function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const navigate = useNavigate();

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6">
        <Link to="/products">
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </Link>
      </header>
      <main>
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center"
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-500">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
            <div className="mt-6">
              <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
              <button
                onClick={handleCheckout}
                className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default CartPage;