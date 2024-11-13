<template>
  <header class="header flex-center-between">
    <toggle-lang />
    <section class="hello flex-center-start">
      <h1>{{ $t('hello') }}</h1>
      <p>{{ $t('welcome') }}</p>
    </section>
    <navigation-bar />
  </header>
</template>

<script setup>
import ToggleLang from '@/components/ToggleLang.vue'
import NavigationBar from './NavigationBar.vue'
</script>

<style lang="scss">
.header {
  box-sizing: border-box;
  position: absolute;
  padding: 0 2rem;
  top: 0;
  left: 0;
  width: 100dvw;
  background: linear-gradient(135deg, var(--shadow) 5%, transparent 60%, var(--grey) 100%);
  box-shadow: 0 0 1.5rem 0.25rem var(--shadow);
  height: 8rem;
  z-index: 10;
}

.hello {
  width: 33dvw;
  top: 2dvh;
  position: absolute;
  gap: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}


@media (max-width: 768px) {
  .hello {
    font-size: 75%;
  }

  .header {
    padding: 0 1rem;
  }
}

@media (orientation: landscape) {
  .hello {
    left: 20dvw;
  }

  .header {
    height: 11dvh;
  }
}

@media (orientation: portrait) {
  .hello {
    left: 23dvw;
    flex-direction: column;
  }
}
</style>