import gulp from 'gulp';
import stylelint from 'gulp-stylelint';

import { STYLES_FILES } from './styles.base';
import styleLinter from '../config/style-linter';

const lint = () => {
  return gulp.src(STYLES_FILES).pipe(
    stylelint({
      syntax: 'scss',
      failAfterError: false,
      reporters: [{ formatter: styleLinter }]
    })
  );
};

export default lint;
