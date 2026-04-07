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


    </main>

  )
}

export default Home