import { appplyLoanTemplate } from "./applyloantemplate.js";
import { applyLoanFormClick } from "./applyloanforms.js";
import { applyLoanPopper } from "./applyloanpopper.js";
import { loanutmForm } from "./loanutm.js";
import { stateMasterApi } from "./statemasterapi.js";
import { validationJSFunc } from "./validation.js";
import AirDatepicker from "./datepickertest.js";
import Popper from "../datepickerlib/popper.js";
import { loanFromBtn, loanOtpInput } from "./loanformdom.js";
import { workFlow } from "./loanformapi.js";
// import { buttonCLick } from "./loanformapi.js";

export default function decorate(block) {
  let cfURL = block.querySelector("a")?.textContent.trim();
  // const cfRepsonse = CFApiCall(cfURL);

  block.innerHTML = appplyLoanTemplate();
  try {
    applyLoanFormClick();
    applyLoanPopper();
    loanutmForm();
    stateMasterApi();
    validationJSFunc();
    // buttonCLick();
    let loanStatus = "Rejected";

    loanFromBtn().addEventListener("click", function ({ currentTarget }) {
      // debugger;
      currentTarget.closest(".loan-form-button-container").classList.add("loader-initialized");
      loanOtpInput().value = "";
      workFlow();
    });
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
