import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
            <nav className="bg-[#F8FAFD] text-gray-700 md:h-16 px-4 border-t border-t-black/10 flex justify-between items-center gap-4 shadow">
                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 w-full">
                    <div className="copyright text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                        <span>© 2026 Infinity Shortcut.</span>
                    </div>
                    <ul className="flex flex-col md:flex-row justify-evenly items-center gap-4">
                        <li>
                          <Link to="/" className="text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase  transition-colors">Privacy Policy</Link>
                        </li>
                        <li>
                          <Link to="/" className="text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase transition-colors">Terms of Service</Link>
                          </li>
                        <li>
                          <Link to="/" className="text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase  transition-colors">API Documentation</Link>
                          </li>
                        <li>
                          <Link to="/" className="text-[11px] font-black text-slate-400 hover:text-blue-600 uppercase  transition-colors">Support</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </footer>
  )
}

export default Footer