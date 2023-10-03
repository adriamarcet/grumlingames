import { argv } from 'yargs';

const TEMPLATE = typeof argv.template === 'string' ? argv.template : 'default';
const ISOLATE = argv.isolate;

const AUTOPREFIXER = {
  cascade: false
};

export { AUTOPREFIXER, ISOLATE, TEMPLATE };
