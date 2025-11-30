import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import fr from './locales/fr.json';
import en from './locales/en.json';

const RESOURCES = {
  fr: { translation: fr },
  en: { translation: en },
};

const LANGUAGE_DETECTOR = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      const storedLanguage = await AsyncStorage.getItem('user-language');
      if (storedLanguage) {
        return callback(storedLanguage);
      }

      // Always default to French for new users
      // Only use English if device locale is explicitly 'en'
      const locale = Localization.getLocales()[0].languageCode;
      return callback(locale === 'en' ? 'en' : 'fr');
    } catch (error) {
      console.log('Error reading language', error);
      // Always fallback to French
      callback('fr');
    }
  },
  init: () => { },
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.log('Error saving language', error);
    }
  },
};

i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    resources: RESOURCES,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
