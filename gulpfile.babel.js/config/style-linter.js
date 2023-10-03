import colors from 'colors';
import _ from 'underscore';

const styleLinter = err => {
  const icons = {
    info: colors.blue('⬤'),
    success: colors.green('⬤'),
    warning: colors.yellow('⬤'),
    error: colors.red('⬤')
  };
  const tab = '    ';
  const space = ' ';

  let line;
  let hasErrors = false;

  // eslint-disable-next-line no-console
  console.log();
  _.each(err, (value, key, list) => {
    const result = [];
    _.each(value.warnings, (v, k, l) => {
      if (v.text.trim() !== 'This file is ignored') {
        result.push(v);
      }
    });

    if (result.length) {
      hasErrors = true;
      // eslint-disable-next-line no-console
      console.log();
      // eslint-disable-next-line no-console
      console.log(space, colors.underline.white(value.source));
      _.each(value.warnings, (v, k, l) => {
        line = v.line ? colors.gray(`${v.line}:${v.column}`) : '';
        // eslint-disable-next-line no-console
        console.log(tab, icons[v.severity] + space, line + space, colors.white(v.text));
      });
      // eslint-disable-next-line no-console
      console.log();
    }
  });

  if (!hasErrors) {
    // eslint-disable-next-line no-console
    console.log(tab, icons.success + space, colors.white('Yeah, no errors or warnings!'));
  }
  // eslint-disable-next-line no-console
  console.log();
};

export default styleLinter;
