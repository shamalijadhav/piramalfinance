import { workflowHomeLoanCalculation } from "../emiandeligiblitycalc/calhelpers.js";

export function renderCalculatorData(calType) {
  let calculators = document.querySelector(".overlayDiv.show .homeloancalculator .calctabs").children;
  let currentCalculator = Array.from(calculators).filter((element) => element.style.display != "none")[0];
  if (currentCalculator == null) return;

  workflowHomeLoanCalculation(currentCalculator, calType);
  trackCalTabClick(currentCalculator, calType);
  onInputCalculate(currentCalculator, calType);
  innerTabClick(calType);
}

function trackCalTabClick(currentCalculator, calType) {
  let mainComponent = document.querySelector(".overlayDiv.show .homeloancalculator");
  let calTabs = mainComponent.querySelectorAll(".onetab, .twotab");

  if (mainComponent.dataset.calTabClickEvent == null) {
    mainComponent.dataset.calTabClickEvent = true;
    calTabs.forEach((element) =>
      element.addEventListener("click", function () {
        let calculators = document.querySelector(".overlayDiv.show .homeloancalculator .calctabs").children;
        let currentCalculator = Array.from(calculators).filter((element) => element.style.display != "none")[0];
        if (currentCalculator == null) return;
        workflowHomeLoanCalculation(currentCalculator, calType);
      })
    );
  }
}

function onInputCalculate(currentCalculator, calType) {
  let mainComponent = document.querySelector(".overlayDiv.show .homeloancalculator");

  if (mainComponent.dataset.calInputEvent == null) {
    mainComponent.dataset.calInputEvent = true;
    mainComponent.addEventListener("change", function ({ target }) {
      if (target.tagName != "INPUT") return;
      let currentCalculator = target.closest(".commoncalculator");
      workflowHomeLoanCalculation(currentCalculator, calType);
    });
  }
}

function innerTabClick(calType) {
  let mainComponent = document.querySelector(".overlayDiv.show .homeloancalculator");
  let tabs = mainComponent.querySelectorAll(".tab-common");
  if (mainComponent.dataset.innerTabClick) return;
  mainComponent.dataset.innerTabClick = true;

  let productTypeInput = mainComponent.querySelector("#calculator-product-type");

  tabs.forEach((t) =>
    t.addEventListener("click", function ({ currentTarget }) {
      if (currentTarget.classList.contains("tab-eligibility-calc")) {
        productTypeInput.value = "bl";
        mainComponent.querySelector("[data-cal-foir=biz]").click();
        mainComponent.querySelector("#salaryTab").style.display = "none";
        mainComponent.querySelector("#businessTab").style["borderRadius"] = "0px 12px 0px 0px";
      } else {
        productTypeInput.value = "hl";
        mainComponent.querySelector("#salaryTab").style.display = "block";
        mainComponent.querySelector("#businessTab").style["borderRadius"] = "12px 0px 0px 0px";

        mainComponent.querySelector("[data-cal-foir=salaried]").click();
      }
      // renderCalculatorData(calType);
    })
  );
}
