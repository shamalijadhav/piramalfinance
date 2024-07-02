import { appplyLoanTemplate } from "./applyloantemplate.js";
import { applyLoanFormClick } from "./applyloanforms.js";
// import { datePickerFunc } from "../datepickerlib/datepickerlib.js";
import { createPopper } from "../datepickerlib/popper.js";
import { applyLoanPopper } from "./applyloanpopper.js";
import { loanutmForm } from "./loanutm.js";
import { stateMasterApi } from "./statemasterapi.js";
import AirDatepicker from "./datepickertest.js";

export default function decorate(block) {
  let cfURL = block.querySelector("a")?.textContent.trim();
  // const cfRepsonse = CFApiCall(cfURL);

  block.innerHTML = appplyLoanTemplate();
  try {
    // dpObj = new AirDatepicker("#loan-form-dob", {
    //   position({ $datepicker, $target, $pointer, done }) {
    //     let popper = Popper.createPopper($target, $datepicker, {
    //       // placement: 'top bottom',
    //       modifiers: [
    //         {
    //           name: "flip",
    //           options: {
    //             fallbackPlacements: ["top", "bottom"],
    //             padding: {
    //               top: 10,
    //             },
    //             "z-index": 200,
    //           },
    //         },
    //         {
    //           name: "offset",
    //           options: {
    //             offset: [0, 10],
    //           },
    //         },
    //         {
    //           name: "arrow",
    //           options: {
    //             element: $pointer,
    //           },
    //         },
    //       ],
    //     });

    //     return function completeHide() {
    //       popper.destroy();
    //       done();
    //     };
    //   },

    //   // position:'top left',
    //   autoClose: true,
    //   maxDate: new Date(),

    //   locale: {
    //     days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    //     daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    //     daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    //     months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    //     monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    //     today: "Today",
    //     clear: "Clear",
    //     dateFormat: "dd/MM/yyyy",
    //     firstDay: 0,
    //   },
    // });
    // console.log(dpObj);
    // // datePickerFunc();
    // AirDatepicker();
    createPopper();
    applyLoanFormClick();
    applyLoanPopper();
    loanutmForm();
    stateMasterApi();
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
