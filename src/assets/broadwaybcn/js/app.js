import purejs from '@runroom/purejs';

import validateForm from './helpers/validateForm';
import toggle from './helpers/toggle';
import year from './components/year';
import cookies from './components/cookies';

purejs.events.onDocumentReady(() => {
  validateForm();
  toggle();
  year();
  cookies();
});
