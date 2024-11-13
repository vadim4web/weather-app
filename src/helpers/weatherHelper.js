import axios from 'axios'

const getWeather = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset`
      )
    const jsonResponse = response.data

    return jsonResponse
  } catch (error) {
    console.error('Error fetching IP info:', error)

    return null
  }
}

export default getWeather