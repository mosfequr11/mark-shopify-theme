var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    480: {
      // For devices >= 480px
      slidesPerView: 1,
      spaceBetween: 15,
    },
    640: {
      // For devices >= 640px
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      // For tablets and above
      slidesPerView: 2,
      spaceBetween: 25,
    },
    1024: {
      // For desktops
      slidesPerView: 2,
      spaceBetween: 25,
    },
  },
});
