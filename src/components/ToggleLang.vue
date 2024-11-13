<template>
  <section class="toggle-lang flex-center-start" :title="$t('toggleLangTip')">
    <menu
      v-click-outside="closeMenu"
      class="select"
      :class="{ open: showOptions, close: !showOptions }"
    >
      <li
        v-for="(option, index) in sortedLanguageOptions"
        :key="index"
        @click="handleClick(option.value)"
        :class="{ selected:  selectedLanguage === option.value }"
        class="select-option"
      >
        <img :src="option.image" :alt="$t('lang') + ' flag'" class="select-option-img" />
      </li>
    </menu>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import i18n from '../i18n'
import getIPInfo from '@/helpers/ipInfoHelper'

const languageOptions = Object.keys(i18n.global.messages).map((locale) => ({
  value: locale,
  image: i18n.global.messages[locale].flag,
}))

const selectedLanguage = ref(i18n.global.locale)
const showOptions = ref(false)

const sortedLanguageOptions = computed(() => {
  const sortedOptions = [...languageOptions]
  sortedOptions.sort((o1) => (i18n.global.locale === o1.value ? -1 : 1))
  return sortedOptions
})

const setLanguage = (lang) => {
  i18n.global.locale = lang
  localStorage.setItem('lang', lang)
  selectedLanguage.value = lang
}

const handleClick = (lang) => {
  setLanguage(lang)
  showOptions.value = !showOptions.value
}

const closeMenu = () => {
  showOptions.value = false
}

onMounted(async () => {
  let defaultLang = localStorage.getItem('lang')

  if (!localStorage.getItem('lang')) {
    const ipInfo = await getIPInfo()
    defaultLang = ipInfo.country.iso_code === 'UA' ? 'uk' : 'en'
    i18n.global.locale = defaultLang
    localStorage.setItem('lang', defaultLang)
  }

  i18n.global.locale = defaultLang
})

watch(selectedLanguage, () => {
  window.location.reload()
}, { deep: true })
</script>

<style lang="scss">
.toggle-lang {
  cursor: pointer;
}

.select {
  top: 0.5rem;
  left: 3rem;
  list-style: none;
  margin: 0;
  border-radius: 0.5rem;
  background: var(--grey);
  box-shadow: inset 0 0 0.5rem 0.25rem var(--shadow);
  position: absolute;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: auto;

  &-option {
    &-img {
      box-shadow: 0 0 0.5rem 0.25rem var(--shadow);
      border-radius: 0.5rem;
    }
  }

  transition: all 0.5s;
}

.close {
  z-index: 5;
}

.selected {
  font-weight: bold;
}

.open {
  display: flex;
}

@media (orientation: landscape) {
  .select {
    padding: 0;
    width: 7rem;

    &-option {
      padding: 0.625rem 1rem;

      &-img {
        width: 5rem;
        height: 3rem;
      }
    }
  }

  .close {
    height: 4.25rem;
  }

  .open {
    height: 8.5rem;
  }
}

@media (orientation: portrait) {
  .select {
    padding: 0;
    width: 10rem;

    &-option {
      padding: 1rem 1rem 0.5rem;

      &-img {
        width: 8rem;
        height: 4.8rem;
      }
    }
  }

  .close {
    height: 7rem;
  }

  .open {
    height: 13rem;
  }
}

@media (max-width: 768px) {
  .select {
    left: 2rem;
  }
}
</style>
