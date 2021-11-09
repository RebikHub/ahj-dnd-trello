import Memory from './memory';
import Trello from './trello';
import DnD from './dnd';

console.log('app started');

const storage = new Memory();
const trello = new Trello(storage);
const dragged = new DnD(storage);

trello.events();
dragged.events();
