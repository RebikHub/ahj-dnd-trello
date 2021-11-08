import Trello from './trello';

console.log('app started');

const trello = new Trello();

Trello.renderDom();

trello.events();
