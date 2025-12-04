gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
});

gsap.ticker.lagSmoothing(0);

const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const overlay = document.querySelector('.menu-overlay');

function closeMenu() {
  hamburger.classList.remove('open');
  menu.classList.remove('open');
  overlay.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

hamburger.addEventListener('click', function (e) {
  e.stopPropagation();
  const isOpen = hamburger.classList.toggle('open');
  menu.classList.toggle('open');
  overlay.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

overlay.addEventListener('click', closeMenu);
document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 1000) closeMenu();
});

ScrollTrigger.matchMedia({
  "(min-width: 769px)": function () {
    gsap.to(".hero_left, .hero_right", {
      y: "50%",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  },
});

ScrollTrigger.matchMedia({
  "(min-width: 769px)": function () {
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".about",
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 1,
      },
    });

    const text = new SplitType(".fade-text", { types: "words" });
    aboutTl.from(text.words, {
      opacity: 0.1,
      stagger: 0.1,
    });
  },

  "(max-width: 768px)": function () {
    const text = new SplitType(".fade-text", { types: "chars" });
    gsap.fromTo(
      text.chars,
      { opacity: 0.1 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: ".fade-text",
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        },
        stagger: 0.05,
        duration: 1.2,
      }
    );
  },
});

gsap.from(".services_header > *", {
  scrollTrigger: {
    trigger: ".services",
    start: "top 80%",
  },
  opacity: 0,
  y: 30,
  duration: 1,
  ease: "power3.out"
});

ScrollTrigger.matchMedia({
  "(min-width: 769px)": function () {
    gsap.to(".reviews", {
      marginTop: "-20vh",
      scrollTrigger: {
        trigger: ".services",
        start: "center center",
        end: "bottom top",
        scrub: true,
      },
    });
  },
  "(max-width: 768px)": function () {
    gsap.to(".reviews", {
      marginTop: "-5vh",
      scrollTrigger: {
        trigger: ".services",
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }
});





gsap.from(".reviews_header > *", {
  scrollTrigger: {
    trigger: ".reviews",
    start: "top 80%",
  },
  opacity: 0,
  y: 30,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

gsap.from(".review-card", {
  scrollTrigger: {
    trigger: ".reviews_container",
    start: "top 80%",
  },
  opacity: 0,
  y: 50,
  stagger: 0.2,
  duration: 0.8,
  ease: "power3.out"
});

gsap.from(".footer_container > *", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 95%",
  },
  opacity: 0,
  y: 40,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});

const track = document.querySelector(".reviews_track");
let cards = Array.from(document.querySelectorAll(".review-card"));
const nextBtn = document.querySelector(".reviews_arrow.next");
const prevBtn = document.querySelector(".reviews_arrow.prev");

function getVisibleCards() {
  return window.innerWidth <= 768 ? 1 : 3;
}

let visibleCards = getVisibleCards();
let index = visibleCards;
let autoplayInterval;
let isTransitioning = false;

function buildCarousel() {
  track.innerHTML = '';
  cards.forEach(card => track.appendChild(card));

  // Teraz dodaj klony
  const startClones = cards.slice(-visibleCards).map(c => {
    const clone = c.cloneNode(true);
    clone.classList.add('clone');
    return clone;
  });
  const endClones = cards.slice(0, visibleCards).map(c => {
    const clone = c.cloneNode(true);
    clone.classList.add('clone');
    return clone;
  });

  startClones.forEach(c => track.insertBefore(c, track.firstChild));
  endClones.forEach(c => track.appendChild(c));

  index = visibleCards;
  updateSlider(false);
}

function updateSlider(animate = true) {
  const allCards = Array.from(track.children);
  if (allCards.length === 0) return;

  const cardWidth = allCards[0].offsetWidth;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;

  const moveAmount = (cardWidth + gap) * index;

  track.style.transition = animate ? "transform .45s ease" : "none";
  track.style.transform = `translateX(-${moveAmount}px)`;
}

function nextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  index++;
  updateSlider(true);
}

function prevSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  index--;
  updateSlider(true);
}

track.addEventListener("transitionend", () => {
  isTransitioning = false;

  const totalWithClones = track.children.length;
  const realCardsCount = cards.length;

  if (index >= realCardsCount + visibleCards) {
    index = visibleCards;
    updateSlider(false);
  }
  else if (index < visibleCards) {
    index = realCardsCount + visibleCards - 1;
    updateSlider(false);
  }
});

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

function startAutoplay() {
  stopAutoplay();
  autoplayInterval = setInterval(nextSlide, 4000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

track.addEventListener("mouseenter", stopAutoplay);
track.addEventListener("mouseleave", startAutoplay);
track.addEventListener("touchstart", stopAutoplay, { passive: true });

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const newVisibleCards = getVisibleCards();
    if (newVisibleCards !== visibleCards) {
      visibleCards = newVisibleCards;
      buildCarousel();
    } else {
      updateSlider(false);
    }
  }, 100);
});

window.addEventListener('load', () => {
  buildCarousel();
  startAutoplay();
});
if (document.readyState === 'complete') {
  buildCarousel();
  startAutoplay();
}
