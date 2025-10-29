import { useState, useEffect } from 'react'

function TrendingAPIComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTrendingCollections = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImM2NzFjZWU3LWNjMDctNDMyZS05ZGVlLTA2YmI1ZjM4MGNkMiIsIm9yZ0lkIjoiNDc3OTczIiwidXNlcklkIjoiNDkxNzM4IiwidHlwZUlkIjoiZDI2ODY4MjItMmRjNC00YjkzLTkyN2MtMzM3ZWI3M2MxZmQ2IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NjE0Nzk4OTQsImV4cCI6NDkxNzIzOTg5NH0.zStYx3sMY3AvX7AZ0hkh5fEf5zUxY07qidRt6v4RAnA'
      }
    }

    try {
      const response = await fetch('https://deep-index.moralis.io/api/v2.2/market-data/nfts/top-collections', options)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      setData(result)
      console.log(result);      
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingCollections()
  }, [])

  if (loading) return <div>Loading NFT Collections...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="api-container">
      <h2>Top NFT Collections</h2>
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}

export default TrendingAPIComponent