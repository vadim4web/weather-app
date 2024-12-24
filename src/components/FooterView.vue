<template>
  <footer class="footer flex-center-between">
    <section class="links">
      <a href="https://vitejs.dev/" target="_blank">
        <img src="/vite.svg" class="logo vite" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </section>
    <p class="authority flex-center-center">
      <span class="name">© {{ new Date().getFullYear() }} {{$t('author')}}</span>
      <a href="https://github.com/vadim4web/" target="_blank">
        <img :src="githubImg" class="logo git" alt="GitHub logo"/>
      </a>
      <span class="abc">VADIM4WEB</span>
    </p>
    <toggle-theme />
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ToggleTheme from './ToggleTheme.vue'

const isLightTheme = ref(true)
const githubImg = computed(() => isLightTheme.value ? './gh.svg' : './gh-white.svg')

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) isLightTheme.value = savedTheme === 'light'
})
</script>

<style lang="scss">

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(315deg, var(--gray) 5%, transparent 66%, var(--grey) 100%);
  box-shadow: 0 0 1.5rem 0.25rem var(--shadow);
  padding: 0 2rem;
}

.logo {
  will-change: filter;
  transition: filter 0.5s;
  position: relative;
  z-index: 5;
}

.logo.vite:hover {
  filter: drop-shadow(0 0 2em #646cffcc);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883cc);
}

.logo.git:hover {
  filter: drop-shadow(0 0 2em #888888cc);
}

.authority {
  color: var(--gray);
  display: flex;
  position: absolute;
}

@media (orientation: landscape) {
  .authority {
    width: 68dvw;
    left: 16.5dvw;
  }

  .footer {
    height: 11dvh;
  }

  .logo {
    height: 8dvh;
    padding: 1dvh;
  }
}

@media (orientation: portrait) {
  .authority {
    width: 68dvw;
    left: 23dvw;
  }

  .logo {
    height: 6rem;
    padding: 1rem;
  }
}

.name {
  text-align: right;
}

.name,
.abc {
  display: block;
  width: 25ch;
}

.abc {
  text-align: left;
}

@media (max-width: 768px) {
  .authority {
    font-size: smaller;
  }

  .footer {
    padding: 0 1rem;
  }

  .logo {
    height: 5rem;
  }
}
</style>
