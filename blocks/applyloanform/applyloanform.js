import { appplyLoanTemplate } from "./applyloantemplate.js";
import { applyLoanFormClick } from "./applyloanforms.js";
import { applyLoanPopper } from "./applyloanpopper.js";
import { loanutmForm } from "./loanutm.js";
import { stateMasterApi } from "./statemasterapi.js";
import { validationJSFunc } from "./validation.js";
import AirDatepicker from "../datepickerlib/datepickerlib.js";
import Popper from "../datepickerlib/popper.js";
import { loanFromBtn, loanOtpInput } from "./loanformdom.js";
import { workFlow } from "./loanformapi.js";
import { buttonCLick } from "./loanformapi.js";

export default async function decorate(block) {
  let cfURL = block.querySelector("a")?.textContent.trim();
  // const cfRepsonse = await CFApiCall(cfURL);

  block.innerHTML = appplyLoanTemplate();
  try {
    applyLoanFormClick();
    applyLoanPopper();
    loanutmForm();
    stateMasterApi();
    validationJSFunc();
    buttonCLick();
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
