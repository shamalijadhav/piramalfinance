import { resetCalculator } from "./resetCalculator.js";
// import { renderCalculatorData } from "./renderhpcal.js";

export default function overlayCalculator() {
  var emiCalDiv = document.querySelector(".cmp-teaser--emicalculatorteaser");
  var elgCalDiv = document.querySelector(".cmp-teaser--elgcalculatorteaser");
  var emiOverlay = document.querySelector(".cmp-container--emicaloverlay");
  var elgOverlay = document.querySelector(".cmp-container--elgcaloverlay");
  var overlay = document.querySelector(".modal-overlay");

  let calculatorType = "";
  if (emiCalDiv) {
    emiCalDiv.addEventListener("click", function (element) {
      if (!emiOverlay.classList.contains("show")) {
        calculatorType = "emi";
        emiOverlay.classList.add("show");
        overlay.classList.add("show");
        document.body.style.overflow = "hidden";
        renderCalculatorData(calculatorType);
        firstTabActive();
      } else {
        emiOverlay.classList.remove("show");
        overlay.classList.remove("show");
        document.body.style.overflow = "auto";
      }
    });
  }
  if (elgCalDiv) {
    elgCalDiv.addEventListener("click", function (element) {
      if (!elgOverlay.classList.contains("show")) {
        calculatorType = "eligibility";
        elgOverlay.classList.add("show");
        overlay.classList.add("show");
        document.body.style.overflow = "hidden";
        renderCalculatorData(calculatorType);
        firstTabActive();
      } else {
        elgOverlay.classList.remove("show");
        overlay.classList.remove("show");

        document.body.style.overflow = "auto";
      }
    });
  }

  overlay.addEventListener("click", function () {
    overlay.classList.remove("show");
    document.body.style.overflow = "auto";
    emiOverlay.classList.remove("show");
    elgOverlay.classList.remove("show");
  });

function firstTabActive() {
    let calculator = document.querySelector(".overlayDiv.show .homeloancalculator");
    let firstTab = calculator.querySelector(".tab-emi-calc");
    let firstCalDiv = calculator.querySelector(".emicalculator");
    resetCalculator(firstCalDiv);
    firstTab.click();
  }
}
