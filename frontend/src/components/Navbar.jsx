import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  const [open, setOpen] = React.useState(false)

  return (
    <nav className="w-full bg-gray-100 px-6 py-3 shadow-sm">
      
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-gray-900">
            <Link to="/">ShortLink</Link>
          </h1>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex gap-6 text-gray-600 font-medium">
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to="analytics">Analytics</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to="create-link">Links</Link>
            </li>
          </ul>
        </div>

        {/* RIGHT (DESKTOP) */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
            Login
          </Link>
          <Link to="/" className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700">
            Logout
          </Link>
        </div>

        {/* HAMBURGER */}
        <button 
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-gray-600 font-medium">
          <Link to="/" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="analytics" onClick={() => setOpen(false)}>Analytics</Link>
          <Link to="create-link" onClick={() => setOpen(false)}>Links</Link>

          <hr />

          <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
          <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-md w-fit" onClick={() => setOpen(false)}>
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar