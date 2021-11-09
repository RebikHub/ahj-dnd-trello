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
    Trello.moveMouseRemoveDiv();
  }

  static renderDom() {
    const card = new Memory().load();

    if (card) {
      if (card.todo) {
        const div = document.querySelector('.todo-in');
        card.todo.forEach((elem) => {
          Trello.createNewDiv(div, elem);
        });
      }
      if (card.progress) {
        const div = document.querySelector('.progress-in');
        card.progress.forEach((elem) => {
          Trello.createNewDiv(div, elem);
        });
      }
      if (card.done) {
        const div = document.querySelector('.done-in');
        card.done.forEach((elem) => {
          Trello.createNewDiv(div, elem);
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
        Trello.inputText(cloneCard.children[0]);
        Trello.addCardInDiv(cloneCard.children[1].children[0], i.closest('div').children[1], i, cloneCard);
      });
    }
  }

  static createNewDiv(div, elem) {
    const newDiv = document.createElement('div');
    newDiv.textContent = elem;
    newDiv.classList.add('new-div');
    div.appendChild(newDiv);
    const newDivRemove = document.createElement('span');
    newDivRemove.classList.add('new-div-remove');
    newDivRemove.classList.add('none');
    newDivRemove.textContent = '\u{00D7}';
    newDiv.appendChild(newDivRemove);
  }

  static inputText(element) {
    element.addEventListener('input', (ev) => {
      this.text = ev.target.value;
    });
  }

  static addCardInDiv(element, div, addLink, clone) {
    element.addEventListener('click', () => {
      clone.remove();
      addLink.classList.remove('none');
      Trello.createNewDiv(div, this.text);
      Trello.saveCards(div, this.text);
      Trello.moveMouseRemoveDiv();
    });
  }

  static moveMouseRemoveDiv() {
    const divs = document.querySelectorAll('.new-div');
    for (const i of divs) {
      i.addEventListener('mouseover', () => {
        if (i.children[0].classList.contains('none')) {
          i.children[0].classList.remove('none');
        }
      });
      i.addEventListener('mouseout', () => {
        if (!i.children[0].classList.contains('none')) {
          i.children[0].classList.add('none');
        }
      });
    }
    for (const i of divs) {
      i.children[0].addEventListener('click', () => {
        i.remove();
        Trello.updateCards();
      });
    }
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

  static updateCards() {
    const todo = document.querySelector('.todo-in');
    const progress = document.querySelector('.progress-in');
    const done = document.querySelector('.done-in');
    const card = new Memory();
    card.clear();
    for (const i of todo.children) {
      const text = i.textContent;
      card.save({ todo: text.slice(0, text.length - 1) });
    }
    for (const i of progress.children) {
      const text = i.textContent;
      card.save({ progress: text.slice(0, text.length - 1) });
    }
    for (const i of done.children) {
      const text = i.textContent;
      card.save({ done: text.slice(0, text.length - 1) });
    }
  }
}
