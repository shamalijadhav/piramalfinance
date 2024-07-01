import { renderCalculatorData } from "../emiandeligiblitycalc/renderhpcal.js";
import { homeLoanCalcFunc } from "../emiandeligiblitycalc/homeloancalculators.js";
import { CalcHTM } from "../emiandeligiblitycalc/templatehtml.js";
import {xfShowHideBodyClick, firstTabActive } from "../emiandeligiblitycalc/commonfile.js";
 
let calculatorType,emiOverlay, elgOverlay, overlay;

export default function decorate(block) {
  let cfURL = block.querySelector("a")?.textContent.trim();
  // const cfRepsonse = CFApiCall(cfURL);
  
  const callJson = {
    total: 1,
    offset: 0,
    limit: 1,
    data: [
      {
        maindivbackground: "emi",
        title: "EMI Calculator",
        mainheadingclass: "",
        salaried: {
          salariedcheck: true,
          salariedtabid: "salariedTab",
          salariedtabname: "employementStatus",
          salariedtabvalue: "80",
          salariedtabtext: "I'm Salaried",
          calculatorsalariedimg: "/content/dam/piramalfinance/product-page/home-loan/calculator-salaried.svg",
          calculatorsalariedimgalt: "salaried",
        },
        business: {
          businesscheck: true,
          businesstabid: "businessTab",
          businesstabname: "employementStatus",
          businesstabvalue: "60",
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
              label: "Loan amount (Rs.)",
              labelyearsvalue: "",
              rupeesign: "₹",
              dataslider: "em1",
              dataattr: "loanamt",
              rangeminvalue: "500000",
              rangemaxvalue: "50000000",
              rangestep: "10000",
              displayvalue: "2500000",
              minvaluetext: "5L",
              maxvaluetext: "5Cr",
            },
            {
              label: "Loan Tenure (Years)",
              labelyearsvalue: "Years",
              rupeesign: "",
              dataslider: "em2",
              dataattr: "tenure",
              rangeminvalue: "5",
              rangemaxvalue: "30",
              rangestep: "1",
              displayvalue: "10",
              minvaluetext: "5Y",
              maxvaluetext: "30Y",
            },
            {
              label: "Interest Rate (% p.a)",
              labelyearsvalue: "%",
              rupeesign: "",
              dataslider: "em3",
              dataattr: "roi",
              rangeminvalue: "10.5",
              rangemaxvalue: "20",
              rangestep: "0.1",
              displayvalue: "10",
              minvaluetext: "10.50%",
              maxvaluetext: "20%",
            },
          ],
        },
        calendarbox: "/content/dam/piramalfinance/homepage/images/calc-calendarwebp",
        calendarmobile: "/content/dam/piramalfinance/homepage/images/calc-calendarwebp",
        outputtext: "Your home loan EMI is",
        principaltext: "Principal amount",
        interesttext: "Interest amount",
        button1text: "Talk to loan expert",
        button2text: "Apply loan now",
        pageproperties: "hl",
      },
    ],
    ":type": "sheet",
  };

  block.innerHTML = CalcHTM(callJson);
  try {
    emiOverlay = document.querySelector(".cmp-container--caloverlay");
    overlay = document.querySelector(".modal-overlay");
    homeLoancalculatorCallXf();
    homeLoanCalcFunc();
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

export function homeLoancalculatorCallXf() {
  document.querySelectorAll("[data-teaserv2-xf='home-page-calculator-call-xf']") &&
    document.querySelectorAll("[data-teaserv2-xf='home-page-calculator-call-xf']").forEach((eachTeaserv2) => {
      eachTeaserv2.addEventListener("click", function (e) {
        e.stopImmediatePropagation();
        const xfGetAttr = this.getAttribute("data-teaserv2-xf");
        const findSectionXFShow = document.querySelector("." + xfGetAttr);
        findSectionXFShow.querySelector(".overlayDiv").classList.add("show");
        if (xfGetAttr == "home-page-calculator-call-xf") {
          findSectionXFShow.classList.remove("dp-none"); // look
          calculatorType = "emi";
          emiOverlay.classList.add("show");
          overlay.classList.add("show");
          document.body.style.overflow = "hidden";
          renderCalculatorData(calculatorType);
          firstTabActive();
        }
        xfShowHideBodyClick(findSectionXFShow);
      });
    });
}

