import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

interface CartItem {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [productIds, setProductIds] = useState<number[]>([]);
  const navigate = useNavigate();

  // Fetch cart data when the component mounts
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart');
        setProductIds(response.data); // Set the product IDs from the cart response

        if (!response.data) return; // Exit if no product IDs are found

        const fetchedItems: CartItem[] = []; // Store the fetched items temporarily

        // Use for...of to handle async inside the loop
        for (const productId of response.data) {
          const productResponse = await fetch(`http://localhost:5000/products/${productId}`);
          if (productResponse.ok) {
            const product: CartItem = await productResponse.json();
            fetchedItems.push(product); // Add the fetched product to the array
          }
        }

        // After all products are fetched, update the state
        setCartItems(fetchedItems);
      } catch (error) {
        console.error('Failed to fetch cart data:', error);
      }
    };

    fetchCartData();
  }, []); // Empty dependency array to run only on mount

  const updateQuantity = async (id: number, newQuantity: number) => {
    try {
      // Send request to update the quantity of the CartItem
      const response = await axios.put('http://localhost:5000/cart/update', { id, quantity: newQuantity });
      // Update the local state after the successful update
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const removeItem = async (id: number) => {
    try {
      // Send request to remove the CartItem
      await axios.delete('http://localhost:5000/api/cart/remove', { data: { id } });
      // Remove the item from the local state after the successful removal
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
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
                <img src={item.image} alt={`Product ${item.title}`} className="w-20 h-20 object-cover rounded mr-4" />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.title}</h2> {/* Use title instead of productId */}
                  <p className="text-gray-600">${item.price}</p>
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
