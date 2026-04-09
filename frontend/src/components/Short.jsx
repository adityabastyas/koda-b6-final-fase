import React from 'react'
import { Link2, Copy, Trash2, Calendar, BarChart3 } from 'lucide-react';

function Short({ links, loading, onDelete }) {
  if (loading) {
  return <p className="text-center py-6">Loading...</p>
}

if (!links.length) {
  return <p className="text-center py-6">Tidak ada data</p>
}
  
  return (
    <div className="max-w-5xl mx-auto px-6 py-4">
      {links.map((item) => {
        const shortLink = item.short_url || `http://localhost:8888/${item.slug}`
        return (
      <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
        
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="text-blue-600" size={18} />
            <a href={shortLink} target='_blank' className="text-blue-600 font-bold text-lg hover:underline">
              {shortLink}
            </a>
          </div>

          <p className="text-gray-500 text-sm mb-4 truncate max-w-md">
            {item.original_url}
          </p>

          <div className="flex items-center gap-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span> {new Date(item.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={14} />
              <span>{item.clicks || 0} Clicks</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigator.clipboard.writeText(item.short_url)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
            <Copy size={20} />
          </button >
          <button onClick={() => onDelete(item.id)} className="p-3 text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={20} />
          </button>
        </div>

      </div>
)})}
    </div>
  )
}

export default Short