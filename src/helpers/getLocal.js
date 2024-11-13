import i18n from '@/i18n'

const locale = localStorage.getItem('lang')

const getLocal = (key) => {
  return i18n.global.messages[locale][key]
}

export default getLocal