import forEach from '@runroom/purejs/lib/forEach';

const validateForm = () => {
  const form = document.querySelector('.js-validate-form');
  const inputs = form.querySelectorAll('input');

  const validate = input => {
    if (input.validity.valid) {
      input.classList.remove('invalid');
    } else {
      input.classList.add('invalid');
    }
  };

  forEach(inputs, input => {
    input.addEventListener('blur', event => {
      validate(event.target);
    });
  });

  form.addEventListener('submit', event => {
    const { target } = event;

    if (!target.checkValidity()) {
      const input = target.querySelector(':invalid');

      input.querySelector(':invalid').focus();
      validate(input);

      form.preventDefault();
    }
  });
};

export default validateForm;
