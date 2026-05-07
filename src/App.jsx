import { useEffect, useState } from 'react'
import ApiButton from './Button'
import { getHealth } from './api/client'

export default function App() {
  const [status, setStatus] = useState('loading...')

  useEffect(() => {
    getHealth()
      .then((res) => setStatus(res.status))
      .catch(() => setStatus('backend offline'))
  }, [])

  return (
    <div className="container">
      <h1>Speak no evil</h1>
      <h2>See no evil</h2>
      <p>Backend status: {status}</p>
      < ApiButton />
    </div>
  )
}