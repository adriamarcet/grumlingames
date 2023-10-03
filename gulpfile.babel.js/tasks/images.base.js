import fs from 'fs';
import { dest, src } from 'gulp';
import gulpif from 'gulp-if';

import { ISOLATE } from '../config/params';
import {
  CORE_PATH,
  FAVICONS_PATH,
  ICONS_PATH,
  IMAGES_DEST,
  IMAGES_PATH,
  IMAGES_SRC,
  PUBLIC_PATH,
  SOURCE_ASSETS_PATH,
  TEMPLATE_ASSETS_PATH,
  TEMPLATE_SRC
} from '../config/routes';

const IMAGES_FILES = [
  `${IMAGES_SRC}/**/*`,
  `!${TEMPLATE_ASSETS_PATH}/${IMAGES_PATH}/${ICONS_PATH}/*`
];

const COMMON_IMAGES_PATH = `${SOURCE_ASSETS_PATH}/${CORE_PATH}/${IMAGES_PATH}`;
const defaultFavicon = `${COMMON_IMAGES_PATH}/${FAVICONS_PATH}/favicon.ico`;
const templateFavicon = `${IMAGES_SRC}/${FAVICONS_PATH}/favicon.ico`;
const faviconFile = fs.existsSync(templateFavicon) ? templateFavicon : defaultFavicon;

if (!ISOLATE) {
  IMAGES_FILES.unshift(`${COMMON_IMAGES_PATH}/**/*`);
  IMAGES_FILES.push(`!${COMMON_IMAGES_PATH}/${ICONS_PATH}/*`);
}

const images = () =>
  src(IMAGES_FILES).pipe(
    gulpif(
      file => file.extname === '.svg',
      dest(`${TEMPLATE_SRC}/${ICONS_PATH}`),
      dest(IMAGES_DEST)
    )
  );

const favicon = () => src(faviconFile).pipe(dest(`${PUBLIC_PATH}`));

export { IMAGES_FILES, favicon };
export default images;
