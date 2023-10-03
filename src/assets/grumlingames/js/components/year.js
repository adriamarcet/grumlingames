const year = () => {
  const CURRENT_YEAR = new Date().getFullYear();
  const yearLabel = document.querySelector('.js-year');

  if (!(parseInt(yearLabel.textContent) === CURRENT_YEAR)) {
    yearLabel.innerHTML = CURRENT_YEAR;
  }
};

export default year;
