import React from 'react'
import { Link2, Copy, Trash2, Calendar, BarChart3 } from 'lucide-react';

function Short() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
        
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="text-blue-600" size={18} />
            <a href="#" className="text-blue-600 font-bold text-lg hover:underline">
              shrt.lnk/aB3x9
            </a>
          </div>

          <p className="text-gray-500 text-sm mb-4 truncate max-w-md">
            https://www.architecturaldigest.com/story/modern-mini...
          </p>

          <div className="flex items-center gap-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>Oct 24, 2023</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={14} />
              <span>1.2K Clicks</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
            <Copy size={20} />
          </button>
          <button className="p-3 text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>

      </div>
    </div>
  )
}

export default Short