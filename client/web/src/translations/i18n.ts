import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import en from './locales/en'
import pl from './locales/pl'

const resources = {
    en: {
        translation: en,
    },
    pl: {
        translation: pl,
    },
}

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('language') || 'en',
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
