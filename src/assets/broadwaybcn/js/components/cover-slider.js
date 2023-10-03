import Swiper, { Pagination, Autoplay } from 'swiper';

Swiper.use([Pagination, Autoplay]);

const initSlider = () =>
  new Swiper('.js-swiper-cover', {
    modules: [Pagination, Autoplay],
    pagination: {
      el: '.js-swiper-pagination',
      type: 'bullets'
    },
    autoplay: true
  });

export default initSlider;
