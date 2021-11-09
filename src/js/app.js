import Trello from './trello';
import DnD from './dnd';

console.log('app started');

const trello = new Trello();
const dragged = new DnD();

trello.events();
// dragged.events();
