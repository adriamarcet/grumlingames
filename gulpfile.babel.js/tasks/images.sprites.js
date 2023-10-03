import { dest, src } from 'gulp';
import cheerio from 'gulp-cheerio';
import rename from 'gulp-rename';

import { ISOLATE } from '../config/params';
import {
  CORE_PATH,
  ICONS_PATH,
  IMAGES_PATH,
  SOURCE_ASSETS_PATH,
  TEMPLATE_ASSETS_PATH,
  TEMPLATE_SRC
} from '../config/routes';

const SPRITES_FILES = [`${TEMPLATE_ASSETS_PATH}/${IMAGES_PATH}/${ICONS_PATH}/*.svg`];

if (!ISOLATE) {
  SPRITES_FILES.push(`${SOURCE_ASSETS_PATH}/${CORE_PATH}/${IMAGES_PATH}/${ICONS_PATH}/*.svg`);
}

const sprites = () =>
  src(SPRITES_FILES)
    .pipe(rename({ prefix: 'icon-' }))
    .pipe(
      cheerio({
        run: $ => {
          $('[fill]').removeAttr('fill');
        },
        parserOptions: { xmlMode: true }
      })
    )
    .pipe(dest(`${TEMPLATE_SRC}/${ICONS_PATH}`));

export { SPRITES_FILES };
export default sprites;
