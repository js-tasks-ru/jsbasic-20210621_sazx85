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
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
   
    let leftPercents = value / segments * 100;

    this.changeValue(leftPercents, value);

    this.generateEvent(value);
  }

  onPointerDown = (event) => {
    event.preventDefault(); 

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);

    this.elem.classList.add('slider_dragging');

  }

  onPointerMove = (event) => {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }
    
    if (leftRelative > 1) {
      leftRelative = 1;
    }
    
    let leftPercents = leftRelative * 100;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    this.changeValue(leftPercents,value);
  }

  onPointerUp = () => {
    let value = +this.elem.querySelector('.slider__value').innerText;

    this.generateEvent(value);
    this.elem.classList.remove('slider_dragging');
    
    document.removeEventListener('pointerup', this.onPointerUp);
    document.removeEventListener('pointermove', this.onPointerMove);
  }

  changeValue = (valuePercents, value) => {
    let valueStep = this.slider.querySelector('.slider__value');

    this.sliderThumb.style.left = `${valuePercents}%`;
    this.sliderProgress.style.width = `${valuePercents}%`;
    valueStep.innerText = value;

    for (let i = 0; i < this.steps; i++) {
      this.slider.querySelectorAll('.slider__steps span')[i].classList.remove('slider__step-active');
    }
    
    this.slider.querySelectorAll('.slider__steps span')[value].classList.add('slider__step-active');
  }

  generateEvent = (value) => {
    const stepStatusEvent = new CustomEvent("slider-change", {detail: value, bubbles: true});
    this.elem.dispatchEvent(stepStatusEvent);
  }

  renderSlider = () => {
    const thumb = this.sliderThumb;

    this.slider.append(this.sliderThumb);
    this.slider.append(this.sliderProgress);
    this.renderSteps();

    this.changeValue(0,0);

    thumb.onpointerdown = this.onPointerDown;
    this.slider.addEventListener('click', this.sliderClicked);

    thumb.ondragstart = () => false;

    return this.slider;
  }
}
