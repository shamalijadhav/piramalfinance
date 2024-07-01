import { renderCalculatorData } from "../emiandeligiblitycalc/renderhpcal.js";
import { emiCalcHTM } from "./templatehtml.js";

let calculatorType, emiCalDiv, elgCalDiv, emiOverlay, elgOverlay, overlay;

export default function decorate(block) {
  let cfURL = block.querySelector("a")?.textContent.trim();
  // const cfRepsonse = CFApiCall(cfURL);

  block.innerHTML = emiCalcHTM;
  try {
    // var emiCalDiv = document.querySelector(".cmp-teaser--emicalculatorteaser");
    emiCalDiv = document.querySelector(".home-page-calculator-call-xf");
    elgCalDiv = document.querySelector(".cmp-teaser--elgcalculatorteaser");
    emiOverlay = document.querySelector(".cmp-container--emicaloverlay");
    elgOverlay = document.querySelector(".cmp-container--elgcaloverlay");
    overlay = document.querySelector(".modal-overlay");
    calculatorCallXf();
  } catch (error) {
    console.warn(error);
  }
}

export async function CFApiCall(cfurl) {
  const cfModification = cfurl?.replace("/content/dam/", "/api/assets/");
  const response = await fetchAPI(cfModification);
  const responseJson = await response.json();
  return responseJson;
}

export function calculatorCallXf() {
  document.querySelectorAll("[data-teaserv2-xf='home-page-calculator-call-xf']") &&
    document.querySelectorAll("[data-teaserv2-xf='home-page-calculator-call-xf']").forEach((eachTeaserv2) => {
      eachTeaserv2.addEventListener("click", function (e) {
        e.stopImmediatePropagation();
        const xfGetAttr = this.getAttribute("data-teaserv2-xf");
        const findSectionXFShow = document.querySelector("." + xfGetAttr);
        findSectionXFShow.querySelector(".overlayDiv").classList.add("show");
        if (xfGetAttr == "home-page-calculator-call-xf") {
          findSectionXFShow.classList.remove("dp-none"); // look
          calculatorType = "emi";
          emiOverlay.classList.add("show");
          overlay.classList.add("show");
          document.body.style.overflow = "hidden";
          renderCalculatorData(calculatorType);
          firstTabActive();
        } else {
          calculatorType = "eligibility";
          elgOverlay.classList.add("show");
          overlay.classList.add("show");
          document.body.style.overflow = "hidden";
          renderCalculatorData(calculatorType);
          firstTabActive();
        }
        xfShowHideBodyClick(findSectionXFShow);
      });
    });
}

export function xfShowHideBodyClick(findSectionXFShow) {
  let body = document.querySelector("body");
  body.classList.add("bodyBlur");
  body.addEventListener("click", function (e) {
    if (!e.target.closest(".show")) {
      //   if (findSectionXFShow.querySelector('.overlayDiv').classList.contains('show')) {
      findSectionXFShow.querySelector(".overlayDiv").classList.remove("show");
      body.classList.remove("bodyBlur");
      // }
    }
  });
}

function firstTabActive() {
  let calculator = document.querySelector(".overlayDiv.show .homeloancalculator");
  let firstTab = calculator.querySelector(".tab-emi-calc");
  let firstCalDiv = calculator.querySelector(".emicalculator");
  resetCalculator(firstCalDiv);
  firstTab.click();
}
