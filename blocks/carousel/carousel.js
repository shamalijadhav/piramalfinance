import { generateDetailedTeaserDOM } from '../detailed-teaser/detailed-teaser.js';
import { generateTeaserDOM } from '../teaser/teaser.js';

const carouselContainerMapping = {}
carouselContainerMapping["detailed-teaser"] = generateDetailedTeaserDOM;
carouselContainerMapping["ss-teaser"] = generateDetailedTeaserDOM;

// callback for touch based scrolling event
function updateButtons(entries) {
  entries.forEach((entry) => {
    // if panel has become > 60% visible
    if (entry.isIntersecting) {
      // get the buttons
      // const carouselButtons = entry.target.parentNode.parentNode.querySelector('.button-container');
      const carouselButtons = entry.target.parentNode.parentNode.lastChild;
      // remove selected state from whatever button has it
      [...carouselButtons.querySelectorAll(':scope button')].forEach((b) => b.classList.remove('selected'));
      // add selected state to proper button
      carouselButtons
        .querySelector(`:scope button[data-panel='${entry.target.dataset.panel}']`)
        .classList.add('selected');
    }
  });
}

// intersection observer for touch based scrolling detection
const observer = new IntersectionObserver(updateButtons, { threshold: 0.6, rootMargin: '500px 0px' });

export default function decorate(block) {
  // the panels container
  const panelContainer = document.createElement('div');
  panelContainer.classList.add('panel-container');

  // the buttons container
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');


  const slideNavButtons = document.createElement("div");
  slideNavButtons.classList.add("carousel-navigation-buttons");
  slideNavButtons.innerHTML = `
    <button type="button" class="slide-prev" aria-label="${"Previous Slide"
    }">${block.children[0].outerHTML || "<"}</button>
    <button type="button" class="slide-next" aria-label="${"Next Slide"
    }">${block.children[1].outerHTML || ">"}</button>
  `;
  // block.appendChild(slideNavButtons);

  const carouselshowtype = block.children[2].innerText.trim() || "primary";
  block.classList.add(carouselshowtype);
  // get all children elements
  // const panels = [...block.children];
  const panels = Array.from(block.children).slice(3);

  // loop through all children blocks
  [...panels].forEach((panel, i) => {
    // generate the  panel
    const [imagebg, image, classList, ...rest] = panel.children;
    const classesText = classList.textContent.trim();
    const classes = (classesText ? classesText.split(',') : []).map((c) => c && c.trim()).filter((c) => !!c);
    let blockType = 'teaser';
    // const blockType = [...classes].includes('detailed-teaser') ? 'detailed-teaser' : 'teaser';
    // check if we have to render teaser or a detailed teaser
    // const teaserDOM = 
    //   blockType === 'detailed-teaser'
    //     ? generateDetailedTeaserDOM([imagebg, image, ...rest], classes)
    //     : generateTeaserDOM([imagebg, image, ...rest], classes);
    let generateOtherComponent = null;
    classes.forEach(function (className) {
      if (carouselContainerMapping[className]) {
        blockType = className;
        generateOtherComponent = carouselContainerMapping[className];
      }
    })
    generateOtherComponent = generateOtherComponent ? generateOtherComponent([imagebg, image, ...rest], classes) : generateTeaserDOM([imagebg, image, ...rest], classes);
    panel.textContent = '';
    panel.classList.add(blockType, 'block');
    classes.forEach((c) => panel.classList.add(c.trim()));
    panel.dataset.panel = `panel_${i}`;
    panel.append(generateOtherComponent);
    panelContainer.append(panel);

    if (panels.length > 1) {
      // generate the button
      const button = document.createElement('button');
      buttonContainer.append(button);
      button.title = `Slide ${i + 1}`;
      button.dataset.panel = `panel_${i}`;
      if (!i) button.classList.add('selected');

      observer.observe(panel);

      // add event listener to button
      button.addEventListener('click', () => {
        panelContainer.scrollTo({ top: 0, left: panel.offsetLeft - panel.parentNode.offsetLeft, behavior: 'smooth' });
      });
    }
  });

  block.textContent = '';
  block.append(panelContainer);
  block.append(slideNavButtons);

  function activePanelContainer(panel) {
    panelContainer.scrollTo({ top: 0, left: panel.offsetLeft - panel.parentNode.offsetLeft, behavior: 'smooth' });
  }
  block.querySelector(".slide-prev").addEventListener("click", function (e) {
    const actviveBtn = buttonContainer.querySelector(".selected")
    const activePanel = block.querySelector('[data-panel=' + actviveBtn.dataset.panel + ']');
    const panel = activePanel.previousElementSibling;
    panel && activePanelContainer(panel)
  })
  block.querySelector(".slide-next").addEventListener("click", function (e) {
    const actviveBtn = buttonContainer.querySelector(".selected")
    const activePanel = block.querySelector('[data-panel=' + actviveBtn.dataset.panel + ']');
    const panel = activePanel.nextElementSibling;
    panel && activePanelContainer(panel)
  })
  if (buttonContainer.children.length) block.append(buttonContainer);
}
