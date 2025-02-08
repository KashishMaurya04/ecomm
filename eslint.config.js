import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productData from './data/products.json'; // Importing product data from JSON

function App() {
  const [products, setProducts] = useState([]);

  // Load products from the JSON file when the component mounts
  useEffect(() => {
    setProducts(productData);
  }, []);

  // Handler for adding a product to the cart
  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">MyShop</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#home" className="text-gray-600 hover:text-gray-800">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-600 hover:text-gray-800">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-gray-800">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-gray-800">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to MyShop</h2>
          <p className="text-xl mb-8">Discover our exclusive collection of products</p>
          <a
            href="#products"
            className="bg-white text-blue-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-200"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 flex-grow">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-10">Our Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
                  <p className="text-gray-600 mb-4">${product.price}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
        </div>
      </footer>

      {/* Toast Notifications */}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
