import React from 'react'
import Input from '../components/Input'

function Dashboard() {
  return (
    <main>
    <section className="bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">My Links</h2>
            <p className="text-slate-500 mt-1">Manage and track your shortened digital assets.</p>
          </div>
          
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase ">
              Total Active
            </span>
            <h3 className="text-4xl font-black text-blue-600 leading-none mt-1">124</h3>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
          </div>

          <Input
            type="text" 
            placeholder="Search by name or URL..." 
            className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-14 pr-14 text-slate-700 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-slate-300"
          />

          <div className="absolute inset-y-0 right-5 flex items-center text-slate-400 cursor-pointer hover:text-slate-600 transition-colors">
          </div>
        </div>

      </div>
    </section>
    </main>
  )
}

export default Dashboard