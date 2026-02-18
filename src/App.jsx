import { useState } from 'react'

function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setShortUrl('')

    if (!url || !url.startsWith('http')) {
      setError('Please enter a valid URL (starting with http:// or https://)')
      return
  }

    try {
      // Your original encoding logic
      const encodedUrl = encodeURIComponent(url)

      // Points to our proxy in vite.config.js
      const response = await fetch(`/api?url=${encodedUrl}`)

      if (response.ok) {
        const data = await response.text() // TinyURL returns text, not JSON
        setShortUrl(data)
      } else {
        setError('Failed to shorten URL')
      }
    } catch (err) {
      setError('Failed to shorten URL')
    }
  }

  return (
    <div className="container">
      <h1>React URL Shortener</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Shorten</button>
      </form>

      {error && <p className="error">{error}</p>}

      {shortUrl && (
        <div className="result">
          <p>Shortened URL:</p>
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  )
}

export default App