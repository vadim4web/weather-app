<template>
  <nav class="nav flex-center-center">
    <router-link to="/" class="nav-link">{{ $t('weather') }}📈</router-link>
    <router-link to="/favorites" class="nav-link">{{ $t('cities') }}📌</router-link>
  </nav>
</template>

<style lang="scss">
.nav {
  gap: 1rem;
  position: relative;
  z-index: 5;

  &-link {
    text-decoration: none;
    color: var(--color);
    border-radius: 1rem;
    font-size: 2rem;
    transition: all 1s;

    &:hover {
      background: var(--grey);
      box-shadow: inset 0 0 0.25rem 0.1rem var(--shadow);
      text-decoration: none;
    }

    &.router-link-active {
      font-weight: bold;
      background: var(--grey);
      box-shadow: inset 0 0 0.5rem 0.25rem var(--shadow);
    }
  }
}

@media (max-width: 1200px) {
  .nav {
    transform: scale(0.75) translate(10%, 0);
  }
}

@media (orientation: landscape) {
  .nav-link {
    padding: 1.5rem;
  }
}

@media (orientation: portrait) {
  .nav-link {
    padding: 2rem;
  }
}
</style>
