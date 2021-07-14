function initCarousel() {
  const carousel = document.querySelector("[data-carousel-holder]");
  const sliderLength = carousel.querySelectorAll(".carousel__slide");
  const carouselSwiper = carousel.querySelector(".carousel__inner");
  const arrowLeft = carousel.querySelector(".carousel__arrow_left");
  const arrowRight = carousel.querySelector(".carousel__arrow_right");
  let currentOffset = 0;

  arrowLeft.style.display = 'none';

  arrowLeft.addEventListener('click', function () {
    arrowRight.style.display = '';
    currentOffset -= carouselSwiper.offsetWidth;
    carouselSwiper.style.transform = 'translateX(-' + currentOffset + 'px)';

    if (currentOffset === 0) {
      this.style.display = 'none';
    }
  });

  arrowRight.addEventListener('click', function () {
    arrowLeft.style.display = '';
    currentOffset += carouselSwiper.offsetWidth;
    carouselSwiper.style.transform = 'translateX(-' + currentOffset + 'px)';

    if (currentOffset === (sliderLength.length - 1) * carouselSwiper.offsetWidth) {
      this.style.display = 'none';
    }
  });

}
