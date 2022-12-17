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
          <img src="${image.src}" alt="city" />
          <h3>${image.name}</h3>
        </div>`;
      })
      .join('');

    var homeImages = images[i].home
      .map((image) => {
        return `<div class="image">
          <img src="${image.src}" alt="city" />
          <h3>${image.name}</h3>
        </div>`;
      })
      .join('');
  }

  cityArticle.innerHTML = cityImages;
  homeArticle.innerHTML = homeImages;
}

function getElement(identifier) {
  const element = document.querySelector(identifier);

  if (element) {
    return element;
  }
  throw new Error(`Identifier "${identifier}" not found!!!`);
}