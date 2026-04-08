import React from 'react'

function Home() {
  return (
    <main>

    <section className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 font-sans">
      
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Shorten URLs. <span className="text-blue-600">Share Easily.</span>
        </h1>
        <p className="text-gray-600 max-w-2xl text-lg md:text-xl l">
          Create short, memorable links for your team communications. 
          Transform long, cumbersome URLs into powerful digital assets that drive engagement.
        </p>
      </div>

      <div className="flex flex-row gap-4 mb-16">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-200">
          Get Started
        </button>
        <button className="bg-gray-100 hover:bg-gray-200 text-blue-700 font-semibold py-3 px-8 rounded-lg transition duration-200">
          Learn More
        </button>
      </div>

      <div className="w-full max-w-3xl">
        <div className="bg-white p-4 rounded-xl shadow-xl flex items-center border border-gray-100">
          <div className="pl-3 text-gray-400">
          </div>
          
          <input 
            type="text" 
            placeholder="https://very-long-architectural-url.com/asset-id-99238-x1" 
            className="flex-grow px-4 py-2 text-gray-400 focus:outline-none bg-transparent"
          />
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-10 rounded-lg transition duration-200">
            Shorten
          </button>
        </div>
      </div>

    </section>


    <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-12">
          <p className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2">
            Architectural Features
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Built for Enterprise Precision
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            
              <img src="1" alt="1" />
              
            <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Create</h3>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Instantly generate high-performance short links with a single click or through our surgical API endpoints.
            </p>
            <div className="h-1 w-10 bg-blue-200 rounded-full"></div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
           
             <img src="2" alt="2" />
              
            <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Slugs</h3>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Maintain brand authority with readable, custom link endings that resonate with your digital audience.
            </p>
            <div className="h-1 w-10 bg-indigo-200 rounded-full"></div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            
              <img src="3" alt="3" />
              
            <h3 className="text-xl font-bold text-gray-900 mb-3">Team Ready</h3>
            <p className="text-gray-500 mb-6 text-sm leading-relaxed">
              Collaborate across departments with shared workspaces, permissions, and unified analytics dashboards.
            </p>
            <div className="h-1 w-10 bg-orange-200 rounded-full"></div>
          </div>

        </div>
      </div>
    </section>

    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        <div className="w-full md:w-1/2">
          <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-2xl aspect-video md:aspect-square flex items-center justify-center">
            <img src="g" alt="g" />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <p className="text-blue-600 font-bold text-xs mb-3">
            DATA DRIVEN INSIGHTS
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 ">
            Observe your link architecture in real-time.
          </h2>
          <p className="text-gray-500 mb-8 ">
            Every click is a data point. Our dashboard provides surgical precision into 
            where your traffic originates, who is engaging, and how your team 
            communications are performing across the globe.
          </p>

          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-gray-800 font-semibold">
              
              Geographic Distribution Maps
            </li>
            <li className="flex items-center gap-3 text-gray-800 font-semibold">
             
              Device & Browser Breakdown
            </li>
            <li className="flex items-center gap-3 text-gray-800 font-semibold">
             
              UTM Parameter Tracking
            </li>
          </ul>
        </div>

      </div>
    </section>


    </main>

  )
}

export default Home