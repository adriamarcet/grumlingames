const SITE_NAME = 'Grumlin Games';
const SITE_URL = 'https://www.grumlingames.com';

const defaultLanguage = 'ca';
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
