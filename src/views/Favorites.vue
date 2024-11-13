<template>
    <div v-if="isLoaded === true" >
      <div v-if="favorites.length" class="content favorites">
        <CityWeather
          v-for="(cityWeather, index) in favorites"
          :key="index"
          :cityWeather="cityWeather"
          :displayDays="days"
          :index="index"
          />
        </div>
        <div v-else>
          <h2 style="padding: 1rem;">{{ $t('noPinned')}}</h2>
          <router-link to="/">{{ $t('backToHome') }}</router-link>
        </div>

        <days-to-display :less="1" :more="7" storageKey="favsDays" v-if="favorites.length" />
    </div>
    <div v-else class="wrapper">
      <pre-loader />
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import i18n from '@/i18n'
import PreLoader from '@/components/PreLoader.vue'
import CityWeather from '@/components/CityWeather.vue'
import DaysToDisplay from '@/components/DaysToDisplay.vue'
import getWeather from '@/helpers/weatherHelper'
import translateToUkrainian from '@/helpers/translateHelper'

const isLoaded = ref(false)
const days = ref(sessionStorage.getItem('favsDays') || 1)
const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])

const setWeatherAndLoad = async () => {
  isLoaded.value = false

  if (localStorage.getItem('favorites')) {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'))
    const cityNamesEn = storedFavorites.map((item) => item.city.name)
    const cityNamesUkPromises = storedFavorites.map(async (item) => await translateToUkrainian(item.city.name))
    const cityNamesUk = await Promise.all(cityNamesUkPromises)
    i18n.global.messages['en'].cityNamesPinned = cityNamesEn.join('_')
    i18n.global.messages['uk'].cityNamesPinned = cityNamesUk.join('_')

    const currentDate = new Date().toISOString().slice(0, 10)
    const updatedFavorites = storedFavorites.map(async (item) => {
      if (!item.weather || item.weather.current.time.slice(0, 10) !== currentDate) {
        const newWeatherData = await getWeather(item.city.latitude, item.city.longitude)
        item.weather = newWeatherData
      }

      return item
    })

    localStorage.setItem('favorites', JSON.stringify(await Promise.all(updatedFavorites)))
  }

  favorites.value = JSON.parse(localStorage.getItem('favorites')) || []
  isLoaded.value = true
}

onMounted(() => {
  setWeatherAndLoad();
})

watch(JSON.parse(localStorage.getItem('favorites')), () => window.location.reload())
</script>
