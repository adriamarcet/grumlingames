import purejs from '@runroom/purejs';

const TOGGLE_CLASS = 'js-toggle';
const toggles = document.querySelectorAll(`.${TOGGLE_CLASS}`);

const toggle = () => {
  if (!toggles.length) return;

  purejs.forEach(toggles, element => {
    element.addEventListener('click', () => {
      const target = element.getAttribute('aria-controls');
      const targetElement = document.getElementById(target);

      if (targetElement === null || element.getAttribute('aria-expanded') === null) return;

      targetElement.hidden = !targetElement.hidden;
      const expanded = element.getAttribute('aria-expanded');

      element.setAttribute('aria-expanded', !expanded);
    });
  });
};

export default toggle;
