import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._renderModal();
  }

  setTitle(title) {
    document.querySelector('.modal .modal__title').innerText = title;
  }

  setBody(body) {
    document.querySelector('.modal .modal__body').append(body);
  }

  open = () => {
    let modalClose = document.querySelector('.modal .modal__close');

    modalClose.addEventListener('click', this.close);
    document.addEventListener('keydown', this.keyListen);
    
    document.body.classList.add('is-modal-open');
  }

  _renderModal = () => {
    let modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>

        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>

          <div class="modal__body"></div></div>

      </div>
    `);
    document.body.append(modal);
  }

  keyListen = (e) => {
    if (e.code === 'Escape') {
      this.close();
    }
  }

  close = () => {
    let modalClose = document.querySelector('.modal .modal__close');
    modalClose.removeEventListener('click', this.close);
    document.removeEventListener('keydown', this.keyListen);

    document.body.classList.remove('is-modal-open');
    document.body.querySelector('.modal').remove();
  }
}
