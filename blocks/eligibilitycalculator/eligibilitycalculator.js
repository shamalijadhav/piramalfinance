import { renderCalculatorData } from "../emiandeligiblitycalc/renderhpcal.js";
import { homeLoanCalcFunc } from "../emiandeligiblitycalc/homeloancalculators.js";
import { CalcHTM } from "../emiandeligiblitycalc/templatehtml1.js";
import { firstTabActive } from "../emiandeligiblitycalc/commonfile.js";
import { targetObject } from "../../scripts/scripts.js";

let calculatorType, elgCalDiv, elgOverlay, overlay;


export default function decorate(block) {
  let cfURL = block.querySelector("a")?.textContent.trim();
  // const cfRepsonse = CFApiCall(cfURL);

  const callAJson = {
    total: 1,
    offset: 0,
    limit: 1,
    data: [
      {
        maindivbackground: "emi",
        title: "Eligibility Calculator",
        mainheadingclass: "",
        salaried: {
          salariedcheck: true,
          salariedtabid: "salariedTab",
          salariedtabname: "businessStatus",
          salariedtabvalue: "65",
          salariedtabtext: "I'm Salaried",
          calculatorsalariedimg: "/content/dam/piramalfinance/product-page/home-loan/calculator-salaried.svg",
          calculatorsalariedimgalt: "salaried",
        },
        business: {
          businesscheck: true,
          businesstabid: "businessTab",
          businesstabname: "businessStatus",
          businesstabvalue: "80",
          businesstabtext: "I'm doing Business",
          calculatorbusinessimg: "/content/dam/piramalfinance/product-page/home-loan/calculator-business.svg",
          calculatorbusinessimgalt: "business",
        },
        selectloantype: {
          checboxemitab: true,
          subheading: "Select loan type",
          subheadingtow: "",
        },
        tabname: {
          firsttabbname: "Home Loan",
          secondtabbname: "Business Loan",
          thridtabname: "",
        },
        chechboxemiobj: {
          chechboxemi: true,
          loanamout: [
            {
              label: "Gross Monthly Income (Rs.)",
              labelyearsvalue: "",
              rupeesign: "₹",
              dataslider: "m2",
              dataattr: "income",
              rangeminvalue: "20000",
              rangemaxvalue: "1000000",
              rangestep: "10000",
              displayvalue: "100000",
              minvaluetext: "20k",
              maxvaluetext: "10L",
            },
            {
              label: "Other Loan EMIs (Rs.)",
              labelyearsvalue: "",
              rupeesign: "₹",
              dataslider: "m3",
              dataattr: "otherloan",
              rangeminvalue: "0",
              rangemaxvalue: "500000",
              rangestep: "5000",
              displayvalue: "0",
              minvaluetext: "0",
              maxvaluetext: "5L",
            },
            {
              label: "Interest Rate (% p.a)",
              labelyearsvalue: "",
              rupeesign: "₹",
              dataslider: "m4",
              dataattr: "roi",
              rangeminvalue: "10.5",
              rangemaxvalue: "20",
              rangestep: "0.1",
              displayvalue: "10.5",
              minvaluetext: "10.50%",
              maxvaluetext: "20%",
            },
            {
              label: "Loan Tenure (Years)",
              labelyearsvalue: "",
              rupeesign: "₹",
              dataslider: "m6",
              dataattr: "tenure",
              rangeminvalue: "5",
              rangemaxvalue: "30",
              rangestep: "1",
              displayvalue: "10",
              minvaluetext: "5Y",
              maxvaluetext: "30Y",
            },
          ],
        },
        chechboxelibilityobj: {
          chechboxemi: true,
          loanamout: [
            {
              label: "Gross Annual Income (Rs.)",
              labelyearsvalue: "",
              rupeesign: "₹",
              dataslider: "n2",
              dataattr: "income",
              rangeminvalue: "10000",
              rangemaxvalue: "1000000",
              rangestep: "10000",
              displayvalue: "100000",
              minvaluetext: "10k",
              maxvaluetext: "10L",
            },
            {
              label: "Other Loan EMIs (Rs.)",
              labelyearsvalue: "",
              rupeesign: "₹",
              dataslider: "n3",
              dataattr: "otherloan",
              rangeminvalue: "0",
              rangemaxvalue: "500000",
              rangestep: "10000",
              displayvalue: "0",
              minvaluetext: "0",
              maxvaluetext: "5L",
            },
            {
              label: "Interest Rate (% p.a)",
              labelyearsvalue: "%",
              rupeesign: "",
              dataslider: "n4",
              dataattr: "roi",
              rangeminvalue: "17",
              rangemaxvalue: "24",
              rangestep: "0.1",
              displayvalue: "20",
              minvaluetext: "17%",
              maxvaluetext: "24%",
            },
            {
              label: "Loan Tenure (Years)",
              labelyearsvalue: "",
              rupeesign: "₹",
              dataslider: "n5",
              dataattr: "tenure",
              rangeminvalue: "1",
              rangemaxvalue: "4",
              rangestep: "1",
              displayvalue: "3",
              minvaluetext: "1Y",
              maxvaluetext: "4Y",
            },
          ],
        },
        calendarbox: "/content/dam/piramalfinance/homepage/images/calc-calendarwebp",
        calendarmobile: "/content/dam/piramalfinance/homepage/images/calc-calendarwebp",
        outputtext: "Your home loan EMI is",
        button1text: "Talk to loan expert",
        button2text: "Apply loan now",
        pageproperties: "bl",
      },
    ],
    ":type": "sheet",
  };

  block.innerHTML = CalcHTM(callAJson);
  try {
    elgCalDiv = document.querySelector(".home-page-calculator-call-xf .eligibilitycalculator-wrapper");
    elgOverlay = elgCalDiv.querySelector(".cmp-container--caloverlay");
    // overlay = elgCalDiv.querySelector(".modal-overlay");
    eligibilityCalculatorCallXf();
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

export function eligibilityCalculatorCallXf() {
  document.querySelectorAll("[data-teaserv2-xf='homepage-eligibility-calculator-call-xf']") &&
    document.querySelectorAll("[data-teaserv2-xf='homepage-eligibility-calculator-call-xf']").forEach((eachTeaserv2) => {
      eachTeaserv2.addEventListener("click", function (e) {
        e.stopImmediatePropagation();
        const xfGetAttr = this.getAttribute("data-teaserv2-xf");
        const findSectionXFShow = document.querySelector(".home-page-calculator-call-xf");
        const currentSection = document.querySelector(".home-page-calculator-call-xf .eligibilitycalculator-wrapper");
        findSectionXFShow.querySelector(".eligibilitycalculator-wrapper").querySelector(".overlayDiv").classList.add("show");
        if (xfGetAttr == "homepage-eligibility-calculator-call-xf") {
          findSectionXFShow.classList.remove("dp-none");
          document.querySelector("body").classList.add("overlay-active");
          calculatorType = "eligibility";
          elgOverlay.classList.add("show");
          //   overlay.classList.add("show");
          document.body.style.overflow = "hidden";
          renderCalculatorData(currentSection, calculatorType);
          homeLoanCalcFunc(currentSection);
          firstTabActive(currentSection);
        }
        targetObject.model = currentSection;
        // xfShowHideBodyClick(currentSection);
      });
    });
}
