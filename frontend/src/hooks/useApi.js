import { useState, useEffect } from 'react'
import axios from 'axios'

const API_ORIGIN = import.meta.env.VITE_API_URL || ''
const BASE_URL = `${API_ORIGIN}/api`

export function useApi(endpoint, params = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${BASE_URL}${endpoint}`, { params })
      .then((res) => { setData(res.data); setError(null) })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [endpoint, JSON.stringify(params)])

  return { data, loading, error }
}

export const api = {
  post: (endpoint, body) => axios.post(`${BASE_URL}${endpoint}`, body),
}
