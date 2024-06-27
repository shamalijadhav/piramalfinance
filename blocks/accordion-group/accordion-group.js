import { generateAccordionDOM } from "../accordion/accordion.js";

export default function decorate(block) {
  // each row is an accordion entry
  const accordions = [...block.children];

  // loop through all accordion blocks
  [...accordions].forEach((accordion) => {
    // generate the accordion
    const accordionDOM = generateAccordionDOM(accordion);
    // empty the content ,keep root element with UE instrumentation
    accordion.textContent = "";
    // add block classes
    accordion.classList.add("accordion", "block");
    accordion.append(accordionDOM);
  });

  // use same styling as shade-box from /docs
  block.classList.add("shade-box");
  try {
    openFunctionFAQ(block);
  } catch (error) {
    console.error(error);
  }
}

function openFunctionFAQ(block) {
  const titles = block.querySelectorAll("details summary");

  titles.forEach(function (title) {
    title.addEventListener("click", function () {
      
      titles.forEach(function (title) {
        title.closest("details").removeAttribute("open");
        title.classList.remove("active");
      });

      this.classList.toggle("active");
    });
  });
}
