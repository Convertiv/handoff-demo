import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Resources Carousel
var swiper = new Swiper(".basic-carousel-resources .swiper", {
  modules: [Navigation, Pagination],
  speed: 2000,
  slidesPerView: 1.3,
  spaceBetween: 24,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2.2,
    },
    992: {
      slidesPerView: 3.1,
    },
  },
});

// Stories Carousel
var swiper = new Swiper(".basic-carousel-stories .swiper", {
  modules: [Navigation, Pagination, Autoplay],
  speed: 2000,
  slidesPerView: 1,
  spaceBetween: 24,
  rewind: true,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 1.1,
    },
    992: {
      slidesPerView: 1.05,
    },
  },
});
