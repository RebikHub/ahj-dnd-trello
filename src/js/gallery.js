export default class Gallery {
  constructor(inputName, inputSrc) {
    this.inputName = inputName;
    this.inputSrc = inputSrc;
    this.textName = null;
    this.textSrc = null;
  }

  init(inputButton) {
    this.inputName.addEventListener('input', this.inputNameValue.bind(this));
    this.inputSrc.addEventListener('input', this.inputSrcValue.bind(this));
    this.inputSrc.addEventListener('keyup', this.inputEnter.bind(this));
    this.inputName.addEventListener('keyup', this.inputEnter.bind(this));

    inputButton.addEventListener('click', this.inputButtonClick.bind(this));
  }

  inputNameValue(e) {
    this.textName = e.target.value;
  }

  inputSrcValue(e) {
    this.textSrc = e.target.value;
    document.querySelector('.error').style = 'display: none';
  }

  inputEnter(e) {
    if (e.key === 'Enter' && this.textName !== null && this.textSrc !== null) {
      Gallery.addBlockWithImg(this.textSrc, this.textName);
      document.querySelector('.input-name').value = null;
      document.querySelector('.input-src').value = null;
      this.textName = null;
      this.textSrc = null;
    }
  }

  inputButtonClick() {
    if (this.textSrc !== null && this.textName !== null) {
      Gallery.addBlockWithImg(this.textSrc, this.textName);
      document.querySelector('.input-name').value = null;
      document.querySelector('.input-src').value = null;
      this.textName = null;
      this.textSrc = null;
    }
  }

  static addBlockWithImg(url, name) {
    if (url) {
      const widget = document.querySelector('.images-list');
      const divImg = document.createElement('div');
      const span = document.createElement('span');
      const image = document.createElement('img');
      divImg.classList.add('image');
      span.classList.add('close-image');
      divImg.appendChild(image);
      divImg.appendChild(span);
      widget.appendChild(divImg);
      image.src = url;
      image.alt = name;
      image.onerror = Gallery.verifyUrl;
    }
    Gallery.removeImage();
  }

  static verifyUrl() {
    const list = document.querySelectorAll('.image');
    list[list.length - 1].remove();
    document.querySelector('.error').style = 'display: block';
    document.querySelector('.input-src').value = null;
  }

  static removeImage() {
    const closeList = document.querySelectorAll('.close-image');
    for (const item of closeList) {
      item.addEventListener('click', () => {
        item.closest('.image').remove();
      });
    }
  }
}
