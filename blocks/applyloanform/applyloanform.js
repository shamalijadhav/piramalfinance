import { appplyLoanTemplate } from "./applyloantemplate.js";
import { applyLoanFormClick } from "./applyloanforms.js";
import { createPopper } from "../datepickerlib/popper.js";
import { applyLoanPopper } from "./applyloanpopper.js";
import { loanutmForm } from "./loanutm.js";
import { stateMasterApi } from "./statemasterapi.js";
import AirDatepicker from "./datepickertest.js";
import { validationJSFunc } from "./validation.js";

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
    createPopper();
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
