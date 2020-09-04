Splitting();

// SMOOTH SCROLLING
function init() {
  new SmoothScroll(document, 40, 12);
}

function SmoothScroll(target, speed, smooth) {
  if (target === document)
    target =
      document.scrollingElement ||
      document.documentElement ||
      document.body.parentNode ||
      document.body;

  var moving = false;
  var pos = target.scrollTop;
  var frame =
    target === document.body && document.documentElement
      ? document.documentElement
      : target;

  target.addEventListener("mousewheel", scrolled, { passive: false });
  target.addEventListener("DOMMouseScroll", scrolled, { passive: false });

  function scrolled(e) {
    e.preventDefault();

    var delta = normalizeWheelDelta(e);

    pos += -delta * speed;
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight));

    if (!moving) update();
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1);
      else return -e.detail / 3;
    } else return e.wheelDelta / 120;
  }

  function update() {
    moving = true;

    var delta = (pos - target.scrollTop) / smooth;

    target.scrollTop += delta;

    if (Math.abs(delta) > 0.5) requestFrame(update);
    else moving = false;
  }

  var requestFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  })();
}
// SMOOTH SCROLLING

// zoom on scroll
const tl = new TimelineLite();

tl.to(".zoom", 2, {
  transform: "scale(20)",
  ease: Power2.easeOut,
});

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
  triggerElement: ".hero",
  duration: 2000,
  triggerHook: 0,
})
  .setTween(tl)
  .addTo(controller);

// ********

const tl2 = new TimelineLite();

tl2.fromTo(
  ".background-content",
  2,
  {
    opacity: "1",
    ease: Power2.easeOut,
  },
  {
    opacity: "0",
    ease: Power2.easeOut,
  }
);

const controller2 = new ScrollMagic.Controller();

const scene2 = new ScrollMagic.Scene({
  triggerElement: ".hero",
  duration: 1000,
  triggerHook: 0,
})
  .setTween(tl2)

  .addTo(controller2);

// zoom on scroll

const mouseCursorImage = document.querySelector(".mouseCursorImage");
const first = document.querySelector(".first");
const projects = document.querySelectorAll(".project");

function moveImage(e) {
  TweenLite.to(mouseCursorImage, 0.3, {
    css: {
      left: e.pageX,
      top: e.pageY,
    },
  });
}

window.addEventListener("mousemove", moveImage);

projects.forEach((project, index) => {
  project.addEventListener("mouseleave", () => {
    mouseCursorImage.classList.remove("mouseCursorHover");
    mouseCursorImage.style.display = "none";
  });
});
projects.forEach((project, index) => {
  project.addEventListener("mouseover", () => {
    if (index === 0) {
      mouseCursorImage.classList.add("mouseCursorHover");
      mouseCursorImage.style.backgroundImage =
        "url('https://kulbachny.com/wp-content/uploads/2019/12/Umami.jpg')";
      mouseCursorImage.style.display = "block";
    } else if (index === 1) {
      mouseCursorImage.classList.add("mouseCursorHover");
      mouseCursorImage.style.backgroundImage =
        "url('https://kulbachny.com/wp-content/uploads/2019/12/work-2.jpg')";
      mouseCursorImage.style.display = "block";
    } else if (index === 2) {
      mouseCursorImage.classList.add("mouseCursorHover");
      mouseCursorImage.style.backgroundImage =
        "url('https://kulbachny.com/wp-content/uploads/2019/12/work-1.jpg')";
      mouseCursorImage.style.display = "block";
    } else if (index === 3) {
      mouseCursorImage.classList.add("mouseCursorHover");
      mouseCursorImage.style.backgroundImage =
        "url('https://kulbachny.com/wp-content/uploads/2019/12/OpenGraph-875x560.jpg')";
      mouseCursorImage.style.display = "block";
    } else if (index === 4) {
      mouseCursorImage.classList.add("mouseCursorHover");
      mouseCursorImage.style.backgroundImage =
        "url('https://kulbachny.com/wp-content/uploads/2019/12/Facebook-Post-EN-1-875x560.png')";
      mouseCursorImage.style.display = "block";
    } else {
      mouseCursorImage.classList.add("mouseCursorHover");
      mouseCursorImage.style.backgroundImage =
        "url('https://kulbachny.com/wp-content/uploads/2019/12/uberem-875x560.jpg')";
      mouseCursorImage.style.display = "block";
    }
  });
});

const main = document.querySelector(".main-box");
let counter = 0;
const ounterBox = document.querySelector(".outer-box");

main.addEventListener(
  "wheel",
  (e) => {
    let width = window.innerWidth;
    if (width >= 800) {
      e.preventDefault();
      if (event.wheelDelta > 0) {
        counter -= 10;
        if (counter >= 0) {
          ounterBox.style.transform =
            "perspective(2000px) rotateX(" + counter + "deg)";
        } else {
          counter = 0;
          e.preventDefault;
          return;
        }
      } else {
        counter += 10;
        if (counter <= 180) {
          ounterBox.style.transform =
            "perspective(2000px) rotateX(" + counter + "deg)";
        } else {
          counter = 180;
          e.preventDefault;
          return;
        }
      }
    }
  },
  { passive: false }
);

function changeSticker() {
  const sticker = document.querySelector(".awwwards-sticker");
  let trigger = document.querySelector(".hero-extension");
  let introPosition = trigger.getBoundingClientRect().top;
  let screenPosition = window.innerHeight / 2;

  if (introPosition < screenPosition) {
    sticker.style.color = "#000";
    sticker.style.backgroundColor = "#d3cfcf";
  } else {
    sticker.style.color = "#fff";
    sticker.style.backgroundColor = "#040404";
  }
}

window.addEventListener("scroll", changeSticker);
