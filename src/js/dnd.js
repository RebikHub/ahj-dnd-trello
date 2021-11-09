export default class DnD {
  constructor(storage) {
    this.container = document.querySelector('#container');
    this.todo = document.querySelector('.todo-in');
    this.progress = document.querySelector('.progress-in');
    this.dndIn = document.querySelectorAll('.dnd-in');
    this.done = document.querySelector('.done-in');
    this.cloneEl = null;
    this.draggedEl = null;
    this.storage = storage;
  }

  events() {
    this.dragMouseDown(this.dndIn);
    this.dragMouseMove(this.container);
    this.dragMouseLeave(this.container);
    this.dropElement(this.container);
  }

  dragMouseDown(element) {
    for (const i of element) {
      i.addEventListener('mousedown', (ev) => {
        ev.preventDefault();
        if (!ev.target.classList.contains('new-div')) {
          return;
        }
        this.draggedEl = ev.target;
        this.cloneEl = ev.target.cloneNode(true);
        this.cloneEl.classList.add('dragged');
        this.container.style = 'cursor: grabbing';
        document.body.appendChild(this.cloneEl);
        this.cloneEl.style.left = `${ev.pageX - this.cloneEl.offsetWidth / 2}px`;
        this.cloneEl.style.top = `${ev.pageY - this.cloneEl.offsetHeight / 2}px`;
      });
    }
  }

  dragMouseMove(element) {
    element.addEventListener('mousemove', (ev) => {
      ev.preventDefault();
      if (!this.draggedEl) {
        return;
      }
      this.cloneEl.style.left = `${ev.pageX - this.cloneEl.offsetWidth / 2}px`;
      this.cloneEl.style.top = `${ev.pageY - this.cloneEl.offsetHeight / 2}px`;
    });
  }

  dragMouseLeave(element) {
    element.addEventListener('mouseleave', () => {
      if (!this.draggedEl) {
        return;
      }
      document.body.removeChild(this.cloneEl);
      this.cloneEl = null;
      this.draggedEl = null;
    });
  }

  dropElement(element) {
    element.addEventListener('mouseup', (ev) => {
      if (!this.draggedEl) {
        return;
      }
      const closest = document.elementFromPoint(ev.clientX, ev.clientY);
      if (closest.parentElement.classList.contains('todo-in')) {
        closest.parentElement.insertBefore(this.draggedEl, closest);
      } else if (closest.parentElement.classList.contains('progress-in')) {
        closest.parentElement.insertBefore(this.draggedEl, closest);
      } else if (closest.parentElement.classList.contains('done-in')) {
        closest.parentElement.insertBefore(this.draggedEl, closest);
      // } else {
      //   closest.parentElement.insertBefore(this.draggedEl, closest);
      }
      document.body.removeChild(this.cloneEl);
      this.container.style = '';
      this.cloneEl = null;
      this.draggedEl = null;
      this.storage.updateCards(this.todo, this.progress, this.done);
    });
  }
}
