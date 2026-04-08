import React from 'react'

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
          <img src="48" alt="48" className="text-gray-300 rotate-45" />
          <div className="absolute -top-2 -right-2 bg-blue-600 p-2 rounded-lg shadow-lg text-white">
            <img src="20" alt="20" />
          </div>
        </div>
      </div>

      <div className="text-center max-w-md mb-10">
        <h1 className="text-5xl font-black text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-500 leading-relaxed">
          The page you're looking for doesn't exist. It may have been moved, deleted, or the link might be broken.
        </p>
      </div>

      <div className="flex flex-row gap-4 mb-20">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-100 flex items-center gap-2 transition-all">
          <img src="18" alt="18
          " />
          Go to Dashboard
        </button>
        <button className="bg-white hover:bg-gray-50 text-blue-600 border border-gray-100 font-bold py-3 px-8 rounded-xl shadow-sm transition-all flex items-center gap-2">
          Report an Issue
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-blue-600 mb-4"><img src="24" alt="24" /></div>
          <h4 className="font-bold text-gray-900 mb-2">Check Analytics</h4>
          <p className="text-gray-500 text-xs leading-relaxed">Track your active links and traffic sources in real-time.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-blue-600 mb-4"><img src="24" alt="24" /></div>
          <h4 className="font-bold text-gray-900 mb-2">New ShortLink</h4>
          <p className="text-gray-500 text-xs ">Create a brand new architected URL in seconds.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-blue-600 mb-4"><img src="24" alt="24" /></div>
          <h4 className="font-bold text-gray-900 mb-2">Developer API</h4>
          <p className="text-gray-500 text-xs ">Integrate our link infrastructure into your apps.</p>
        </div>

      </div>

    </div>
  )
}

export default NotFound