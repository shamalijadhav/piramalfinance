import { appplyLoanTemplate } from "./applyloantemplate.js";

export function decorate(blocks){
    debugger;
    let cfURL = blocks.querySelector("a")?.textContent.trim();
    // const cfRepsonse = CFApiCall(cfURL);

  blocks.innerHTML = appplyLoanTemplate();
  try {
    
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