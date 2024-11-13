<template>
  <button
    @click="toggleTheme"
    class="theme-toggler"
    :title="$t('toggleThemeTip')"
  >
    {{ themeIcon }}
  </button>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const theme = ref('light')
const themeIcon = ref('')

const toggleTheme = () => {
  const newTheme = theme.value === 'light' ? 'dark' : 'light'
  themeIcon.value = newTheme === 'light' ? '🌚' : '🌞'
  theme.value = newTheme
  localStorage.setItem('theme', newTheme)
}

watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
})

onMounted(() => {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const savedTheme = localStorage.getItem('theme') || (prefersDarkMode ? 'dark' : 'light')
  theme.value = savedTheme
  document.documentElement.setAttribute('data-theme', savedTheme)
  themeIcon.value = savedTheme === 'light' ? '🌚' : '🌞'
})
</script>

<style>
[data-theme="dark"] {
  --background: #000;
  --gray: #ccc;
  --grey: #8884;
  --color: #fff;
  --shadow: #fff4;
  --text8: #fff8;

  transition: color 1s, background 1s, backgroundColor 1s, boxShadow 1s;
  -webkit-transition: color 1s, background 1s, backgroundColor 1s, boxShadow 1s;
  -moz-transition: color 1s, background 1s, backgroundColor 1s, boxShadow 1s;
  -ms-transition: color 1s, background 1s, backgroundColor 1s, boxShadow 1s;
  -o-transition: color 1s, background 1s, backgroundColor 1s, boxShadow 1s;
}

[data-theme="light"] {
  --background: #fff;
  --gray: #222;
  --grey: #8884;
  --color: #000;
  --shadow: #0004;
  --text8: #0008;

  transition: color 1s, background 1s, backgroundColor 1s, boxShadow 1s;
  -webkit-transition: color 1s, background 1s, backgroundColor 1s, boxShadow 1s;
  -moz-transition: color 1s, background 1s, backgroundColor 1s, boxShadow 1s;
  -ms-transition: color 1s, background 1s, backgroundColor 1s, boxShadow 1s;
  -o-transition: color 1s, background 1s, backgroundColor 1s, boxShadow 1s;
}

.theme-toggler {
  background-color: transparent;
  border: none;
  padding: 1rem;
  font-size: 4rem;
  position: relative;
  z-index: 5;
  transition: transform 0.5s;
}

.theme-toggler:hover {
  transform: scale(1.2);
}
</style>
