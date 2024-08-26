'use strict';

///////////////////////////////////////
// Constants

//Modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

//Cookies
const header = document.querySelector('.header');
const message = document.createElement('div');

//Nav fade
const headerObserver = new IntersectionObserver(stickyNav, {root: null, threshold: 0.1});
const nav = document.querySelector('.nav');

//Scroll Animation
const btsnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//Reveal Sect
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver(revealSct, {
    root: null,
    threshold: 0.15,
});

//Tab Content
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations--content');

//Lazy Images
const imgTargets = document.querySelectorAll('img[data-src]');
const imgObserver = new IntersectionObserver(loading, {root: null, threshold: 0.4});

//Slides
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');


///////////////////////////////////////
// Modal window

function openModal(e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

function closeModal() {
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


///////////////////////////////////////
// Cookie Message

/* message.classList.add('message');
message.innerHTML = 'We used cookies for improved functionality and analytics.<button class="btn btn--close--cookie">Got it!</button>';
header.prepend(message);
message.style.backgroundColor = '#37383d'
message.style.width = '120%'
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 15  + 'px';

const btnCookies = document.querySelector('.btn--close--cookie');

btnCookies.addEventListener('click', function(e) {
  message.remove();
}) */


///////////////////////////////////////
// Implementing smooth scrolling

btsnScrollTo.addEventListener('click', function() {
    section1.scrollIntoView({behavior: 'smooth'})
})
  

///////////////////////////////////////
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


///////////////////////////////////////
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

function stickyNav(entries) {
    const [entry] = entries;
    if(!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky')
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

headerObserver.observe(header);


///////////////////////////////////////
//Revealing navigations

function revealSct(entries) {
  const [entry] = entries;
  if(entry.isIntersecting) entry.target.classList.remove('section--hidden');
}

sections.forEach( sct => {
  sct.classList.add('section--hidden')
  sectionObserver.observe(sct);
});


///////////////////////////////////////
//Lazy imgs

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

///////////////////////////////////////
//Slider
let currentSlide = 0;
let maxSlide = slides.length-1

function createDots() {
  slides.forEach((s, i) => {
    dotContainer.insertAdjacentHTML('beforeend' ,
      `<button class="dots__dot" data-slide="${i}"></button>`)
  })
};

function activeDot(slide) {
  const dots = document.querySelectorAll('.dots__dot');
  dots.forEach(dot => {
    dot.classList.remove('dots__dot--active');
    if (dot.dataset.slide == slide) dot.classList.add('dots__dot--active')
})

};

function sliding(curSlide) {
  slides.forEach((s, i) => {
  s.style.transform = `translateX(${(i * 100) - (curSlide * 100) }%)`});
  activeDot(curSlide);
};

function nextSlide() {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  }
  else currentSlide++
  sliding(currentSlide);
};

function prevSlide() {
  if (currentSlide === 0){
    currentSlide = maxSlide
  }
  else currentSlide--
  sliding(currentSlide);
};

function init() {
    createDots();
    activeDot(0);
    sliding(0);
}
init()

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
// Implementing smooth scrolling

btsnScrollTo.addEventListener('click', function() {
  section1.scrollIntoView({behavior: 'smooth'})
})
