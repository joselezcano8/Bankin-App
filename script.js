'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations--content');

const btsnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const header = document.querySelector('.header');
const message = document.createElement('div');

const sections = document.querySelectorAll('.section');

const imgTargets = document.querySelectorAll('img[data-src]');

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');





const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Tabbed component
tabsContainer.addEventListener('click', function(e) {
  
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return

  clicked.classList.add('operations__tab--active');
  [...clicked.parentElement.children].forEach(function (el) {
    if (el !== clicked) el.classList.remove('operations__tab--active');
  })

  const current = document.querySelector(`.operations__content--${clicked.dataset.tab}`);

  current.classList.add('operations__content--active');
  [...current.parentElement.children].forEach(function (el) {
    if (el !== current) el.classList.remove('operations__content--active');
  })

})


//Menu fade animation
function handleHover(e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach (el => {
      if(el !== link) el.style.opacity = this;
    })
    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));


//Sticky Navigation
/*const initialCoords = section1.getBoundingClientRect()

window.addEventListener('scroll', function() {
  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
}) */

function stickyNav(entries) {
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {root: null, threshold: 0.1});
headerObserver.observe(header);


//Revealing navigations
function revealSct(entries) {
  const [entry] = entries;
  if(entry.isIntersecting) entry.target.classList.remove('section--hidden');
}

const sectionObserver = new IntersectionObserver(revealSct, {
  root: null,
  threshold: 0.15,
});

sections.forEach( sct => {
  sct.classList.add('section--hidden')
  sectionObserver.observe(sct);
});


//Lazy imgs
const imgObserver = new IntersectionObserver(loading, {root: null, threshold: 0.4});

function loading(entries, observer) {
  const [entry] = entries

  if(!entry.isIntersecting) return
  else {
    entry.target.src = entry.target.dataset.src;
    entry.target.classList.remove('lazy-img')
    observer.unobserve(entry.target);
  }
}

imgTargets.forEach(img => imgObserver.observe(img));


//Slider
let currentSlide = 0;
let maxSlide = slides.length-1

function createDots() {
  slides.forEach((s, i) => {
    dotContainer.insertAdjacentHTML('beforeend' ,
      `<button class="dots__dot" data-slide="${i}"></button>`)
  })
}
createDots()

function activeDot(slide) {
  const dots = document.querySelectorAll('.dots__dot');
  dots.forEach(dot => {
    dot.classList.remove('dots__dot--active');
    if (dot.dataset.slide == slide) dot.classList.add('dots__dot--active')
})
  
/*   clicked.classList.add('operations__tab--active');
  [...clicked.parentElement.children].forEach(function (el) {
    if (el !== clicked) el.classList.remove('operations__tab--active');
  }) */
};
activeDot(0)

function sliding(curSlide) {
  slides.forEach((s, i) => {
  s.style.transform = `translateX(${(i * 100) - (curSlide * 100) }%)`});
  activeDot(curSlide);
}
sliding(0)

function nextSlide() {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  }
  else currentSlide++
  sliding(currentSlide);
}

function prevSlide() {
  if (currentSlide === 0){
    currentSlide = maxSlide
  }
  else currentSlide--
  sliding(currentSlide);
}

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e) {
  e.key === 'ArrowRight' && nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
})

dotContainer.addEventListener('click', function(e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    sliding(slide);
    activeDot(slide);
  }
})


///////////////////////////////////////
///////////////////////////////////////
// Selecting elements

/* console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const allSections = document.querySelectorAll('.section');
console.log(allSections);
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);*/


// Creating and inserting elements

// .insertAdjacentHTML
//message.textContent = 'We used cookies for improved functionality and analytics';

message.classList.add('message');
message.innerHTML = 'We used cookies for improved functionality and analytics.<button class="btn btn--close--cookie">Got it!</button>';
header.prepend(message);

//Delete elements
const btnCookies = document.querySelector('.btn--close--cookie');

btnCookies.addEventListener('click', function() {
  message.remove();
})

// Styles
message.style.backgroundColor = '#37383d'
message.style.width = '120%'
//console.log(getComputedStyle(message).height);
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 15  + 'px';
//document.documentElement.style.setProperty('--color-primary', 'blue')

//Atributes
/*const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.getAttribute('src'));
console.log(logo.className); */


///////////////////////////////////////
///////////////////////////////////////
// Implementing smooth scrolling

btsnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect()
  /*console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll x/y: ', window.pageXOffset, window.pageYOffset);
  console.log('height/width viewport:', document.documentElement.clientHeight, document.documentElement.clientWidth); */

  //Scrolling
  //window.scrollTo(s1coords.left, s1coords.top + window.pageYOffset);
  /* window.scrollTo({
    left: s1coords.left,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth'
  }) */

  section1.scrollIntoView({behavior: 'smooth'})
})


///////////////////////////////////////
///////////////////////////////////////
// Types of Events and Events handlers

//const h1 = document.querySelector('h1');

//h1.addEventListener('mouseenter', function(e) {alert('addEventListener')});

//h1.onmouseenter = alert('Nice bro!');
//h1.onclick = alert('Click')

/* function alertH1(e) {
  alert('This alert will only appear 1 time');

  h1.removeEventListener('mouseenter', alertH1)
};

h1.addEventListener('mouseenter', alertH1) */


///////////////////////////////////////
///////////////////////////////////////
// Event propagation: Bubbling and Capturing

//rgb(255, 255, 255)
/* const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`


document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
   console.log(randomColor());
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
   console.log(randomColor());

  e.stopPropagation()
});

document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  console.log(randomColor());
}); */


///////////////////////////////////////
///////////////////////////////////////
// DOM Traversing

//const h1 = document.querySelector('h1');

//Going downwards: child
/* console.log(h1.querySelectorAll('.highlight'));
console.log(h1.children);

h1.firstElementChild.style.color = 'white';

//Going upwards
console.log(h1.parentNode);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)' */

//Going sideways
/* console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.75)'
}) */