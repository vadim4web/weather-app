<template>
  <div class="add-city flex-center-center">
    <GoogleAutocomplete
      :api-key="API_KEY"
      @set="setCityToAdd"
      :placeholder="'🔍' + $t('autocomplete')"
    />
    <button class="add-city-button" ref="addButtonRef" @click="handleAddLocation" :title="$t('addCityTip')">+</button>

    <warning-error
      v-if="showMaxListedError"
      type="error"
      :message="maxListedErrorMessage"
      :state="showMaxListedError"
      :closer="toggleShowMaxListedError"
    />
    <warning-error
      v-if="showAlreadyInListError"
      type="error"
      :message="alreadyInListErrorMessage"
      :state="showAlreadyInListError"
      :closer="toggleShowAlreadyInListError"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { GoogleAutocomplete } from 'vue3-google-autocomplete'
import WarningError from './WarningError.vue'
import { extractCity } from '@/helpers/extractCity'
import getWeather from '@/helpers/weatherHelper'
import getLocal from '@/helpers/getLocal'

const API_KEY = computed(() => import.meta.env.VITE_GMAPS_API_KEY)
const cityToAdd = ref()
const addButtonRef = ref(null)

const showMaxListedError = ref(false)
const toggleShowMaxListedError = () => showMaxListedError.value = !showMaxListedError.value
const maxListedErrorMessage = getLocal('maxListedErr')
const showAlreadyInListError = ref(false)
const toggleShowAlreadyInListError = () => showAlreadyInListError.value = !showAlreadyInListError.value
const alreadyInListErrorMessage = getLocal('inListErr')

const setCityToAdd = (location) => {
  console.log('Received payload:', location)
  cityToAdd.value = extractCity(location)
}

const handleAddLocation = async () => {
  const cites = JSON.parse(sessionStorage.getItem('home')) || []

  if (cites.length === 5) {
    toggleShowMaxListedError()
    document.querySelector('.pac-target-input').value = ''

    return
  }

  if (cites.some(c => c.city.name === cityToAdd.value.name)) {
    toggleShowAlreadyInListError()
    document.querySelector('.pac-target-input').value = ''

    return
  }

  const weatherToAdd = await getWeather(cityToAdd.value.latitude, cityToAdd.value.longitude)
  sessionStorage.setItem(
    'home',
    JSON.stringify([...cites, { city: cityToAdd.value, weather: weatherToAdd }])
  )
  document.querySelector('.pac-target-input').value = ''
  window.location.reload()
}

onMounted(() => {
  const toggleHoverStyle = (e) => {
    const inputValue = e.target.value
    const buttonElement = document.querySelector('.add-city-button')

    if (inputValue.trim() === '') {
      buttonElement.classList.remove('hover-style')
    } else {
      buttonElement.classList.add('hover-style')
    }
  }

  document.querySelector('.add-city>input').addEventListener('input', toggleHoverStyle)
})
</script>

<style lang="scss">
.pac-target-input {
  display: block;
  height: 4rem !important;
  width: 100%;
  position: relative;
  padding-top: 0.5rem !important;
  padding-left: 1rem !important;
  font-size: 2rem !important;
  line-height: 100%;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  background-color: var(--background);
  color: var(--color);
  border: none;
  box-shadow: inset 0 0 0.5rem 0.25rem var(--shadow);
  background-color: var(--grey);
}

.pac-target-input::placeholder {
  position: absolute;
  display: block;
  top: 0.5rem;
  left: 1rem;
  font-size: 2rem;
  line-height: 100%;
  width: 100%;
}

.pac-target-input:focus {
  border: none;
  outline: none;
  background-color: var(--background);
}

.add-city {
  margin-top: 2rem;
  position: relative;
  border-radius: 0.5rem;
  padding: 1rem;
  background: linear-gradient(160deg, transparent, var(--grey), var(--background));
  box-shadow: inset 0 0 0.5rem 0.25rem var(--shadow);

  &-button {
    height: 4rem;
    width: 4rem;
    font-size: 3rem;
    border: none;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background: linear-gradient(160deg, transparent, var(--grey), var(--background));
    box-shadow: inset 0 0 0.5rem 0.25rem var(--shadow);
    color: var(--gray);

    &.hover-style:hover {
      background: linear-gradient(-20deg, transparent, var(--grey), var(--background));
      box-shadow: inset 0 0 0.5rem 0.5rem var(--shadow);
      color: var(--color);
    }
  }
}


@media (orientation: landscape) {
  .add-city {
    margin: 0.5rem;
    position: relative;
    width: 42dvw;
    height: 19.5rem;
  }
}

@media (orientation: portrait) {
  .add-city {
    margin: 0.5rem;
    width: 75dvw;
    height: 5rem;
  }
}
</style>