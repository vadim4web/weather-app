import axios from 'axios'
import ipDefaultObject from './ipDefaultObject'

const GEO_API_KEY = import.meta.env.VITE_GEO_API_KEY

const getIPInfo = async () => {
  try {
    const response = await axios.get(`https://api.geoapify.com/v1/ipinfo?apiKey=${GEO_API_KEY}`)
    const jsonResponse = response.data
    return jsonResponse
  } catch (error) {
    console.error('Error fetching IP info:', error)
    return ipDefaultObject
  }
}

export default getIPInfo
