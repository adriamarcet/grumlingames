import gulp from 'gulp';
import named from 'vinyl-named';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

import { SCRIPTS_SRC, SCRIPTS_DEST } from '../config/routes';
import { WEBPACK_CONFIG_JS } from '../config/webpack';
import { errorAlert } from '../config/functions';

const SCRIPTS_FILES = `${SCRIPTS_SRC}/**/*.js`;

const scripts = () =>
  gulp
    .src(`${SCRIPTS_SRC}/*.js`)
    .pipe(named())
    .pipe(plumber({ errorHandler: errorAlert }))
    .pipe(webpackStream(WEBPACK_CONFIG_JS, webpack))
    .pipe(plumber.stop())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(SCRIPTS_DEST));

export { SCRIPTS_FILES };
export default scripts;
