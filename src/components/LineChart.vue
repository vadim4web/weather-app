<template>
    <Line :data="data" :options="options" class="chart" />
</template>

<script setup>
import { ref, defineProps } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import getAveragesT from '@/helpers/getAveragesT'
import i18n from '@/i18n'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const { weather, displayDays } = defineProps(['weather', 'displayDays'])

const locale = localStorage.getItem('lang')

const mainLabel = +displayDays === 1
  ? i18n.global.messages[locale]['chartLabelHours']
  : i18n.global.messages[locale]['chartLabelDays'].replace('__', displayDays)

const times = weather.hourly.time

const hours = times.slice(0, 24).map(h => h.slice(-5))
const days7 = Array.from(new Set(times.map(h => h.slice(5, 10))))
const days5 = days7.slice(0, 5)
const labelsToDisplay = +displayDays === 1 ? hours : +displayDays === 5 ? days5 : days7

const temperatures = weather.hourly.temperature_2m

const temperatures1 = temperatures.slice(0, 24)
const temperatures7 = getAveragesT(temperatures)
const temperatures5 = temperatures7.slice(0, 5)

const temperaturesToDisplay = +displayDays === 1 ? temperatures1 : +displayDays === 5 ? temperatures5 : temperatures7

const data = ref({
  labels: labelsToDisplay,
  datasets: [
    {
      label: mainLabel,
      backgroundColor: '#ff00ff',
      data: temperaturesToDisplay
    }
  ]
})

const options = ref({
  responsive: true,
  maintainAspectRatio: false
})
</script>