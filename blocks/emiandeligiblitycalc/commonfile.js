import { resetCalculator } from "../emiandeligiblitycalc/resetCalculator.js";


export function xfShowHideBodyClick(findSectionXFShow) {
    let body = document.querySelector("body");
    body.classList.add("overlay-active");
    body.addEventListener("click", function (e) {
      if (!e.target.closest(".show")) {
        findSectionXFShow.querySelector(".overlayDiv").classList.remove("show");
        document.body.style.overflow = "scroll";
        body.classList.remove("overlay-active");
      }
    });
  }

export function firstTabActive() {
    let calculator = document.querySelector(".overlayDiv.show .homeloancalculator");
    let firstTab = calculator.querySelector(".tab-emi-calc");
    let firstCalDiv = calculator.querySelector(".emicalculator");
    resetCalculator(firstCalDiv);
    firstTab.click();
}
  