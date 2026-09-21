import {defineRouting} from 'next-intl/routing'

export const routing = defineRouting({
  locales: [
    'fr',
    'en',
    'pt',
    'de',
    'es',
    'it',
    'ja',
    'nl',
    'pl',
    'el',
    'ro',
    'bg',
    'cs',
    'ko',
    'ru',
    'ar',
  ],

  defaultLocale: 'fr',

  localePrefix: 'never',
})