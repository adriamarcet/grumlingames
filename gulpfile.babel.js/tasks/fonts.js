import gulp from 'gulp';

import { ISOLATE } from '../config/params';
import { CORE_PATH, FONTS_PATH, FONTS_SRC, FONTS_DEST, SOURCE_ASSETS_PATH } from '../config/routes';

const FONT_FILES = [`${FONTS_SRC}/**/*`];

if (!ISOLATE) {
  FONT_FILES.push(`${SOURCE_ASSETS_PATH}/${CORE_PATH}/${FONTS_PATH}/**/*`);
}

const fonts = () => gulp.src(FONT_FILES).pipe(gulp.dest(FONTS_DEST));

export default fonts;
