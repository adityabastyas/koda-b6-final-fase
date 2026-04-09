import React from 'react'
import { useSelector } from "react-redux";

function ShortenForm() {
const [url, setUrl] = React.useState('')
const [loading, setLoading] = React.useState(false)

const [shortUrl, setShowUrl] = React.useState("")

const token = useSelector((state) => state.auth.token); 

const handleSubmit = async (e) => {
e.preventDefault()

if (!url) return alert('url wajib diisi')

try {
setLoading(true)

const res = await fetch('http://localhost:8888/api/links', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'Authorization': `Bearer ${token}`, 
},
body: JSON.stringify({
original_url: url,
}),
})

const result = await res.json()

setShowUrl(result.result.short_url)

console.log(result)
console.log(result.short_url)


if (!res.ok) {
alert(result.message)
return
}

setUrl('') 
} catch (err) {
console.log(err)
alert('error...')
} finally {
setLoading(false)
}
}

return (
  <div>

<form
onSubmit={handleSubmit}
className="bg-white p-4 rounded-xl shadow-xl flex items-center border border-gray-100"
>
<input
type="text"
placeholder="https://very-long-url.com"
value={url}
onChange={(e) => setUrl(e.target.value)}
className="flex-grow px-4 py-2 text-gray-400 focus:outline-none bg-transparent"
/>



<button
type="submit"
disabled={loading}
className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg"
>
{loading ? 'Loading...' : 'Shorten'}
</button>


</form>

<div className='text-center'>
  {shortUrl}
</div>

  </div>

)
}

export default ShortenForm