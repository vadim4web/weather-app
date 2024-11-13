<template>
  <div class="not-found">
    <h1>{{ $t('404')}}</h1>

    <router-link to="/" class="link">
      {{ $t('back404') }}
      <br />
      <br />
      <span id="this">this.</span>
    </router-link>
  </div>
</template>

<style scoped>
.not-found {
  margin-top: -10vmax;
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 8.62rem);
  align-items: center;
  justify-content: center;
  position: relative;
}

a:link,
a:visited,
a:hover,
a:active {
  color: var(--background, --color);
  background-color: var(--color, --background);
  text-decoration: underline dotted var(--grey);
}
.link {
  padding: 1rem;
  text-decoration: none;
  font-size: 200%;
}

h1 {
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

#this {
  font-size: 11rem;
  line-height: 11rem;
  font-weight: bolder;
  background: -webkit-linear-gradient(270deg, navy 30%, gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: bold;
  text-align: center;
  position: relative;
  filter: blur(1px);
  opacity: 0.68;
  left: 0;
  bottom: -0.65rem;
}

#this::before{
  position: absolute;
  bottom: 5rem;
  left: 0.25rem;
  content: 'this.';
  font-size: 10rem;
  line-height: 11.5rem;
  background: -webkit-linear-gradient(270deg, navy 30%, gold);
  background: -webkit-linear-gradient(270deg, #00008088 30%, #ffd70088);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: bold;
  text-align: center;
  z-index: -1;
  filter: blur(5px);
}

#this::after {
  position: absolute;
  top: 6rem;
  left: -0.25rem;
  content: 'this.';
  font-size: 12.5rem;
  line-height: 12.5rem;
  background: -webkit-linear-gradient(270deg, #000080 30%, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  font-weight: bold;
  text-align: center;
  z-index: 1;
  filter: contrast(2);
}
</style>