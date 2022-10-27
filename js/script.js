const countries = [
  {
    idCountry: 1,
    name: "Svezia",
    imgSrc: "http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg",
    description: "Svezia - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, aliquid?"
  },
  {
    idCountry: 2,
    name: "Peru",
    imgSrc: "https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg",
    description: "Peru - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, aliquid?"
  },
  {
    idCountry: 3,
    name: "Chile",
    imgSrc: "https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c",
    description: "Chile - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, aliquid?"
  },
  {
    idCountry: 4,
    name: "Argentina",
    imgSrc: "https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg",
    description: "Argentina - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, aliquid?"
  },
  {
    idCountry: 5,
    name: "Colombia",
    imgSrc: "https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop",
    description: "Colombia - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, aliquid?"
  }
];

console.log(countries);

let counter = 0, lastCounter = 0, speed = 1;
let autoplay, isOver = false, isInverted = false;
const slider = document.querySelector('.slider');
const gallery = document.querySelector('.gallery');
const container = document.querySelector('.content-container');
const sliderCountries = [], galleryCountries = [];
const btnSlow = document.querySelector('.fa-droplet');
const btnFast = document.querySelector('.fa-crow');

/* const changespeed = (value) => (value >= 1) ? speed = value : speed;
 */
//? Inizializzazione slider e autoplay
initSlider();
autoplay = initClock();

//? Listener mouse over
container.addEventListener('mouseenter', function () {
  isOver = true;
});

//? Listener mouse leave
container.addEventListener('mouseleave', function () {
  isOver = false;
});

//? Listener btnSlow 
btnSlow.addEventListener('click', function () {
  autoplay = changespeed(speed + 0.1);
});

//? Listener btnFast
btnFast.addEventListener('click', function () {
  autoplay = changespeed(speed - 0.1);
});

//? Listener per invertire la direzione di scorrimento 
document.body.onkeyup = function (e) {
  if (e.key == " " ||
    e.code == "Space" ||
    e.keyCode == 32
  ) {
    if (!isInverted) isInverted = true;
    else isInverted = false;
  }
}

//? Creazione slider
function initSlider() {
  countries.forEach(country => {
    //? creazione slider nel DOM
    slider.innerHTML += createSlide(country);
    // ? push dell'elemento creato in sliderCountries
    sliderCountries.push(slider.lastElementChild);

    const thumb = createThumb(country);
    gallery.append(thumb);
    galleryCountries.push(thumb);
  });

  document.getElementById(sliderCountries[counter].id).classList.remove('d-none');
  document.getElementById(galleryCountries[counter].id).classList.add('active');

}

//? crea la slide del paese passato come parametro
function createSlide(object) {
  const slide = `
    <div id="country${object.idCountry}" class="slide w-100 h-100 d-none">
      <img class="h-100 w-100" src="${object.imgSrc}" alt="">
      <div class="details">
        <h3>${object.name}</h3>
        <p>${object.description}</p>
      </div>
    </div>
  `;

  return slide;
}

//? crea la thumb del paese passato come parametro
function createThumb(object) {
  const thumb = document.createElement('img');
  thumb.src = object.imgSrc;
  thumb.id = "thumb" + object.idCountry;
  thumb.classList.add('gallery-slide');
  thumb.addEventListener('click', function () {
    moveAt(parseInt(thumb.id.charAt(thumb.id.length - 1)));
  });

  return thumb;
}

//? Inizializza l'autoplay
function initClock() {
  return setInterval(function () {
    if (!isOver) {
      if (!isInverted)
        moveSlider(true);
      else
        moveSlider(false);
    }
  }, (speed * 1000));
}

//? Cambia slide a seconda del valore booleano
/**
 * 
 * @param {true: next, false: prev} value 
 */
function moveSlider(value) {
  addClasses();
  if (value) {
    if (counter === (sliderCountries.length - 1)) counter = -1;
    counter++;
  }

  else {
    if (counter === 0) counter = sliderCountries.length;
    counter--;
  }
  removesClasses();
}

//? Spostamento diretto verso la slide desiderata
function moveAt(index) {
  addClasses();
  counter = index - 1;
  removesClasses();
}

//? Aggiunta - rimozione di classi per non visualizzare gli elementi passati
function addClasses() {
  document.getElementById(sliderCountries[counter].id).classList.add('d-none');
  document.getElementById(galleryCountries[counter].id).classList.remove('active');
}

function removesClasses() {
  document.getElementById(sliderCountries[counter].id).classList.remove('d-none');
  document.getElementById(galleryCountries[counter].id).classList.add('active');
}

function changespeed(value) {
  if (value >= 0.1) {
    clearInterval(autoplay);
    speed = value;
    return initClock(autoplay);
  }

  return autoplay;
}