import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend'
import { env } from '@base/utils'
import ls from 'localstorage-slim';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      'Welcome to React': 'Welcome to React and react-i18next',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(HttpBackend)
  .init({
    // resources,
    lng: ls.get('LANGUAGE_CODE') ?? env('LANGUAGE_CODE', 'vi'),

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
