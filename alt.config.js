const SITE_NAME = 'Broadway BCN';
const SITE_URL = 'https://www.broadwaybcn.com';

const defaultLanguage = 'en';
const languages = ['en', 'es', 'ca'];

const routes = {
  privacy_policy: {
    es: 'politica_de_privacidad',
    ca: 'politica_de_privacitat'
  },
  thank_you: {
    es: 'gracias_por_contactarnos',
    ca: 'gracies_per_contactarnos'
  }
};

export { SITE_NAME, SITE_URL };
export { defaultLanguage, languages, routes };
