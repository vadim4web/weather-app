<template>
  <div class="preloader">
    <div class="circles">
      <div class="circle cayan"></div>
      <div class="circle magenta"></div>
      <div class="circle yellow"></div>
    </div>
    <div class="text">
      <p class="loading-wrapper">
        <h3 class="loading0">{{ $t('loading') }}</h3>
        <span class="loading">&nbsp;</span>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.preloader {
  top: 0;
  left: 0;
  position: fixed;
  width: 100dvw;
  height: 100dvh;
  z-index: -1;

  .circles,
  .text {
    position: relative;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .text {
    font-size: 3rem;
    text-align: left;
    color: var(--color);
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 2s;
    overflow: hidden;
    border-radius: 50%;
    animation: edging 3s cubic-bezier(0.645, 0.045, 0.355, 1) infinite;
  }

  .loading0,
  .loading {
    position: relative;
    background: var(--background) !important;
    color: var(--color) !important;
    border: 1px solid var(--background);
  }

  .loading-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text::before {
    content: '';
    transform-origin: 0 0;
    position: absolute;
    width: 150%;
    height: 150%;
    top: 50%;
    left: 50%;
    z-index: -1;
    transform: scale(5);
    background: linear-gradient(0deg, cyan, magenta, yellow);
    animation: rotate 6s cubic-bezier(0.6, -0.28, 0.735, 0.045) infinite;
  }

  .loading::after {
    position: absolute;
    content: '';
    animation: 2s blink infinite;
    background: var(--background);
    color: var(--color);
    top: 0;
  }

  .loading::before {
    top: 0;
    transform: translate(0, -50%);
    position: absolute;
    content: ' ';
    background: var(--background);
    color: var(--color);
  }

  .circles {
    transform: translate(-50%, -50%);
    transform-origin: 0 0;
    animation: rotate 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;

    .circle {
      position: absolute;
      border-radius: 50%;

      &.cayan {
        background: #00ffff88;
        top: 0;
        left: 0;
        animation: inOut1 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        animation-delay: 0ms;
      }
      &.magenta {
        background: #ff00ff88;
        top: 0;
        left: 0;
        animation: inOut2 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        animation-delay: -1s;
      }
      &.yellow {
        background: #ffff0088;
        top: 0;
        left: 0;
        animation: inOut3 6s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
      }
    }
  }
}

@media (orientation: landscape) {
  .circles {
    top: 29%;
    width: 5rem;
    height: 5rem;

    .circle {
      width: 5rem;
      height: 5rem;
    }
  }

  .text {
    top: 56%;
    width: 20rem;
    height: 20rem;
  }

  .loading0 {
    width: fit-content;
  }

  .loading0,
  .loading {
    font-size: 2rem;
    line-height: 4rem;
  }

  .loading {
    position: relative;
    display: block;
    font-size: 2rem;
    line-height: 4rem;
    padding-left: 0.5rem;
    width: 4vmax;
  }

  .loading::after {
    right: 0;
    width: 4rem;
  }
}

@media (orientation: portrait) {
  .circles {
    top: 35rem;
    width: 10rem;
    height: 10rem;

    .circle {
      width: 10rem;
      height: 10rem;
    }

  }

  .text {
    top: 55rem;
    width: 25rem;
    height: 25vmax;
  }

  .loading0 {
    width: fit-content;
  }

  .loading0,
  .loading {
    font-size: 2rem;
    line-height: 4rem;
  }

  .loading {
    position: relative;
    display: block;
    font-size: 2rem;
    line-height: 4rem;
    padding-left: 0.5rem;
    width: 4vmax;
  }

  .loading::after {
    right: 0;
    width: 4rem;
  }
}

@keyframes rotate {
  from { transform: rotate(0) translate(-50%, -50%); }
  to { transform: rotate(1turn) translate(-50%, -50%); }
}

@keyframes inOut1 {
  0% {}
  50% { transform: translate(0, -100%);}
  100% {}
}

@keyframes inOut2 {
  0% {}
  50% { transform: translate(-86.60254037844386%, 50%);}
  100% {}
}

@keyframes inOut3 {
  0% {}
  50% { transform: translate(86.60254037844386%, 50%);}
  100% {}
}

@keyframes blink {
  0% {
    content: '...'
  }
  25% {
    content: '..|'
  }
  50% {
    content: '.||'
  }
  75% {
    content: '|||'
  }
  100% {
    content: '';
  }
}

@keyframes edging {
  0% {}
  50% { border-radius: 0; }
  100% {}
}
</style>