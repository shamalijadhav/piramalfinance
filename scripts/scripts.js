import { sampleRUM, loadHeader, loadFooter, decorateButtons, decorateIcons, decorateSections, decorateBlocks, decorateTemplateAndTheme, waitForLCP, loadBlocks, loadCSS } from "./aem.js";
const LCP_BLOCKS = []; // add your LCP blocks to the list

/**
 * Moves all the attributes from a given elmenet to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveAttributes(from, to, attributes) {
  if (!attributes) {
    // eslint-disable-next-line no-param-reassign
    attributes = [...from.attributes].map(({ nodeName }) => nodeName);
  }
  attributes.forEach((attr) => {
    const value = from.getAttribute(attr);
    if (value) {
      to.setAttribute(attr, value);
      from.removeAttribute(attr);
    }
  });
}

/* helper script start */
export let targetObject = {
  model: null,
};

export function renderHelper(data, template, callBack) {
  var dom = document.createElement("div");
  dom.innerHTML = template;
  var loopEl = dom.getElementsByClassName("forName");
  Array.prototype.slice.call(loopEl).forEach(function (eachLoop) {
    var templates = "";
    var localtemplate = eachLoop.innerHTML;
    for (var key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        var element = data[key];
        // data.forEach(function (element, index) {
        var dataItem = callBack ? callBack(element, key) : element;
        var keys = Object.keys(dataItem);
        var copyTemplate = localtemplate;
        copyTemplate.split("{").forEach(function (ecahKey) {
          var key = ecahKey.split("}")[0];
          var keys = key.split(".");
          var value = dataItem;
          keys.forEach(function (key) {
            if (value && value.hasOwnProperty(key)) {
              value = value[key];
            } else {
              value = "";
            }
          });
          copyTemplate = copyTemplate.replace("{" + key + "}", value);
        });
        templates += copyTemplate;
        // });
      }
    }
    eachLoop.outerHTML = templates;
  });
  return dom.innerHTML;
}

export function fetchAPI(method, url, data) {
  return new Promise(async function (resolve, reject) {
    try {
      if (method === "GET") {
        const resp = await fetch(url);
        resolve(resp);
      } else if (method === "POST") {
        data.headerJson = data.headerJson || {
          "Content-Type": "application/json",
        }
        data.headerJson["Content-Type"] = data.headerJson["Content-Type"] ? data.headerJson["Content-Type"] : "application/json";
        const request = new Request(url, {
          method: "POST",
          body: JSON.stringify(data.requestJson),
          headers: data.headerJson
        });
        const response = await fetch(request);
        const json = await response.json();
        resolve({ responseJson: json });
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function getProps(block, config) {
  return Array.from(block.children).map(function (el, index) {
    if (config?.picture) {
      return el.innerHTML.includes("picture") ? el.querySelector("picture") : el.innerText.trim();
    } else if (config?.index && config?.index.includes(index)) {
      return el;
    } else {
      return el.innerHTML.includes("picture") ? el.querySelector("img").src.trim() : el.innerText.trim();
    }
  });
}

export function currenyCommaSeperation(x) {
  if (typeof x === "number") {
    x = x.toString();
  }

  // Split the number into integral and decimal parts
  const parts = x.split(".");
  let integralPart = parts[0];
  const decimalPart = parts[1] ? `.${parts[1]}` : "";

  // Add commas after every two digits from the right in the integral part
  integralPart = integralPart.replace(/\d(?=(\d{2})+\d$)/g, "$&,");

  return integralPart + decimalPart;
}

export function createCarousle(block, prevButton, nextButton) {
  block.parentElement.append(prevButton);
  block.parentElement.append(nextButton);
  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);
  let currentSlide = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  const carousel = block;
  const carouselInner = block.querySelector("#carouselInner");
  const slides = block.querySelectorAll(".carousel-item");
  const totalSlides = slides.length;

  let visibleSlides = getVisibleSlides(); // Get initial number of visible slides

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mouseup", dragEnd);
  carousel.addEventListener("mouseleave", dragEnd);
  carousel.addEventListener("mousemove", drag);

  carousel.addEventListener("touchstart", dragStart);
  carousel.addEventListener("touchend", dragEnd);
  carousel.addEventListener("touchmove", drag);

  carousel.addEventListener("wheel", scrollEvent); // Add scroll event listener
  window.addEventListener("resize", () => {
    visibleSlides = getVisibleSlides();
    setPositionByIndex();
  });

  function dragStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    carouselInner.style.transition = "none";
  }

  function dragEnd() {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100) {
      nextSlide();
    } else if (movedBy > 100) {
      prevSlide();
    } else {
      setPositionByIndex();
    }
  }

  function drag(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
      carouselInner.style.transform = `translateX(${currentTranslate}px)`;
    }
  }

  function getPositionX(event) {
    return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
  }

  function getVisibleSlides() {
    return window.innerWidth <= 600 ? 2 : 4;
  }

  function showSlide(index) {
    if (index >= slides.length) {
      // currentSlide = 0;
    } else if (index < 0) {
      // currentSlide = slides.length - 1;
    } else {
    }
    currentSlide = Math.max(0, Math.min(index, totalSlides - visibleSlides));
    setPositionByIndex();
  }

  function setPositionByIndex() {
    currentTranslate = (currentSlide * -carouselInner.clientWidth) / visibleSlides;
    prevTranslate = currentTranslate;
    carouselInner.style.transition = "transform 0.5s ease";
    carouselInner.style.transform = `translateX(${currentTranslate}px)`;
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
    checkLastChildVisibility();
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
    checkLastChildVisibility();
  }

  function scrollEvent(event) {
    if (event.deltaY < 0) {
      prevSlide();
    } else {
      nextSlide();
    }
    event.preventDefault();
  }

  // Initialize the carousel
  showSlide(currentSlide);

  // Check if the last child is visible in the viewport
  function checkLastChildVisibility() {
    const lastChild = carouselInner.lastElementChild;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Last child is visible in the viewport - new");
          } else {
            console.log("Last child is not visible in the viewport - new ");
          }
        });
      },
      {
        root: carousel,
        threshold: 0.1,
      }
    );

    observer.observe(lastChild);
  }

  // Initialize the observer for the first time
  checkLastChildVisibility();
}

export function createButton(text, picture) {
  const button = document.createElement("button");
  button.classList.add("carousel-control", text);
  button.innerHTML = (picture)
  return button;
}
/* helper script end */

/**
 * Move instrumentation attributes from a given element to another given element.
 * @param {Element} from the element to copy attributes from
 * @param {Element} to the element to copy attributes to
 */
export function moveInstrumentation(from, to) {
  moveAttributes(
    from,
    to,
    [...from.attributes].map(({ nodeName }) => nodeName).filter((attr) => attr.startsWith("data-aue-") || attr.startsWith("data-richtext-"))
  );
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes("localhost")) sessionStorage.setItem("fonts-loaded", "true");
  } catch (e) {
    // do nothing
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks() {
  try {
    // TODO: add auto block, if needed
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Auto Blocking failed", error);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = "en";
  decorateTemplateAndTheme();
  const main = doc.querySelector("main");
  if (main) {
    decorateMain(main);
    document.body.classList.add("appear");
    await waitForLCP(LCP_BLOCKS);
  }

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem("fonts-loaded")) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector("main");
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  loadHeader(doc.querySelector("header"));
  loadFooter(doc.querySelector("footer"));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();

  sampleRUM("lazy");
  sampleRUM.observe(main.querySelectorAll("div[data-block-name]"));
  sampleRUM.observe(main.querySelectorAll("picture > img"));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import("./delayed.js"), 3000);
  // load anything that can be postponed to the latest here
  import("./sidekick.js").then(({ initSidekick }) => initSidekick());
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
  await loadingCustomCss();
}

loadPage();

async function loadingCustomCss() {
  // load custom css files
  var loadCssArray = [
    `${window.hlx.codeBasePath}/styles/loanproducts/loanproducts.css`,
    `${window.hlx.codeBasePath}/styles/calculator/calculator.css`,
    `${window.hlx.codeBasePath}/styles/choose-us/choose-us.css`,
    `${window.hlx.codeBasePath}/styles/download-piramal/download-piramal.css`,
    `${window.hlx.codeBasePath}/styles/our-media/our-media.css`,
    `${window.hlx.codeBasePath}/styles/piramal-since/piramal-since.css`,
    `${window.hlx.codeBasePath}/styles/about-us-company/about-us-company.css`,
    `${window.hlx.codeBasePath}/styles/reset.css`,
    `${window.hlx.codeBasePath}/styles/key-features/key-features.css`,
    `${window.hlx.codeBasePath}/styles/metro-cities/metro-cities.css`,
    `${window.hlx.codeBasePath}/styles/articles-carousel/articles-carousel.css`,
    `${window.hlx.codeBasePath}/styles/details-verification/details-verification.css`,
    `${window.hlx.codeBasePath}/styles/elgibility-criteria/elgibility-criteria.css`,
    `${window.hlx.codeBasePath}/styles/table/table.css`,
    `${window.hlx.codeBasePath}/styles/tab-with-cards/tab-with-cards.css`,
    `${window.hlx.codeBasePath}/styles/e-auction/e-auction.css`,
    `${window.hlx.codeBasePath}/styles/list-content/list-content.css`,
    `${window.hlx.codeBasePath}/styles/real-estate-banner/real-estate-banner.css`,
    `${window.hlx.codeBasePath}/styles/rte-wrapper/rte-wrapper.css`,
    `${window.hlx.codeBasePath}/styles/partnerships-cards/partnerships-cards.css`,
    `${window.hlx.codeBasePath}/styles/knowledge-card-carousel/knowledge-card-carousel.css`,
    `${window.hlx.codeBasePath}/styles/board-of-directors/board-of-directors.css`,
    `${window.hlx.codeBasePath}/styles/ratings-card/ratings-card.css`,
    `${window.hlx.codeBasePath}/styles/partnership-cards-tab/partnership-cards-tab.css`,
    `${window.hlx.codeBasePath}/styles/company-details/company-details.css`,
    `${window.hlx.codeBasePath}/styles/years-info-tab/years-info-tab.css`,
    `${window.hlx.codeBasePath}/styles/media/media.css`,
    `${window.hlx.codeBasePath}/styles/partnership/partnership.css`,
    `${window.hlx.codeBasePath}/styles/rupee-cards/rupee-card.css`,
    `${window.hlx.codeBasePath}/styles/interest-rates-disclosure/interest-rates-disclosure.css`,
  ]

  loadCssArray.forEach(async (eachCss) => {
    await loadCSS(eachCss);
  });
}

let body = document.querySelector("body");
body?.addEventListener("click", function (e) {
  e.stopImmediatePropagation();
  if (!e.target.closest(".show") && targetObject.model) {
    targetObject.model?.querySelector(".overlayDiv").classList.remove("show");
    document.body.style.overflow = "scroll";
    body.classList.remove("overlay-active");
  }
  else if (!e.target.closest('.stake-pop-up')) {
    document.querySelectorAll(".stake-pop-up").forEach((ele) => {
      ele.classList.remove('dp-block');
      ele.classList.add('dp-none');
      document.body.style.overflow = "auto";

    });
    var overlay = document.querySelector('.overlay');
    if (overlay) {
      document.body.removeChild(overlay);
    }
  }
  e.currentTarget.querySelector(".stake-pop-up.dp-block")?.classList.remove("dp-block");
});
