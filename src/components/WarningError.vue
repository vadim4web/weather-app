<template>
  <div class="wrapper">
    <div class="overlay">
    </div>
    <div class="warning-error" v-show="props.state">
      <div v-if="props.type === 'warning'">
        {{ props.message }}
        <br />
        <button @click="handleUnpin">{{ $t('yes')}}</button>
        <button @click="handleClose">{{ $t('no')}}</button>
      </div>
      <div v-else-if="props.type === 'error'">
        {{ props.message }}
        <p v-if="props.suggestRedirect">
          You can move to
          <router-link  to='/favorites'>./favorites</router-link>
          for managing pinned!
        </p>
        <br v-else >
        <button @click="handleClose">{{ $t('ok')}}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['type', 'message', 'handler', 'state', 'closer', 'suggestRedirect'])

const handleUnpin = () => {
  props.handler()
};

const handleClose = () => {
  props.closer()
};
</script>

<style lang="scss">
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.overlay {
  position: fixed;
  content: '';
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background: #8888;
  filter: brightness(0.5);
  z-index: 10;
}

.warning-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform:  translate(-50%, -50%);
  padding: 3rem;
  border-radius: 1rem;
  background-color: var(--background);
  color: var(--color);
  z-index: 9999;
  text-align: center;

  button {
    margin: 1rem .5rem 0;
    padding: 1rem;
    width: 5rem;
    font-size: 1.75rem;
    border: none;
    border-radius: 0.5rem;
    background: linear-gradient(160deg, transparent, var(--grey), var(--background));
    box-shadow: inset 0 0 0.5rem 0.25rem var(--shadow);
  }
}
</style>
