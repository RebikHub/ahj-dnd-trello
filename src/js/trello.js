import Memory from './memory';

export default class Trello {
  constructor() {
    this.todo = document.querySelector('.todo-in');
    this.progress = document.querySelector('.progress-in');
    this.done = document.querySelector('.done-in');
    this.addCardBtn = document.querySelectorAll('.add-card');
    this.card = document.querySelector('.card-block');
    this.text = null;
  }

  events() {
    this.addAnotherCard();
  }

  static renderDom() {
    const card = new Memory().load();

    if (card) {
      console.log(card);

      if (card.todo) {
        const div = document.querySelector('.todo-in');
        card.todo.forEach((elem) => {
          const newDiv = document.createElement('div');
          newDiv.textContent = elem;
          newDiv.classList.add('new-div');
          div.appendChild(newDiv);
        });
      }
      if (card.progress) {
        const div = document.querySelector('.progress-in');
        card.progress.forEach((elem) => {
          const newDiv = document.createElement('div');
          newDiv.textContent = elem;
          newDiv.classList.add('new-div');
          div.appendChild(newDiv);
        });
      }
      if (card.done) {
        const div = document.querySelector('.done-in');
        card.done.forEach((elem) => {
          const newDiv = document.createElement('div');
          newDiv.textContent = elem;
          newDiv.classList.add('new-div');
          div.appendChild(newDiv);
        });
      }
    }
  }

  addAnotherCard() {
    for (const i of this.addCardBtn) {
      i.addEventListener('click', (ev) => {
        ev.preventDefault();
        const cloneCard = this.card.cloneNode(true);
        cloneCard.classList.remove('none');
        i.closest('div').children[1].appendChild(cloneCard);
        i.classList.add('none');
        console.log(cloneCard.children[0].value);
        Trello.inputText(cloneCard.children[0]);
        Trello.addCardInDiv(cloneCard.children[1].children[0], i.closest('div').children[1], i, cloneCard);
        // Trello.addCardInDiv(cloneCard.children[1].children[1]);
      });
    }
  }

  static inputText(element) {
    element.addEventListener('input', (ev) => {
      this.text = ev.target.value;
    });
  }

  static addCardInDiv(element, div, addLink, clone) {
    element.addEventListener('click', () => {
      const newDiv = document.createElement('div');
      newDiv.textContent = this.text;
      newDiv.classList.add('new-div');
      div.appendChild(newDiv);
      clone.remove();
      addLink.classList.remove('none');
      Trello.saveCards(div, this.text);
    });
  }

  static saveCards(element, text) {
    const card = new Memory();
    if (element.contains(document.querySelector('.todo-in'))) {
      card.save({ todo: text });
    } else if (element.contains(document.querySelector('.progress-in'))) {
      card.save({ progress: text });
    } else if (element.contains(document.querySelector('.done-in'))) {
      card.save({ done: text });
    }
  }
}
