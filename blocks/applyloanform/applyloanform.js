import { appplyLoanTemplate } from "./applyloantemplate.js";
import { applyLoanFormClick } from "./applyloanforms.js";

export default function decorate(block) {

    let cfURL = block.querySelector("a")?.textContent.trim();
    // const cfRepsonse = CFApiCall(cfURL);

    block.innerHTML = appplyLoanTemplate();
  try {
    applyLoanFormClick()
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