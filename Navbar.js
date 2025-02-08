import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white">Logo</div>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-md"
        />
      </div>
    </nav>
  );
}
