export default class Memory {
  constructor() {
    this.storage = localStorage;
    this.todo = todo;
    this.progress = progress;
    this.done = done;
  }

  save(object) {
    let card = JSON.parse(this.storage.getItem('card'));
    if (card === null) {
      card = {
        todo: [],
        progress: [],
        done: [],
      };
    }

    if (object.todo) {
      card.todo.push(object.todo);
    } else if (object.progress) {
      card.progress.push(object.progress);
    } else if (object.done) {
      card.done.push(object.done);
    }
    this.storage.setItem('card', JSON.stringify(card));
  }

  load() {
    try {
      const card = JSON.parse(this.storage.getItem('card'));
      return card;
    } catch (error) {
      throw new Error(error);
    }
  }

  clear() {
    this.storage.removeItem('card');
  }

  updateCards() {
    this.storage.clear();
    for (const i of this.todo.children) {
      const text = i.textContent;
      this.storage.save({ todo: text.slice(0, text.length - 1) });
    }
    for (const i of this.progress.children) {
      const text = i.textContent;
      this.storage.save({ progress: text.slice(0, text.length - 1) });
    }
    for (const i of this.done.children) {
      const text = i.textContent;
      this.storage.save({ done: text.slice(0, text.length - 1) });
    }
  }
}
