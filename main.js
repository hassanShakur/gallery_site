const images = [
  {
    city: [
      {
        name: 'City 1',
        src: './images/city/city-1.jpg',
      },
      {
        name: 'City 2',
        src: './images/city/city-2.jpg',
      },
      {
        name: 'City 3',
        src: './images/city/city-3.jpg',
      },
      {
        name: 'City 4',
        src: './images/city/city-4.jpg',
      },
      {
        name: 'City 5',
        src: './images/city/city-5.jpg',
      },
      {
        name: 'City 6',
        src: './images/city/city-6.jpg',
      },
    ],

    home: [
      {
        name: 'home 1',
        src: './images/home/home-1.jpg',
      },
      {
        name: 'home 2',
        src: './images/home/home-2.jpg',
      },
      {
        name: 'home 3',
        src: './images/home/home-3.jpg',
      },
      {
        name: 'home 4',
        src: './images/home/home-4.jpg',
      },
      {
        name: 'home 5',
        src: './images/home/home-5.jpg',
      },
      {
        name: 'home 6',
        src: './images/home/home-6.jpg',
      },
    ],
  },
];

const cityArticle = getElement('.city-images');
const homeArticle = getElement('.home-images');
const preLoader = getElement('.loader');

window.addEventListener('load', vanishLoader);
window.addEventListener('DOMContentLoaded', loadImages);

function vanishLoader() {
  preLoader.classList.add('vanish');
}

function loadImages() {
  for (let i = 0; i < images.length; i++) {
    var cityImages = images[i].city
      .map((image) => {
        return `<div class="image">
          <img src="${
            image.src
          }" alt="city" class="img" title="city ${image.name.slice(-1)}" />
          <h3>${image.name}</h3>
        </div>`;
      })
      .join('');

    var homeImages = images[i].home
      .map((image) => {
        return `<div class="image">
          <img src="${
            image.src
          }" alt="home" class="img" title="city ${image.name.slice(-1)}" />
          <h3>${image.name}</h3>
        </div>`;
      })
      .join('');
  }

  cityArticle.innerHTML = cityImages;
  homeArticle.innerHTML = homeImages;

  new Gallery(cityArticle);
  new Gallery(homeArticle);
  console.log(cityArticle);
}

function getElement(identifier) {
  const element = document.querySelector(identifier);

  if (element) {
    return element;
  }
  throw new Error(`Identifier "${identifier}" not found!!!`);
}

class Gallery {
  constructor(element) {
    this.container = element;
    this.list = [...element.querySelectorAll('.img')];
    // target
    this.modal = getElement('.modal');
    this.modalImg = getElement('.main-img');
    this.imageName = getElement('.image-name');
    this.modalImages = getElement('.modal-images');
    this.closeBtn = getElement('.close-btn');
    this.nextBtn = getElement('.next-btn');
    this.prevBtn = getElement('.prev-btn');

    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.chooseModalImage = this.chooseModalImage.bind(this);

    // container event
    this.container.addEventListener(
      'click',
      function (e) {
        if (e.target.classList.contains('img')) {
          this.openModal(e.target, this.list);
        }
      }.bind(this)
    );
  }

  // Open Modal
  openModal(selectedImage, list) {
    this.setMainImage(selectedImage);
    this.modalImages.innerHTML = list
      .map(function (image) {
        return `<img src="${
          image.src
        }" title="${image.title}" data-id="${image.dataset.id}" class="${selectedImage.src === image.src ? 'modal-img selected' : 'modal-img'}"/>`;
      })
      .join('');
    this.modal.classList.add('open');
    this.closeBtn.addEventListener('click', this.closeModal);
    this.nextBtn.addEventListener('click', this.nextImage);
    this.prevBtn.addEventListener('click', this.prevImage);
    this.modalImages.addEventListener('click', this.chooseModalImage);
  }

  // Set main image
  setMainImage(selectedImage) {
    this.modalImg.src = selectedImage.src;
    this.imageName.textContent = selectedImage.title;
  }

  // Close modal
  closeModal() {
    this.modal.classList.remove('open');
    this.closeBtn.removeEventListener('click', this.closeModal);
    this.nextBtn.removeEventListener('click', this.nextImage);
    this.prevBtn.removeEventListener('click', this.prevImage);
    this.modalImages.removeEventListener('click', this.chooseModalImage);
  }

  // Move to next modal image
  nextImage() {
    const selected = this.modalImages.querySelector('.selected');
    const next =
      selected.nextElementSibling || this.modalImages.firstElementChild;
    selected.classList.remove('selected');
    next.classList.add('selected');
    this.setMainImage(next);
  }

  // Move to prev modal image
  prevImage() {
    const selected = this.modalImages.querySelector('.selected');
    const prev =
      selected.previousElementSibling || this.modalImages.lastElementChild;
    selected.classList.remove('selected');
    prev.classList.add('selected');
    this.setMainImage(prev);
  }

  // Choose modal image
  chooseModalImage(e) {
    if (e.target.classList.contains('modal-img')) {
      const selected = this.modalImages.querySelector('.selected');
      selected.classList.remove('selected');

      this.setMainImage(e.target);
      e.target.classList.add('selected');
    }
  }
}
