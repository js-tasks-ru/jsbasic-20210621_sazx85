import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.renderSlider();
  }

  slider = createElement('<div class="slider"></div>');
  sliderThumb = createElement(`
    <div class="slider__thumb">
      <span class="slider__value"></span>
    </div>
  `);
  sliderProgress = createElement('<div class="slider__progress"></div>');
  sliderSteps = createElement('<div class="slider__steps"></div>');

  renderSteps = () => {
    let step;

    for (let i = 0; i < this.steps; i++) {
      step = createElement('<span></span>');
      this.sliderSteps.append(step);
    }
    this.slider.append(this.sliderSteps);
  }

  sliderClicked = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;
    let approximateValue = leftRelative * (this.steps - 1);
    let value = Math.round(approximateValue);
   
    this.changeValue(value);

    const stepStatusEvent = new CustomEvent("slider-change", {detail: value, bubbles: true});
    this.elem.dispatchEvent(stepStatusEvent);
  }

  changeValue = (value) => {
    let segments = this.steps - 1;
    let valuePercents = value / segments * 100;
    let valueStep = this.slider.querySelector('.slider__value');

    this.sliderThumb.style.left = `${valuePercents}%`;
    this.sliderProgress.style.width = `${valuePercents}%`;
    valueStep.innerText = value;

    for (let i = 0; i < this.steps; i++) {
      this.slider.querySelectorAll('.slider__steps span')[i].classList.remove('slider__step-active');
    }
    
    this.slider.querySelectorAll('.slider__steps span')[value].classList.add('slider__step-active');
  }

  renderSlider = () => {
    this.slider.append(this.sliderThumb);
    this.slider.append(this.sliderProgress);
    this.renderSteps();

    this.changeValue(this.value);
    this.slider.addEventListener('click', this.sliderClicked);

    return this.slider;
  }
}
