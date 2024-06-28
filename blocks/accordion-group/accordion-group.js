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
    block.closest(".faq-view-more-logic") ? viewMoreLogicFAQ() : "";
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

function viewMoreLogicFAQ() {
  document.querySelectorAll(".faq-section-wrapper.faq-view-more-logic").forEach((each) => {
    const allFAQSection = each.querySelectorAll(".accordion.block");

    allFAQSection.forEach((eachFAQ, index) => {
      if (index == 5) {
        eachFAQ.classList.add("faq-blur");
      }
      eachFAQ.classList.toggle("dp-none", index > 5);
    });

    const buttonContainer = each.querySelector(".button-container");
    if (buttonContainer) {
      const buttonText = buttonContainer.querySelector("a").textContent.trim();
      buttonContainer.innerHTML = buttonText;
      viewMoreFAQ(each);
    }
  });
}
function viewMoreFAQ(eachs) {
  const faqButtonContainer = eachs.querySelector(".faq-section-wrapper .button-container");
  debugger;
  faqButtonContainer.addEventListener("click", function () {
    const isViewMoreFAQ = this.textContent.toLowerCase() === "view more";
    this.innerText = isViewMoreFAQ ? "View Less" : "View More";

    eachs.querySelectorAll(".accordion.block").forEach((eachFAQ, index) => {
      if (index == 5) {
        var checkBlurClass = eachFAQ.classList.contains("faq-blur");
        checkBlurClass ? eachFAQ.classList.remove("faq-blur") : eachFAQ.classList.add("faq-blur");
      }
      eachFAQ.classList.toggle("dp-none", !isViewMoreFAQ && index > 5);
    });
  });
}
