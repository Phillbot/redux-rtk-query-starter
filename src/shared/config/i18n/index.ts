import i18next, { type i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navigation: {
        home: 'Home',
        about: 'About',
        admin: 'Admin',
      },
      layout: {
        title: 'modular starter',
        toggle: 'EN / RU',
      },
      home: {
        heading: 'Redux + RTK Query starter with modular slices.',
        subheading: 'State lives in its own layer, so you can replace or remove it without touching the UI modules.',
        note:
          'Use this page as a smoke test: the counter exercises the Redux store, while the health check runs through an RTK Query flow.',
      },
      about: {
        title: 'About this starter',
        description:
          'This template keeps the stack small: Redux Toolkit for predictable state, RTK Query for async flows, and a modular folder layout you can reshape per product needs.',
      },
    },
  },
  ru: {
    translation: {
      navigation: {
        home: 'Главная',
        about: 'О проекте',
        admin: 'Админ',
      },
      layout: {
        title: 'модульный стартер',
        toggle: 'RU / EN / UA',
      },
      home: {
        heading: 'Стартер на Redux + RTK Query с модульной структурой.',
        subheading:
          'Состояние изолировано в своём слое, поэтому его легко заменить или убрать без правок UI-модулей.',
        note: 'Страница — смоук-тест: счётчик гоняет Redux, health-check — RTK Query.',
      },
      about: {
        title: 'О стартере',
        description:
          'Минимальный стек: Redux Toolkit для предсказуемого стейта, RTK Query для асинхронщины и модульная структура, которую легко подстраивать.',
      },
    },
  },
  uk: {
    translation: {
      navigation: {
        home: 'Головна',
        about: 'Про проєкт',
        admin: 'Адмін',
      },
      layout: {
        title: 'модульний стартер',
        toggle: 'RU / EN / UA',
      },
      home: {
        heading: 'Стартер на Redux + RTK Query з модульною структурою.',
        subheading:
          'Стан ізольовано у своєму шарі, тому його легко замінити або прибрати без правок UI-модулів.',
        note: 'Сторінка — smoke test: лічильник працює через Redux, health-check — через RTK Query.',
      },
      about: {
        title: 'Про стартер',
        description:
          'Мінімальний стек: Redux Toolkit для передбачуваного стану, RTK Query для асинхронщини та модульна структура, яку легко підлаштовувати.',
      },
    },
  },
};

export const SUPPORTED_LANGS = ['en', 'ru', 'uk'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

const i18n: I18nInstance = i18next;

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
