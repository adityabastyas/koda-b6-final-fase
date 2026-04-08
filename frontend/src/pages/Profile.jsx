import React from 'react'

function Profile() {
  const [enabled, setEnabled] = React.useState(false);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <p className="text-[10px] font-black text-slate-400 uppercase  mb-6">
        Account Management
      </p>

      <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-10 relative overflow-hidden">
        
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <img 
                  src="profile" 
                  alt="profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-2 -right-2 bg-white border border-slate-200 p-1.5 rounded-lg shadow-sm text-blue-600 ">
                <img src="14" alt="14" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Alex Thompson</h2>
              <p className="text-slate-500 font-medium">Product Architect at Digital Flow</p>
            </div>
          </div>
          <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase  border border-blue-100">
            Pro Member
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
            <p className="text-[10px] font-black text-slate-400 uppercase  mb-2 flex items-center gap-2">
              <img src="24" alt="24" /> Email Address
            </p>
            <p className="text-slate-700 font-bold">user@example.com</p>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
            <p className="text-[10px] font-black text-slate-400 uppercase  mb-2 flex items-center gap-2">
              <img src="12" alt="12" /> Account Tenure
            </p>
            <p className="text-slate-700 font-bold">Member since: January 1, 2026</p>
          </div>
        </div>

        <div className="bg-blue-600 rounded-2xl p-6 mb-10 flex items-center justify-between shadow-lg shadow-blue-100">
          <div className="flex items-center gap-5 text-white">
            <div className="bg-blue-500/50 p-3 rounded-xl">
              <img src="24" alt="24" />
            </div>
            <div>
              <p className="text-[10px] font-black opacity-70 uppercase  mb-1">Active Assets</p>
              <p className="text-3xl font-black">12</p>
            </div>
          </div>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-xl border border-blue-400/50 flex items-center gap-2 transition-all">
            View Links <img src="16" alt="16" />
          </button>
        </div>

        <div className="space-y-6 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-slate-600">
              <img src="20" alt="20" />
              <span className="font-bold">Email Notifications</span>
            </div>
            
            <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
      />

      <div
        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            enabled ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
    </label>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-slate-600">
              <img src="20" alt="20" />
              <span className="font-bold">Two-Factor Authentication</span>
            </div>
            <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Disabled</span>
          </div>
        </div>

        <button className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-100 py-4 rounded-2xl font-bold text-slate-500 flex items-center justify-center gap-2 transition-all">
          <img src="18" alt="18" />  Logout Session
        </button>

      </div>

      <p className="mt-8 text-[10px] text-slate-400 font-medium">
        Your data is encrypted using AES-256 standards. <span className="text-blue-600 cursor-pointer underline">Privacy Policy</span>
      </p>
    </div>
  )
}

export default Profile