import { parallel, series, watch } from 'gulp';

import { serve, reload } from './tasks/browser-sync';
import clean from './tasks/clean';
import fonts from './tasks/fonts';
import stylesLint from './tasks/styles.lint';
import scriptsLint from './tasks/scripts.lint';
import images, { IMAGES_FILES, favicon } from './tasks/images.base';
import scripts, { SCRIPTS_FILES } from './tasks/scripts.base';
import styles, { STYLES_FILES } from './tasks/styles.base';
import sprites, { SPRITES_FILES } from './tasks/images.sprites';
import templates, { CORE_FILES, TEMPLATES_FILES, TRANSLATIONS_FILES } from './tasks/templates';

const buildStyles = series(stylesLint, styles);
const buildScripts = series(scriptsLint, scripts);
const buildImages = series(images, sprites, favicon);
const build = parallel(fonts, templates, buildImages, series(buildStyles, buildScripts));

const watcher = () => {
  watch([CORE_FILES, TEMPLATES_FILES, TRANSLATIONS_FILES], series(templates, reload));
  watch(STYLES_FILES, series(buildStyles, reload));
  watch(SCRIPTS_FILES, series(buildScripts, reload));
  watch(IMAGES_FILES, series(buildImages, reload));
  watch(SPRITES_FILES, series(sprites, reload));
};

const DEV = series(clean, build, serve, watcher);
const deploy = series(clean, build);
export { deploy };
export default DEV;
