import React from 'react'

function Navbar() {
  return (
    <nav className="w-full bg-gray-100 px-6 py-3 flex items-center justify-between shadow-sm">
      
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-gray-900">ShortLink</h1>

        <ul className="flex gap-6 text-gray-600 font-medium">
          <li className="hover:text-blue-600 border cursor-pointer">
            Dashboard
          </li>
          <li className="hover:text-blue-600 cursor-pointer">Analytics</li>
          <li className="hover:text-blue-600 cursor-pointer">Links</li>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-700 hover:text-blue-600 font-medium">
          Login
        </button>
        <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700">
          Logout
        </button>
      </div>
    </nav>
  );
  
}

export default Navbar