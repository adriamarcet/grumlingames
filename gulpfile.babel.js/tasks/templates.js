import fs from 'fs';
import { dest, src } from 'gulp';
import htmlmin from 'gulp-htmlmin';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import twig from 'gulp-twig';

import { SITE_NAME, defaultLanguage, languages, routes } from '../../alt.config';
import {
  absPath,
  asset,
  errorAlert,
  localizePath,
  removeQuotes,
  trans,
  transRoute
} from '../config/functions';
import { TEMPLATE } from '../config/params';
import {
  CORE_PATH,
  TEMPLATE_SRC,
  TEMPLATES_SRC,
  TRANSLATIONS_PATH,
  PUBLIC_PATH
} from '../config/routes';

const CORE_FILES = `${TEMPLATES_SRC}/${CORE_PATH}/**/*.twig`;
const TEMPLATES_FILES = `${TEMPLATE_SRC}/**/*.twig`;
const TRANSLATIONS_FILES = `${TRANSLATIONS_PATH}/${TEMPLATE}/*.json`;

const createPage = async (source, config, name = false) => {
  const translations = require(`../../translations/${TEMPLATE}/messages.${config.currentLocale}.json`); // eslint-disable-line global-require
  const currentUrl = localizePath(config.pageName, config.currentLocale);

  return src(source)
    .pipe(
      plumber({
        errorHandler: errorAlert
      })
    )
    .pipe(
      twig({
        data: {
          siteName: SITE_NAME,
          languages,
          defaultLanguage,
          t: translations,
          routes,
          ...config
        },
        base: TEMPLATE_SRC,
        namespaces: { Core: `${TEMPLATES_SRC}/core` },
        cache: false,
        functions: [
          {
            name: 'link',
            func: str => localizePath(str, config.currentLocale)
          },
          {
            name: 'transRoute',
            func: (str, locale) => transRoute(str, locale)
          },
          {
            name: 'asset',
            func: asset
          },
          {
            name: 'absPath',
            func: absPath
          }
        ],
        filters: [
          {
            name: 'trans',
            func: str => trans(str, translations, config.currentLocale)
          },
          {
            name: 'removeQuotes',
            func: removeQuotes
          }
        ]
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        minifyCSS: true
      })
    )
    .pipe(rename(name || 'index.html'))
    .pipe(dest(`${PUBLIC_PATH + currentUrl}`));
};

const templates = async done => {
  await fs
    .readdirSync(`${TEMPLATE_SRC}/pages`)
    .filter(file => /\.(twig)$/i.test(file))
    .map(async file => {
      const pageName = file.replace('.twig', '');

      await languages.map(async currentLocale => {
        const isIndex = pageName === 'index';
        const is404 = pageName === '404';
        const name = is404 ? '404.html' : false;

        let pagePath = `/${pageName}`;

        if (isIndex || is404) {
          pagePath = '';
        } else if (routes[pageName] && routes[pageName][currentLocale]) {
          pagePath = `/${routes[pageName][currentLocale]}`;
        }

        await createPage(
          `${TEMPLATE_SRC}/pages/${file}`,
          { currentLocale, pagePath, pageName },
          name
        );
      });
    });

  done();
};

export { CORE_FILES, TEMPLATES_FILES, TRANSLATIONS_FILES };
export default templates;
