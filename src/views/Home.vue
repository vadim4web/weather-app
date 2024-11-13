<template>
  <div v-if="isLoaded === true" class="content-wrapper">
    <div  class="content cities">
        <CityWeather
          v-for="(cityWeather, index) in storedData"
          :key="index"
          :cityWeather="cityWeather"
          :displayDays="days"
          :index="index"
          :home="true"
        />

        <autocomplete-input />

    </div>

    <days-to-display :less="1" :more="5" storageKey="homeDays" v-if="storedData.length" />
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
import AutocompleteInput from '@/components/AutocompleteInput.vue'
import DaysToDisplay from '@/components/DaysToDisplay.vue'
import getIPInfo from '@/helpers/ipInfoHelper'
import getWeather from '@/helpers/weatherHelper'
import translateToUkrainian from '@/helpers/translateHelper'
import { extractCurrentCity } from '@/helpers/extractCity'

const isLoaded = ref()
const days = ref(sessionStorage.getItem('homeDays') || 1)
const storedData = ref(JSON.parse(sessionStorage.getItem('home')))

const setDefaultLanguageAndWeather = async () => {
  isLoaded.value = false

  if (!sessionStorage.getItem('home')) {
    const ipInfo = await getIPInfo()
    const currentCity = extractCurrentCity(ipInfo)
    const weather = await getWeather(currentCity.latitude, currentCity.longitude)
    sessionStorage.setItem('home', JSON.stringify([{ city: currentCity, weather }]))
    i18n.global.messages['en'].cityNames = currentCity.name
    i18n.global.messages['uk'].cityNames = await translateToUkrainian(currentCity.name)
  } else {
    const home = JSON.parse(sessionStorage.getItem('home'))
    const cityNamesEn = home.map(item => item.city.name)
    const cityNamesUkPromises = home.map(async (item) => await translateToUkrainian(item.city.name))
    const cityNamesUk = await Promise.all(cityNamesUkPromises)
    i18n.global.messages['en'].cityNames = cityNamesEn.join('_')
    i18n.global.messages['uk'].cityNames = cityNamesUk.join('_')
  }

  storedData.value = (JSON.parse(sessionStorage.getItem('home')))
  setTimeout(() => isLoaded.value = true, 0)
};

onMounted(() => {
  setDefaultLanguageAndWeather()
})

watch(JSON.parse(sessionStorage.getItem('home')), () => window.location.reload())
</script>