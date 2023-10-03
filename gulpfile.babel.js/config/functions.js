import colors from 'colors';
import mime from 'mime-types';

import { SITE_URL, defaultLanguage, routes } from '../../alt.config';
import { FONTS_ASSETS, IMAGES_ASSETS, SCRIPTS_ASSETS, STYLES_ASSETS } from './routes';

const KAOMOJIES = {
  common: '(」゜ロ゜)」',
  crazy: '(⊙_◎)',
  default: 'ᶘ ᵒ㉨ᵒᶅ',
  damn: '(╯°□°）╯︵ ┻━┻',
  start: '(ﾉ･ｪ･)ﾉ',
  yeah: '＼（＠￣∇￣＠）／',
  writing: '＿〆(。。)'
};

const getKaomojies = kaomoji => KAOMOJIES[kaomoji] || KAOMOJIES.default;

const printlog = (str, kaomoji) => {
  kaomoji = kaomoji || 'writing';
  // eslint-disable-next-line no-console
  console.log(`${getKaomojies(kaomoji)} ${str}`);
};

const localizePath = (path, locale) => {
  const isDefaultLanguage = locale === defaultLanguage;

  if (path === 'index') {
    return isDefaultLanguage ? '/' : `/${locale}`;
  }

  const route = !isDefaultLanguage && routes[path] ? `/${routes[path][locale]}` : `/${path}`;
  return isDefaultLanguage ? route : `/${locale}${route}`;
};

const translate = (obj, i) => obj[i];

const translateError = (str, locale) =>
  printlog(colors.red(`Translation string "${str}" not found for locale "${locale}"`));

const trans = (str, obj, locale) => {
  try {
    const translation = str.split('.').reduce(translate, obj);

    if (translation) {
      return translation;
    }

    return translateError(str, locale);
  } catch (error) {
    return translateError(str, locale);
  }
};

const transRoute = (str, locale) => {
  const isDefaultLanguage = locale === defaultLanguage;

  if (str === 'index' || str === '404') {
    return isDefaultLanguage ? '/' : `/${locale}`;
  } else if (isDefaultLanguage) {
    return `/${str}`;
  }

  const route = routes[str] ? routes[str][locale] : str;
  return `/${locale}/${route}`;
};

const absPath = path => `${SITE_URL}${path || ''}`;
const removeQuotes = str => str.replace(/['"]+/g, '');

const asset = str => {
  const type = mime.lookup(str);

  switch (type) {
    case 'application/javascript':
      return `${SCRIPTS_ASSETS}/${str}`;
    case 'text/css':
      return `${STYLES_ASSETS}/${str}`;
    case 'image/jpeg':
    case 'image/png':
    case 'image/webp':
    case 'image/svg+xml':
    case 'image/gif':
    case 'video/mp4':
    case 'video/ogg':
    case 'video/webm':
      return `${IMAGES_ASSETS}/${str}`;
    case 'font/ttf':
    case 'font/woff':
    case 'font/woff2':
      return `${FONTS_ASSETS}/${str}`;
    default:
      printlog(colors.red(`Unknown mime type for "${str}"`), 'crazy');
      return false;
  }
};

// Keep old JS function because 'this' bind issue
const errorAlert = function (error) {
  const str = `Error compiling. ${error.message} ${getKaomojies('damn')}`;
  printlog(colors.red(str), 'damn');
  this.emit('end');
};

export {
  absPath,
  asset,
  getKaomojies,
  errorAlert,
  printlog,
  localizePath,
  trans,
  transRoute,
  removeQuotes
};
