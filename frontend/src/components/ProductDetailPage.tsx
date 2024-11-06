import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

// Mock product data (in a real app, you'd fetch this from an API)


function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        const data = await response.json();
        setProduct(data); 
        setLoading(false); 
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []); 

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart`);
  };

  const handleBuyNow = () => {
    // In a real app, you'd add the product to the cart and redirect to checkout
    navigate('/checkout');
  };

  if(loading) return <>Loading...</>
  else return (
    <div className="min-h-screen bg-gray-100 p-4 ">
      <header className="mb-6">
        <Link to="/products">
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </Link>
      </header>
      <main className=' w-full flex justify-center '>
        <div className="max-w-[870px] bg-white rounded-lg shadow-md overflow-hidden">
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={product.image}
            alt={product.title}
            className="w-full h-dvh"
          />
          <div className="p-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold mb-4"
            >
              {product.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-600 mb-4"
            >
              {product.description}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl font-bold text-purple-600 mb-6"
            >
              ${product.price}
            </motion.p>
            <div className="flex items-center mb-6">
              <label htmlFor="quantity" className="mr-4">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border rounded px-2 py-1 w-16 text-center"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white border border-purple-600 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-50 transition-colors duration-300"
              >
                <ShoppingCartIcon className="h-5 w-5 inline-block mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetailPage;