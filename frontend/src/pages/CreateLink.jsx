import React from 'react'
import { useSelector } from 'react-redux'


function CreateLink() {
  const [url, setUrl] = React.useState("")
  const [slug, setSlug] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const token = useSelector((state) => state.auth.token)

  const handleCreate = async () => {
  if (!url) return alert("URL wajib diisi")

  try {
    setLoading(true)
    
    const body = {
      original_url: url,
      ...(slug && { slug }),
    }

    const res = await fetch("http://localhost:8888/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })

    const result = await res.json()

    if (!res.ok) {
      alert(result.message)
      return
    }

    alert("Link berhasil dibuat")

    setUrl("")
    setSlug("")

  } catch (err) {
    console.log(err)
    alert("error create link")
  } finally {
    setLoading(false)
  }
}
  return (
    <main>
      <section className="bg-gray-50 min-h-screen py-12 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        
        <button className="flex items-center gap-2 text-blue-600 font-bold mb-8 hover:text-blue-700 transition-colors">
          <img src="f" alt="f" />
          Back to Dashboard
        </button>
        
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Create New Short Link</h2>
          <p className="text-slate-500 font-medium">Transform your long URLs into clean, manageable assets.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 mb-12">
          
          <div className="mb-8">
            <label className="block text-[10px] font-black text-slate-400 uppercase  mb-4">
              Destination URL <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center text-slate-300 group-focus-within:text-blue-500 transition-colors">
                <img src="w" alt="w" />
              </div>
              <input 
                type="text" 
                placeholder="https://example.com/your-long-url-here" 
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all placeholder:text-slate-300"
              />
            </div>
            <p className="text-[11px] text-slate-400 italic mt-3 ml-1">Ensure your URL starts with http:// or https://</p>
          </div>

          <div className="mb-8">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Custom Slug (Optional)
            </label>
            <div className="flex group">
              <div className="bg-slate-100 border border-r-0 border-slate-200 rounded-l-2xl px-5 flex items-center text-slate-400 font-semibold text-sm">
                short.link/
              </div>
              <input 
                type="text" 
                placeholder="my-custom-slug" 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full border border-slate-200 rounded-r-2xl py-5 px-5 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all placeholder:text-slate-200"
              />
            </div>
            <p className="text-[11px] text-slate-400 italic mt-3 ml-1">Leave blank to generate a random unique identifier.</p>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mb-10 flex items-start gap-4">
            <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600">
              <img src="l" alt="l" />
            </div>
            <div>
              <p className="text-[10px] font-black text-blue-600 uppercase  mb-1">Live Preview</p>
              <p className="text-slate-700 font-semibold">
                Your short link will be: <span className="text-blue-600 underline">http://localhost:8888/{slug || "random-slug"}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button onClick={handleCreate}
              disabled={loading}  className="bg-blue-600 hover:bg-blue-700 text-white font-black py-5 px-10 rounded-2xl shadow-xl shadow-blue-100 flex items-center gap-3 transition-all active:scale-95">
              {loading ? "Loading..." : "Create Link"} <img src="j" alt="j" />
            </button>
            <button className="text-slate-400 font-bold hover:text-slate-600 transition-colors">
              Cancel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
          <div className="flex gap-5">
            <div className="bg-orange-100 p-3.5 rounded-2xl h-fit text-orange-600">
              <img src="l" alt="l" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Real-time Analytics</h4>
              <p className="text-slate-500 text-sm ">Track every click, geographical location, and referral source instantly.</p>
            </div>
          </div>
          
          <div className="flex gap-5">
            <div className="bg-indigo-100 p-3.5 rounded-2xl h-fit text-indigo-600">
              <img src="f" alt="f" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Auto-generated QR</h4>
              <p className="text-slate-500 text-sm l">Every link automatically creates a high-resolution QR code for print.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
    </main>
  )
}

export default CreateLink