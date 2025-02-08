import React, { useState, useEffect } from 'react';

function App() {
  // Sample product data (could also be fetched from an API)
  const productData = [
    { id: 1, name: 'Phone', price: 699, category: 'Electronics', rating: 4, image: 'images/phone.png' },
    { id: 2, name: 'Laptop', price: 1200, category: 'Electronics', rating: 5, image: 'images/laptop.jpeg' },
    { id: 3, name: 'Headphones', price: 150, category: 'Electronics', rating: 4, image: 'images/headphone.png' },
    { id: 4, name: 'Smartwatch', price: 250, category: 'Electronics', rating: 4, image: 'images/smartwatch.png' },
    { id: 5, name: 'T-Shirt', price: 25, category: 'Clothing', rating: 5, image: 'images/tshirt.png' },
    { id: 6, name: 'Jeans', price: 45, category: 'Clothing', rating: 4, image: 'images/jeans.png' },
    { id: 7, name: 'Jacket', price: 80, category: 'Clothing', rating: 4, image: 'images/jacket.png' },
    { id: 8, name: 'Sneakers', price: 60, category: 'Clothing', rating: 5, image: 'images/shoos.png' },
    { id: 9, name: 'Book', price: 15, category: 'Books', rating: 3, image: 'images/book.png' },
    { id: 10, name: 'Notebook', price: 10, category: 'Books', rating: 4, image: 'images/notebook.png' },
    { id: 11, name: 'Magazine', price: 5, category: 'Books', rating: 3, image: 'images/magzzen.png' },
    { id: 12, name: 'E-Reader', price: 130, category: 'Books', rating: 4, image: 'images/ereader.png' },
  ];

  // State variables for products, filters, sorting, and pagination
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 5;

  // Load products from the static data (simulate fetching from JSON)
  useEffect(() => {
    setAllProducts(productData);
  }, []);

  // Filter products based on search, category, and price range
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesMinPrice = minPrice === '' || product.price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || product.price <= parseFloat(maxPrice);
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  // Sort the filtered products by price
  const sortedProducts = filteredProducts.sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  // Pagination: Determine the products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Handlers for filters, sorting, and pagination
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    setCurrentPage(1);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Render star rating (★ for filled, ☆ for unfilled)
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-500' : 'text-gray-300'}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow py-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          {/* Site Logo */}
          <div className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
            MyShop
          </div>
          {/* Search Bar */}
          <div className="w-full md:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded focus:outline-none"
            />
          </div>
        </div>
      </nav>

      {/* Filters Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:space-x-4">
          {/* Category Filter */}
          <div className="mb-4 md:mb-0">
            <label className="block mb-1 font-medium">Category</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              <option value="All">All</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mb-4 md:mb-0">
            <label className="block mb-1 font-medium">Price Range</label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={minPrice}
                onChange={handleMinPriceChange}
                placeholder="Min"
                className="px-4 py-2 border border-gray-300 rounded w-24"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                placeholder="Max"
                className="px-4 py-2 border border-gray-300 rounded w-24"
              />
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block mb-1 font-medium">Sort by Price</label>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 py-6 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {currentProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow rounded">
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
              <div className="flex">{renderStars(product.rating)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <section className="container mx-auto px-4 py-6 flex justify-center items-center space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} MyShop. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
