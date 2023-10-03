import cookies from '../helpers/cookies';

const banner = document.querySelector('.js-cookies-banner');
const button = document.querySelector('.js-accept-cookies');

const handleCookies = () => {
  button.addEventListener('click', () => {
    cookies.set('acceptedAllCookies', 'true', 365);
    banner.setAttribute('hidden', true);
  });

  if (cookies.get('acceptedAllCookies')) {
    banner.setAttribute('hidden', true);
  } else {
    banner.setAttribute('hidden', false);
  }
};

export default handleCookies;
