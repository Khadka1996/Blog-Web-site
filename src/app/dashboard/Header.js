'use client';

import { useState } from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality here
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between shadow-md">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex flex-grow max-w-lg items-center bg-gray-800 p-2 rounded-md">
        <input
          type="text"
          className="bg-transparent outline-none text-white px-2 flex-grow"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="p-2">
          <FaSearch size={20} />
        </button>
      </form>
      
      {/* Icons Section */}
      <div className="flex items-center space-x-4">
        <button className="relative p-2">
          <FaBell size={22} />
          {/* Notification Badge (Optional) */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white px-1.5 rounded-full">3</span>
        </button>
        <button className="p-2">
          <FaUserCircle size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
