import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Mock order data (in a real app, you'd get this from your cart state)
const orderItems = [
  { id: 1, name: 'Product 1', price: 19.99, quantity: 2 },
  { id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
];

function CheckoutPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failure' | null>(null);

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayNow = () => {
    setIsPaymentModalOpen(true);
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus(Math.random() > 0.5 ? 'success' : 'failure');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-6">
        <Link to="/cart">
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </Link>
      </header>
      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
          </form>
        </div>
        <button
          onClick={handlePayNow}
          className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
        >
          Pay Now
        </button>
      </main>

      <AnimatePresence>
        {isPaymentModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Payment Status</h2>
              {paymentStatus === null ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin"></div>
                  <p className="mt-4 text-lg">Processing payment...</p>
                </div>
              ) : paymentStatus === 'success' ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-green-500">Payment Successful!</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <p className="mt-4 text-lg font-semibold text-red-500">Payment Failed</p>
                </div>
              )}
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="mt-6 w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CheckoutPage;