<template>
  <div class="days-to-display">
    <button
      :class="{ active: days == less }"
      @click="setDays(less)"
      :title="$t('chartHourlyTip')"
    >
      {{$t('daysButtonHourly')}}
    </button>
    <button
      :class="{ active: days == more }"
      @click="setDays(more)"
      :title="$t('chartDailyTip').replace('__', more)"
    >
      {{ more + ' ' + $t('daysButtonDaily') }}
    </button>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from 'vue'

const { less, more, storageKey } = defineProps(['less', 'more', 'storageKey'])
const days = ref(sessionStorage.getItem(storageKey) || 1)

const setDays = (value) => {
  if (value == sessionStorage.getItem(storageKey)) return
  days.value = value
}

onMounted(() => sessionStorage.setItem(storageKey, days.value))

watch(days, (newValue) => {
  sessionStorage.setItem(storageKey, newValue)
  window.location.reload()
})
</script>

<style lang="scss">
.days-to-display {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 16dvw;

  button {
    border: none;
    cursor: pointer;
    font-size: 2rem;
    background: linear-gradient(160deg, transparent, var(--grey), var(--background));
    box-shadow: inset 0 0 0.5rem 0.25rem var(--shadow);
    color: var(--text8);
    padding: 1rem;
    transition: all 0.5s;

    &:hover {
      background: linear-gradient(-20deg, transparent, var(--grey), var(--background));
      box-shadow: inset 0 0 0.5rem 0.5rem var(--shadow);
      color: var(--color);
    }

    &.active {
      background-color: var(--grey);
      box-shadow: inset 0 0 0.75rem 0.5rem var(--shadow);
      color: var(--color);
    }
  }

  button:first-of-type {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  button:last-of-type {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
}

@media (max-width: 768px) {
  .days-to-display button {
    font-size: 1.25rem;
  }
}

@media (orientation: landscape) {
  .days-to-display {
    top: 41.5%;
    right: 1dvw;
    font-size: 50%;
    width: 10dvw;
  }
}

@media (orientation: portrait) {
  .days-to-display {
    top: 46.75%;
    right: 1rem;
    width: 16dvw;
  }
}
</style>