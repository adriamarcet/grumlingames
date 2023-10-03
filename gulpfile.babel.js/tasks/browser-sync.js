import browserSync from 'browser-sync';
import { PUBLIC_PATH } from '../config/routes';

const reload = done => {
  browserSync.reload({ stream: true });
  done();
};

const serve = done => {
  browserSync.init({
    server: { baseDir: `${PUBLIC_PATH}/` },
    port: 5000,
    ui: { port: 5001 },
    options: { reloadDelay: 250 },
    open: true,
    notify: false
  });
  done();
};

export { reload, serve };
