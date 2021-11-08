import Gallery from './gallery';

console.log('app started');

const inputName = document.querySelector('.input-name');
const inputSrc = document.querySelector('.input-src');
const gallery = new Gallery(inputName, inputSrc);

gallery.init(document.querySelector('.button'));
