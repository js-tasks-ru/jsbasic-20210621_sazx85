import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this._createSlider();
  }

  carousel = createElement('<div class="carousel"></div>');
  carouselInner = createElement('<div class="carousel__inner"></div>');
  arrowRight = createElement(`<div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>`);
  arrowLeft = createElement(`<div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>`);
  currentOffset = 0;

  _createSlides = () => {
    let slide;

    this.slides.forEach(element => {
      slide = createElement(`
          <div class="carousel__slide" data-id="${element.id}">
            <img src="/assets/images/carousel/${element.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${element.price.toFixed(2)}</span>
              <div class="carousel__title">${element.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>
      `);

      const button = slide.querySelector('.carousel__button');

      button.addEventListener('click', function(event) {
        const slideStatusEvent = new CustomEvent("product-add", {detail: element.id, bubbles: true});
        event.currentTarget.closest('.carousel').dispatchEvent(slideStatusEvent);
      });

      this.carouselInner.append(slide);
    });

    this.carousel.append(this.carouselInner);
  }

  _onArrowLeftClick = () => {
    this.arrowRight.style.display = '';
    this.currentOffset -= this.carouselInner.offsetWidth;
    this._translateSlides(this.currentOffset);

    if (this.currentOffset === 0) {
      this.arrowLeft.style.display = 'none';
    }
  }

  _onArrowRightClick = () => {
    this.arrowLeft.style.display = '';
    this.currentOffset += this.carouselInner.offsetWidth;
    this._translateSlides(this.currentOffset);

    if (this.currentOffset === (this.slides.length - 1) * this.carouselInner.offsetWidth) {
      this.arrowRight.style.display = 'none';
    }
  }

  _translateSlides = (offset) => {
    this.carouselInner.style.transform = `translateX(-${offset}px)`;
  }

  _createSlider = () => {
    this.carousel.append(this.arrowRight);
    this.carousel.append(this.arrowLeft);
    this._createSlides();

    this.arrowLeft.style.display = 'none';
    this.arrowLeft.addEventListener('click', this._onArrowLeftClick);
    this.arrowRight.addEventListener('click', this._onArrowRightClick);

    return this.carousel;
  }
}
