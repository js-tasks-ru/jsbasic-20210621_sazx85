import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this._renderMenu();
  }

  ribbon = createElement('<div class="ribbon"></div>');
  ribbonInner = createElement('<div class="ribbon__inner"></div>');
  arrowLeft = createElement(`
    <button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  `);
  arrowRight = createElement(`
    <button class="ribbon__arrow ribbon__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  `);

  _renderItems = () => {
    let item;

    this.categories.forEach(element => {
      item = createElement(`
        <a href="#" class="ribbon__item" data-id="${element.id}">${element.name}</a>
      `);

      this.ribbonInner.append(item);
    });

    this.ribbon.append(this.ribbonInner);
  }

  _onArrowLeftClick = () => {
    this.ribbonInner.scrollBy(-350,0);
  }

  _onArrowRightClick = () => {
    this.ribbonInner.scrollBy(350,0);
  }

  _onScrollMenu = () => {
    let scrollWidth = this.ribbonInner.scrollWidth;
    let scrollLeft = this.ribbonInner.scrollLeft;
    let clientWidth = this.ribbonInner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      this.arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowLeft.classList.add('ribbon__arrow_visible');
    }

    if (scrollRight < 1) {
      this.arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowRight.classList.add('ribbon__arrow_visible');
    }
  }

  _renderMenu = () => {
    this.ribbon.append(this.arrowLeft);
    this._renderItems();
    this.ribbon.append(this.arrowRight);
    
    this.arrowRight.classList.add('ribbon__arrow_visible');
    this.arrowLeft.addEventListener('click', this._onArrowLeftClick);
    this.arrowRight.addEventListener('click', this._onArrowRightClick);
    this.ribbonInner.addEventListener('scroll', this._onScrollMenu);

    let items = this.ribbonInner.querySelectorAll('.ribbon__item');

    for (let elem of items) {
      elem.addEventListener('click', function(event) {
        event.preventDefault();

        for (let tempItem of items) {
          tempItem.classList.remove('ribbon__item_active');
        }

        event.target.classList.add('ribbon__item_active');
        const itemStatusEvent = new CustomEvent("ribbon-select", {detail: event.target.dataset.id, bubbles: true});
        event.target.closest('.ribbon').dispatchEvent(itemStatusEvent);

      });  
    }

    return this.ribbon;
  }
}
