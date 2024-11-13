<template>
  <div class="city-weather">
    <div v-if="props.home" class="controls">
        <button
          class="city-weather-remove-city"
          :title="$t('removeCityTip')"
          @click="toggleShowRemoveWarning"
        >
          <span class="remove">❌</span>
        </button>
        <button
          class="city-weather-pin-city"
          :class="{ disabled: isCityInFavorites }"
          :title="isCityInFavorites ? $t('alreadyPinnedTip') : $t('pinCityTip')"
          @click="handlePinCity"
          :disabled="isCityInFavorites"
        >
          <span class="pin" :class="{ 'no-animation': isCityInFavorites }">📌</span>
        </button>
      </div>
      <div v-else>
        <button
          class="city-weather-unpin-city"
          :title="$t('cityUnpinTip')"
          @click="toggleShowUnpinWarning"
        >
          <span class="unpin">📌</span>
        </button>
      </div>

    <line-chart :weather="cityWeather.weather" :displayDays="displayDays" />

    <h3 class="head-title">
      <span class="place-label">{{ $t('city') }}:</span>
      {{ props.home ? $t('cityNames').split('_')[index] :
      $t('cityNamesPinned').split('_')[index] }} |
      <span class="temperature-label">{{ $t('temperature') }}:</span>
      {{ currentTemperature }}{{ cityWeather.weather.current_units.temperature_2m }}
    </h3>

    <warning-error
      v-if="showUnpinWarning"
      type="warning"
      :message="unpinWarningMessage"
      :handler="handleUnpinCity"
      :state="showUnpinWarning"
      :closer="toggleShowUnpinWarning"
    />

    <warning-error
      v-if="showRemoveWarning"
      type="warning"
      :message="removeWarningMessage"
      :handler="handleRemoveCity"
      :state="showRemoveWarning"
      :closer="toggleShowRemoveWarning"
    />

    <warning-error
      v-if="showMaxPinnedError"
      type="error"
      :message="maxPinnedErrorMessage"
      :state="showMaxPinnedError"
      :closer="toggleShowMaxPinnedError"
      :suggestRedirect="true"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, watch, computed } from 'vue'
import LineChart from './LineChart.vue';
import WarningError from './WarningError.vue'
import getLocal from '@/helpers/getLocal'

const props = defineProps(['cityWeather', 'displayDays', 'index', 'home'])
const index = ref(props.index)
const cityWeather = ref(props.cityWeather)
const displayDays = ref(props.displayDays || 1)

const showUnpinWarning = ref(false)
const toggleShowUnpinWarning = () => showUnpinWarning.value = !showUnpinWarning.value
const unpinWarningMessage = getLocal('unpinWarn')
const showRemoveWarning = ref(false)
const toggleShowRemoveWarning = () => showRemoveWarning.value = !showRemoveWarning.value
const removeWarningMessage = getLocal('removeWarn')
const showMaxPinnedError = ref(false)
const toggleShowMaxPinnedError = () => showMaxPinnedError.value = !showMaxPinnedError.value
const maxPinnedErrorMessage = getLocal('maxPinnedErr')

const isCityInFavorites = ref(
  JSON.parse(localStorage.getItem('favorites'))?.some((fav) => fav.city.name === cityWeather.value.city.name) || false
)

const currentTemperature = computed(() => {
  const hourly = cityWeather.value.weather.hourly
  const index = hourly.time.findIndex(t => new Date().toISOString().slice(0, 13) === t.slice(0, 13))

  return hourly.temperature_2m[index]
})

const handlePinCity = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || []

  if (favorites.length === 5) {
    toggleShowMaxPinnedError()

    return
  }

  if (!isCityInFavorites.value) {
    favorites.push({ city: cityWeather.value.city, weather: cityWeather.value.weather })
    localStorage.setItem('favorites', JSON.stringify(favorites))
    isCityInFavorites.value = true
  }
}

const handleUnpinCity = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || []
  const updatedFavorites = favorites.filter((fav) => fav.city.name !== cityWeather.value.city.name)
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  isCityInFavorites.value = false
  toggleShowUnpinWarning()
  window.location.reload()
}

const handleRemoveCity = () => {
  const cities = JSON.parse(sessionStorage.getItem('home')) || []
  const updatedCities = cities.filter((itemToDelete) => itemToDelete.city.name !== cityWeather.value.city.name)
  sessionStorage.setItem('home', JSON.stringify(updatedCities))
  window.location.reload()
}

watch(JSON.parse(localStorage.getItem('favorites')), () => window.location.reload())
</script>

<style lang="scss">
@keyframes pin {
  0% {}
  50% {
    transform: translate(-20%, 20%) scale(0.9);
    filter: sepia(0);
  }
  100% {}
}

@keyframes unpin {
  0% {}
  50% {
    transform: translate(20%, -20%) scale(1.2);
    filter: sepia();
  }
  100% {}
}

@keyframes remove {
  0% {}
  50% {
    transform: scale(0.75);
    filter: sepia();
  }
  100% {}
}

.no-animation {
  animation: none !important;
}

.city-weather {
  margin: 0.5rem;
  width: 68dvw;
  position: relative;
  z-index: 0;

  border-radius: 0.5rem;
  background: linear-gradient(160deg, transparent, var(--grey), var(--background));
  box-shadow: inset 0 0 0.5rem 0.25rem var(--shadow);

  & > div {
    position: absolute;
    padding: 0;
    width: 100%;
    display: flex;
    height: auto;
    align-items: flex-end;
    justify-content: flex-end;
    z-index: 1;

    .controls {
      width: 100%;
      position: absolute;
      top: 0;
      right: 0 !important;
      gap: 0.5rem;
      z-index: 555;

      button {
        position: absolute;
        right: 0;
      }
    }
  }


  &-pin-city.disabled {
    cursor: default;
  }

  &-pin-city,
  &-unpin-city,
  &-remove-city {
    border: none;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-size: 1.75rem;
    line-height: 100%;
    background: linear-gradient(160deg, transparent, var(--grey), var(--background));
    box-shadow: inset 0 0 0.5rem 0.25rem var(--shadow);

    .pin,
    .unpin,
    .remove {
      position: relative;
      padding: 1rem;
    }

    .pin {
      filter: sepia();
      &:hover {
        animation: pin 1.5s;
      }
    }

    .unpin {
      &:hover {
        animation: unpin 1.5s;
      }
    }

    .remove {
      &:hover {
        animation: remove 1.5s;
      }
    }
  }
}

@media (orientation: landscape) {
  .city-weather {
    width: 42dvw;
  }

  .chart {
    position: relative;
    z-index: 0;
    transform-origin: 50% 0;
    transform: scale(0.9, 0.85);
  }
}

@media (orientation: portrait) {
  .city-weather {
    width: 75dvw;
  }

  .chart {
    position: relative;
    z-index: -1;
    transform-origin: 50% 0;
    transform: scale(0.9, 0.85);
  }
}

.place-label,
.temperature-label {
  text-transform: lowercase;
  font-size: 75%;
}

.head-title {
  width: 100%;
  text-align: center;
  letter-spacing: -0.05ch;
  height: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: absolute;
  bottom: 0;
  left: 0;

  padding: 0;
  margin: 0;
  z-index: 15;
}
</style>