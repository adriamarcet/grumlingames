import del from 'del';

import { PUBLIC_PATH } from '../config/routes';

const clean = () => del(`${PUBLIC_PATH}/`);

export default clean;
