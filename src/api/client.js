const API_URL = import.meta.env.VITE_API_URL || 'https://api.capturely.co.uk'

export async function getHealth() {
  const res = await fetch(`${API_URL}/health`)  
  const text = await res.text();
  return { status: text };
}