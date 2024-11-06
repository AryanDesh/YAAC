import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

function ProductsListingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]); // New state for categories
  const [selectedCategory, setSelectedCategory] = useState(''); // New state for selected category

  // Fetch products based on searchQuery and selectedCategory
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (searchQuery.trim()) {
          response = await axios.post('http://localhost:5000/products/products/search', {
            title: searchQuery,
          });
        } else {
          response = await axios.get('http://localhost:5000/products/');
        }
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, selectedCategory]);

  // Fetch categories when the filter modal is open
  useEffect(() => {
    if (filterOpen) {
      const fetchCategories = async () => {
        try {
          const response = await axios.get('http://localhost:5000/products/filter/categories');
          console.log(response)
        } catch (error) {
          console.error("Failed to fetch categories:", error);
        }
      };
      fetchCategories();
    }
  }, [filterOpen]);

  // useEffect(() => {
  //   if (filterOpen) {
  //     const fetchCategories = async () => {
  //       try {
  //         const response = await axios.get(`http://localhost:5000/products/filter/category/${selectedCategory}`);
  //         setCategories(response.data);
  //       } catch (error) {
  //         console.error("Failed to fetch categories:", error);
  //       }
  //     };
  //     fetchCategories();
  //   }
  // }, [filterOpen]);

  const categorySearch = async() => {
      const responseCat = await axios.get(`http://localhost:5000/products/filter/category/${selectedCategory}`);
      setProducts(responseCat.data);
  }


  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-6">
        <Link to="/">
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </header>
      
      <main>
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid px-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link to={`/products/${product.id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
                    <img src={product.image} alt={product.title} className="w-full h-58 object-cover" />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                      <p className="text-purple-600 font-bold">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              </motion.div> 
            ))}
          </div>
        )}
      </main>

      {filterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Filter Products</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                setFilterOpen(false)
                categorySearch();
              }}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsListingPage;
