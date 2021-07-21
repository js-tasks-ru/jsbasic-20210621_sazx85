import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {

    this.product = product;
    this.cardWrapper = this._createCardWrapper();
    this.elem = this._createCard();
  }

  _createCard () {

    let card = this.cardWrapper;

    card.innerHTML = `<div class="card__top">
                          <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
                          <span class="card__price">€${this.product.price.toFixed(2)}</span>
                      </div>
                      <div class="card__body">
                          <div class="card__title">${this.product.name}</div>
                          <button type="button" class="card__button">
                              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                          </button>
                      </div>`;

    let button = this.cardWrapper.querySelector(".card__button");

    button.addEventListener('click', this._onButtonClick);

    return card;
  }

  _createCardWrapper () {
    let cardWrapper = document.createElement('div');

    cardWrapper.classList.add('card');

    return cardWrapper;
  }

  _onButtonClick = () => {
    const cardStatusEvent = new CustomEvent("product-add", {detail: this.product.id, bubbles: true});

    this.cardWrapper.dispatchEvent(cardStatusEvent);
  }
}
