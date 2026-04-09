import React from 'react'

function ShortenResult({ data }) {
if (!data) return null

const handleCopy = () => {
navigator.clipboard.writeText(data.short_url)
alert('copied...')
}

return (
<div className="mt-6 bg-white p-4 rounded-xl shadow-md border">
<p className="text-sm text-gray-500 mb-2">Your short link:</p>

<div className="flex items-center justify-between gap-2">
<a
href={data.short_url}
target="_blank"
className="text-blue-600 font-semibold break-all"
>
{data.short_url}
</a>

<div className="flex gap-2">
<button
onClick={handleCopy}
className="bg-gray-100 px-3 py-1 rounded"
>
Copy
</button>

<a
href={data.short_url}
target="_blank"
className="bg-blue-600 text-white px-3 py-1 rounded"
>
Visit
</a>
</div>
</div>
</div>
)
}

export default ShortenResult
