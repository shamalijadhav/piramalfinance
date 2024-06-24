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
  openFunctionFAQ(block);
}

function openFunctionFAQ(block) {
  const titles = document.querySelectorAll('.faq-accordion-css .accordion-group-wrapper .accordion-group.block.shade-box .accordion.block details summary');

  titles.forEach(function(title) {
      title.addEventListener('click', function() {
          const content = this.parentElement.querySelector('div'); // Assuming <div> is the container of the content
          
          // Toggle display of content
          if (content.style.display === 'block') {
              content.style.display = 'none';
          } else {
              content.style.display = 'block';
          }
  
          // Toggle active class on title
          this.classList.toggle('active');
  
          // Collapse other sections and remove active class
          titles.forEach(function(otherTitle) {
              if (otherTitle !== title) {
                  otherTitle.classList.remove('active');
                  otherTitle.parentElement.querySelector('div').style.display = 'none';
              }
          });
      });
  });
}
