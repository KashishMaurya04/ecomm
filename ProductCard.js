import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
      <div className="text-lg font-semibold">{product.name}</div>
      <div className="text-gray-700">${product.price}</div>
      <div className="text-yellow-500">Rating: {product.rating}</div>
    </div>
  );
}
