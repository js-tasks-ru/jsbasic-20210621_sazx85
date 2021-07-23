import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.title = null;
    this.body = null;
  }

  setTitle(title) {
    this.title = title;
  }

  setBody(body) {
    this.body = body;
  }

  open = () => {
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

    let modalTitle = document.querySelector('.modal__title');
    let modalBody = document.querySelector('.modal__body');
    let modalClose = document.querySelector('.modal__close');

    modalTitle.innerText = this.title;
    modalBody.innerHTML = this.body;

    modalClose.addEventListener('click', this.close);
    document.addEventListener('keydown', function(event) {
      if (event.code === 'Escape' && document.body.classList.contains('is-modal-open')) {
        document.body.classList.remove('is-modal-open');
        document.body.querySelector('.modal').remove();
      }
    });
    
    document.body.classList.add('is-modal-open');
  }

  close = () => {
    document.body.classList.remove('is-modal-open');
    document.body.querySelector('.modal').remove();
  }
}
