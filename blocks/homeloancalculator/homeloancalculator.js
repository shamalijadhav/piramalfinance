

export function resetCalculator(calculator) {
    let calDefaultValueObj = JSON.parse(sessionStorage.getItem("calDefaultValueObj"));

    let calId = calculator.dataset.resetId;

    if(calDefaultValueObj == null) return;
    let calObj = calDefaultValueObj[calId] || {};

    for(let id in calObj) {
        let rangeInput = calculator.querySelector("[id=" + id + "]");
        rangeInput.value = calObj[id];
        rangeInput.dispatchEvent(new Event("input", {bubbles: true}));
    }

    // calculator.dispatchEvent(new Event("change", {bubbles: true}));
}

export function currenyCommaSeperation(x) {
    if (typeof x === "number") {
        x = x.toString();
    }

    // Split the number into integral and decimal parts
    const parts = x.split(".");
    let integralPart = parts[0];
    const decimalPart = parts[1] ? `.${parts[1]}` : '';

    // Add commas after every two digits from the right in the integral part
    integralPart = integralPart.replace(/\d(?=(\d{2})+\d$)/g, '$&,');
    
    return integralPart + decimalPart;
}

var emiCalDiv=document.querySelector(".cmp-teaser--emicalculatorteaser");
var elgCalDiv=document.querySelector(".cmp-teaser--elgcalculatorteaser");
var emiOverlay=document.querySelector(".cmp-container--emicaloverlay");
var elgOverlay = document.querySelector(".cmp-container--elgcaloverlay");
var overlay=document.querySelector(".modal-overlay");

let calculatorType = "";
if(emiCalDiv){
    emiCalDiv.addEventListener("click",function(element){
     
        if (!emiOverlay.classList.contains("show")){
            calculatorType = "emi";
            emiOverlay.classList.add("show");
            overlay.classList.add("show");
            document.body.style.overflow="hidden";
            renderCalculatorData(calculatorType);
            firstTabActive();
    
        }else{
            emiOverlay.classList.remove("show");
            overlay.classList.remove("show");
            document.body.style.overflow="auto";
    
                    
        }
    })
}
if(elgCalDiv){
    elgCalDiv.addEventListener("click", function(element) {
        if (!elgOverlay.classList.contains("show")){
            calculatorType = "eligibility";     
            elgOverlay.classList.add("show");
            overlay.classList.add("show");
            document.body.style.overflow="hidden";
            renderCalculatorData(calculatorType);
            firstTabActive();
    
        }else{
            elgOverlay.classList.remove("show");
            overlay.classList.remove("show");
            
            document.body.style.overflow="auto";
                   
        }
       
    });
}

overlay.addEventListener("click",function(){
    overlay.classList.remove("show");
    document.body.style.overflow="auto";
    emiOverlay.classList.remove("show");
    elgOverlay.classList.remove("show");
    
});

function firstTabActive() {
    let calculator = document.querySelector(".overlayDiv.show .homeloancalculator");
    let firstTab = calculator.querySelector(".tab-emi-calc");
    let firstCalDiv = calculator.querySelector(".emicalculator");
    resetCalculator(firstCalDiv);
    firstTab.click();
}

export const calculator = (loanDetails) => {
    // Parameter Validation
    if (!loanDetails || typeof loanDetails !== 'object') {
        console.warn("Invalid loan details provided.");
        return false;
    }

    const monthlyLoanTenure = loanDetails.tenure * 12;
    const roi = (loanDetails.roi * 0.01) / 12;
    
    return {
        monthlyLoanTenure,
        roi,
        loanDetails,
        "result": function () {
            return getResult(this);
        }
    };
};

const calculateEligibility = (calculatorObj) => {
    
    const loanDetails = calculatorObj.loanDetails;
    const applicableFoir = loanDetails.foir * 0.01;
    let result = 0;
    
    let productType = document.querySelector("#calculator-product-type").value;
    if(productType == "pl") {
        result = CalculateBusinessLoanEligibility(loanDetails.income, calculatorObj.monthlyLoanTenure, loanDetails.otherLoan, calculatorObj.roi);
        return {result};
    }

    //eligibility emi
    const eligibilityEmi = getProductBasedEmiEligibility(loanDetails.income, loanDetails.otherLoan, applicableFoir);

    // Not Eligible
    if (eligibilityEmi <= 0) {
        return 0;
    }

    const E = eligibilityEmi;
    const n = calculatorObj.monthlyLoanTenure;
    const R = calculatorObj.roi;


    // Formula: E*((1-(1/(1+R)^n))/R)
    result = Math.round(E * (1 - (1 / Math.pow((1 + R), n))) / R);


    return {result};
};

const calculateLoanEmi = (calculatorObj) => {

    let L = calculatorObj.loanDetails.loanAmt;
    let n = calculatorObj.monthlyLoanTenure;
    let R = calculatorObj.roi;

    let emi = (L * R * Math.pow(1 + R, n)) / (Math.pow(1 + R, n) - 1);
    emi = Math.round(emi);
    
    //Interest Amount Calculation
    //emi * monthly tenure - loan amount
    let interestAmt = emi * n - L;

    return {"result": emi, interestAmt, "principalAmt": L};
};


function getResult(calculatorObj) {
    let calType = calculatorObj.loanDetails.calType;
    console.log(calculatorObj);
    if(calType) {
        if(calType == "emi"){
            return  calculateLoanEmi(calculatorObj);
        } else {
            return calculateEligibility(calculatorObj);
        }
    }
}


function getProductBasedEmiEligibility(income, otherLoan, applicableFoir) {
    let productType = document.querySelector("#calculator-product-type").value;
    //business loan eligibility emi formula: (income - otherloan) * applicablefoir
    let homePage = document.querySelector(".overlayDiv.show .homeloancalculator");
    if(homePage) {
        productType = homePage.querySelector("#calculator-product-type").value;
    }

    let eligibilityEmi = (income - otherLoan) * applicableFoir;

    if(productType == "hl") {
        //home loan eligibility emi formula: income * applicablefoir - otherloan
        eligibilityEmi = income * applicableFoir - otherLoan;
    } 

    return eligibilityEmi;
}

const CalculateBusinessLoanEligibility = (ic, y, ee, ir) => {
    // business loan Eligibility Calculator
    let applicableAmount = (ic - ee) * 0.5;
    let p= Math.pow(1 + ir, y);
    let eligibleLoanAmount = 1 / p;
    eligibleLoanAmount = (applicableAmount * (1 - eligibleLoanAmount)) / ir;
    eligibleLoanAmount = Math.round(eligibleLoanAmount);
    return eligibleLoanAmount <= 0 ? 0 : eligibleLoanAmount;
};


export function workflowHomeLoanCalculation(currentCalculator, calType) {
    let resultObj = getCalculationResult(currentCalculator, calType);

    if(resultObj != null) {
        renderData(currentCalculator, resultObj);
    }
}

export function getCalculationResult(currentCalculator, calculatorType) {
    let calDataObj = getCalculatorInput(currentCalculator, calculatorType)
    const fn = calculator(calDataObj);
    return fn ? fn.result() : null;
}

export function renderData(parentElement, resultObj) {
    let nullDom = {};
    let resultAmtElement = parentElement.querySelector("[data-cal-result=resultAmt]") || nullDom;
    let principalAmtElement = parentElement.querySelector("[data-cal-result=principalAmt]") || nullDom;
    let interestAmtElement = parentElement.querySelector("[data-cal-result=interestAmt]") || nullDom;

    resultAmtElement.textContent = "₹" + currenyCommaSeperation(resultObj.result ? resultObj.result : 0) + "/-";
    principalAmtElement.textContent = currenyCommaSeperation(resultObj.principalAmt ? resultObj.principalAmt : 0);
    interestAmtElement.textContent = currenyCommaSeperation(resultObj.interestAmt ? resultObj.interestAmt : 0);   
}

export function renderCalculatorData(calType) {
    let calculators = document.querySelector(".overlayDiv.show .homeloancalculator .calctabs").children;
    let currentCalculator = Array.from(calculators).filter( element => element.style.display != "none")[0];
    if(currentCalculator == null) return;
    
    workflowHomeLoanCalculation(currentCalculator, calType);
    trackCalTabClick(currentCalculator, calType);
    onInputCalculate(currentCalculator, calType);
    innerTabClick(calType);
}

function trackCalTabClick(currentCalculator, calType) {
    let mainComponent = document.querySelector(".overlayDiv.show .homeloancalculator");
    let calTabs = mainComponent.querySelectorAll(".onetab, .twotab");

    if(mainComponent.dataset.calTabClickEvent == null) {
        mainComponent.dataset.calTabClickEvent = true;
        calTabs.forEach(element => element.addEventListener("click", function() {
            let calculators = document.querySelector(".overlayDiv.show .homeloancalculator .calctabs").children;
            let currentCalculator = Array.from(calculators).filter( element => element.style.display != "none")[0];
            if(currentCalculator == null) return;
            workflowHomeLoanCalculation(currentCalculator, calType);
        }));
    }
}

function onInputCalculate(currentCalculator, calType) {
    let mainComponent = document.querySelector(".overlayDiv.show .homeloancalculator");
    
    if(mainComponent.dataset.calInputEvent == null) {
        mainComponent.dataset.calInputEvent = true;
        mainComponent.addEventListener("change", function({target}) {
            if(target.tagName != "INPUT") return;
            let currentCalculator = target.closest(".commoncalculator");
            workflowHomeLoanCalculation(currentCalculator, calType);
        });
    }
}


function innerTabClick(calType) {
    let mainComponent = document.querySelector(".overlayDiv.show .homeloancalculator");
    let tabs = mainComponent.querySelectorAll(".tab-common");
    if(mainComponent.dataset.innerTabClick) return;
    mainComponent.dataset.innerTabClick = true;

    let productTypeInput = mainComponent.querySelector("#calculator-product-type");

    tabs.forEach(t => t.addEventListener("click", function({currentTarget}) {
            if(currentTarget.classList.contains("tab-eligibility-calc")) {
                productTypeInput.value = "bl";
                mainComponent.querySelector("[data-cal-foir=biz]").click();
                mainComponent.querySelector("#salaryTab").style.display = "none";
                mainComponent.querySelector("#businessTab").style["borderRadius"]= "0px 12px 0px 0px";
                
            } else {
                productTypeInput.value = "hl";
                mainComponent.querySelector("#salaryTab").style.display = "block";
                mainComponent.querySelector("#businessTab").style["borderRadius"]= "12px 0px 0px 0px";
                
                mainComponent.querySelector("[data-cal-foir=salaried]").click();
            }
            // renderCalculatorData(calType);
        })
    );
}

export function getCalculatorInput(calculator, calType) {
    if(calculator == null) return;
    
    let incomeValue = calculator.querySelector("[data-cal-input=income]")?.value.replaceAll(",", "");
    let isBusinessTabActive = calculator.closest(".homeloancalculator").querySelector(".tab-eligibility-calc.active");
    let loanType =  calculator.closest(".homeloancalculator").querySelector("[data-cal-foir]:checked").dataset.calFoir;
    let getIncome =  loanType == "biz" && !isBusinessTabActive? incomeValue / 12 :  incomeValue;

    let isCombineEmiEligibility = calculator.closest(".homeloancalculator").querySelector(".combined-emi-eligibility");
    if(isCombineEmiEligibility) {
        getIncome = loanType == "biz" ? incomeValue / 12 : incomeValue;
    }

    let obj = {};
    obj.income = getIncome;
    obj.otherLoan = calculator.querySelector("[data-cal-input=otherloan]")?.value.replaceAll(",", "");
    obj.loanAmt = calculator.querySelector("[data-cal-input=loanamt]")?.value.replaceAll(",", "");
    obj.roi = calculator.querySelector("[data-cal-input=roi]")?.value;
    obj.tenure = calculator.querySelector("[data-cal-input=tenure]")?.value;
    obj.foir = calculator.closest(".homeloancalculator").querySelector("[data-cal-foir]:checked")?.value;
    if(!isCombineEmiEligibility && isBusinessTabActive && loanType == "biz") obj.foir = 50;
    obj.calType = calType;

    changeLoanAmtLabel(calculator, calType, loanType);
    return obj;
}

let previousLoanAmtLabel;
function changeLoanAmtLabel(calculator, calType, loanType) {
    let incomeInput = calculator.querySelector("[data-cal-input=income]");
    if(incomeInput == null) return;
    
    let loanAmtLabel = incomeInput.closest(".loanamount").querySelector("label");

    if(loanAmtLabel && loanType) {
        if(previousLoanAmtLabel == null){ previousLoanAmtLabel = loanAmtLabel.textContent.trim() }
        if(calType == "eligibility" && loanType == "biz") {
            loanAmtLabel.textContent = " Gross Annual Income (Rs.)";
        }
        else if(calType == "eligibility" && loanType == "salaried") {
            loanAmtLabel.textContent = previousLoanAmtLabel;
        }
    }
}

let calDefaultValueObj = {};

window.addEventListener("DOMContentLoaded", function() {
    let calculators = document.querySelectorAll(".homeloancalculator .calctabs .commoncalculator");
    
    calculators.forEach((cal, index) => {
        const resetId = "calid-" + index;
        cal.dataset.resetId = resetId;
        calDefaultValueObj[resetId] = Object.fromEntries([...cal.querySelectorAll("input[type=range]")].map(input => [input.id, input.value]));
    });

    sessionStorage.setItem("calDefaultValueObj", JSON.stringify(calDefaultValueObj));
});

document.addEventListener("DOMContentLoaded", function () {
    homeLoanCalcFunc();
}); 

window.homeLoanCalcFunc = function () {
  var salariedDivs = document.querySelectorAll(".onetab");
  var businessDivs = document.querySelectorAll(".twotab");

  var salariedRadios = document.querySelectorAll(".input_salary_checkbox");
  var businessRadios = document.querySelectorAll(".input_business_checkbox");

  // just below heading tabs color changes and input click  code start
  salariedDivs.forEach(function (salariedDiv, index) {
    salariedDiv.addEventListener("click", function () {
      handleTabClick(salariedDiv, true, index);
    });
  });
  businessDivs.forEach(function (businessDiv, index) {
    businessDiv.addEventListener("click", function () {
      handleTabClick(businessDiv, false, index);
    });
  });


  function handleTabClick(tabDiv, isSalaried, index) {
    var backgroundDiv = tabDiv.closest(".home-loan-calculator-parent");
    var calculatorDiv = tabDiv.parentElement.closest(".home-loan-calculator-parent ").nextElementSibling;
    var radioInput = isSalaried ? salariedRadios[index] : businessRadios[index];
    var docRequiredBackground = document.querySelector("#document-required-container");
    var docSalaries = document.querySelectorAll(".cmp-text--doc-salary");
    var docBusinesses = document.querySelectorAll(".cmp-text--doc-business");

    radioInput.checked = true;
    tabDiv.style.background = isSalaried ? "#fff7f4" : "#eef3ff";
    var otherTabDiv = isSalaried ? businessDivs[index] : salariedDivs[index];
    otherTabDiv.style.background = "#ffffff";

    calculatorDiv.style.background = isSalaried ? "#fff7f4" : "#eef3ff";
    backgroundDiv.style.background = isSalaried ? "-webkit-linear-gradient(right, #fff 50%, #fff7f4 50%)" : "-webkit-linear-gradient(right, #eef3ff 50%, #fff 50%)";
    if (docRequiredBackground) {
      docRequiredBackground.style.background = isSalaried ? "#fff7f4" : "#eef3ff";
    }
    if (docSalaries) {
      

      docSalaries.forEach(docSalary => {
        docSalary.style.display = isSalaried ? "block" : "none";
      });

      docBusinesses.forEach(docBusiness => {
          docBusiness.style.display = isSalaried ? "none" : "block";
      });
    }
  }


  // just below heading tabs color changes and input click  code end.








  // blueTabparent and redparent
  //  var bluetabParent = document.querySelector(".blue-tab");
  //  var lightredParent = document.querySelector(".light-red-tab");

  //     if (bluetabParent) {
  //         salariedDivs.forEach(function(salariedDiv, index) {
  //             salariedDiv.removeEventListener("click", function() {
  //                 handleTabClick(salariedDiv, true, index);
  //             });
  //         });
  //     }

  //     if (lightredParent) {
  //         businessDivs.forEach(function(businessDiv, index) {
  //             businessDiv.removeEventListener("click", function() {
  //                 handleTabClick(businessDiv, false, index);
  //             });
  //         });
  //     }




  // this for emi and elg calculator click
  const emiTabs = document.querySelectorAll(".tab-emi-calc");
  const elgTabs = document.querySelectorAll(".tab-eligibility-calc");
  const emiDivs = document.querySelectorAll(".emicalculator");
  const elgDivs = document.querySelectorAll(".eligibilitycalculator");
  const firstHead = document.querySelector(".first-head");
  const secondHead = document.querySelector(".second-head");
  const gstBtn = document.querySelector(".gst-third-tab");

  // Function to handle click on emi tabs
  function handleEmiTabClick(index) {
    // Activate emi tab and deactivate eligibility tab
    let isAlreadyActive = emiTabs[index].classList.contains("active");
    emiTabs[index].classList.add("active");
    elgTabs[index].classList.remove("active");

    // Show emi div and hide eligibility div
    emiDivs[index].style.display = "block";
    elgDivs[index].style.display = "none";

    if(isAlreadyActive == false) {
      resetCalculator(emiDivs[index]);
    }

    if (secondHead) {

      secondHead.style.display = "none";
      firstHead.style.display = "block";
    }
  }

  // Function to handle click on eligibility tabs
  function handleElgTabClick(index) {
    // Activate eligibility tab and deactivate emi tab
    let isAlreadyActive = elgTabs[index].classList.contains("active");

    elgTabs[index].classList.add("active");
    emiTabs[index].classList.remove("active");

    // Show eligibility div and hide emi div
    elgDivs[index].style.display = "block";
    emiDivs[index].style.display = "none";

    
    if(isAlreadyActive == false) {
      resetCalculator(elgDivs[index]);
    }

    if (secondHead) {
      firstHead.style.display = "none";
      secondHead.style.display = "block";
    }
  }

  function handleSalaryTabClickNone(index) {
    var salariedDivs = document.querySelectorAll(".onetab");

    salariedDivs[index].style.display = "none";

  }
  function handleSalaryTabClickBlock(index) {
    var salariedDivs = document.querySelectorAll(".onetab");

    salariedDivs[index].style.display = "block";

  }

  // Add event listeners to emi tabs
  if(emiTabs[0]){
    emiTabs[0].addEventListener("click", function () {
      handleEmiTabClick(0);
      if (gstBtn) {
        gstBtn.classList.remove('active');
  
      }
  
    });
  }
  

  if (emiTabs[1]) {
    emiTabs[1].addEventListener("click", function () {
      handleEmiTabClick(1);

      // handleSalaryTabClickBlock(1);
    });
  }
  if (gstBtn) {
    gstBtn.addEventListener("click", function () {
      elgTabs[0].classList.remove("active");
      emiTabs[0].classList.remove("active");
      gstBtn.classList.add('active');
      elgDivs[0].style.display = "block";
      emiDivs[0].style.display = "none";
    });
  }
  // Add event listeners to eligibility tabs
  if(elgTabs[0]){

      elgTabs[0].addEventListener("click", function () {
        handleElgTabClick(0);
        if (gstBtn) {
          gstBtn.classList.remove('active');

        }
        // handleSalaryTabClickNone(0);
      });
  }
  if (elgTabs[1]) {
    elgTabs[1].addEventListener("click", function () {
      handleElgTabClick(1);

      // handleSalaryTabClickNone(1);
    });
  }


  //  Slider linear gradient and slider value and input value code start
  var sliderValues = document.querySelectorAll(".slider-value");

  sliderValues.forEach(function (sliderValue) {

    var sliderId = sliderValue.dataset.slider;
    var myRangeSlider = document.getElementById(sliderId);
    var calInput = myRangeSlider.dataset.calInput;

    sliderValue.value = formatIndianNumber(myRangeSlider.value);


    myRangeSlider.addEventListener("input", function () {
      updateInputValue();
      sliderValue.value = formatIndianNumber(myRangeSlider.value);
    })

    sliderValue.addEventListener("focusout", function () {
      var parsedValue = parseFloat(sliderValue.value.replaceAll(",", '')) || 0;
      var minValue = parseFloat(myRangeSlider.min);
      var maxValue = parseFloat(myRangeSlider.max);
      if (parsedValue < minValue) {
        parsedValue = minValue;
      }
      if (parsedValue > maxValue) {
        parsedValue = maxValue;
      }
      myRangeSlider.value = parsedValue;
      if (this.dataset.calInput === "roi") {
        sliderValue.value = parseFloat(parsedValue);
      } else {
        sliderValue.value = formatIndianNumber(parsedValue);
      }
      updateInputValue();

      sliderValue.dispatchEvent(new Event("change", {bubbles: true}));
    });



    function updateInputValue() {
      var valPercent = (((myRangeSlider.value - myRangeSlider.min) / (myRangeSlider.max - myRangeSlider.min)) * 100);
      myRangeSlider.style.background = `linear-gradient(90deg, #da4d34 ${valPercent}%, #dbd7d8 ${valPercent}%)`;
    }



    myRangeSlider.dispatchEvent(new Event("input"));

    function formatIndianNumber(value) {
      //  let newvalue = value.replace(/,/g, "");
      let val = value;
      return (isNaN(Number(val)) ? 0 : currenyCommaSeperation(val));
    }

    sliderValue.addEventListener("input", function (number) {

      var inputValue = sliderValue.value;


      // Remove non-numeric characters except the decimal point
      var cleanedValue = inputValue.replace(/[^\d.]/g, '');
      let inputType = this.dataset.calInput;
      // not accept decimal point

      var parsedValue = cleanedValue;
      cleanedValue = String(cleanedValue);
      
      if (inputType === "roi") {
        parsedValue = parsedValue;
      }
      else if (inputType === "tenure") {
        parsedValue = cleanedValue.replace(/\./g, '').replaceAll(",", "");
      }
      else {
        parsedValue = formatIndianNumber(parsedValue);
      }

      sliderValue.value = parsedValue;

    });

    sliderValue.addEventListener("change", function(e) {
      var inputValue = sliderValue.value;


      // Remove non-numeric characters except the decimal point
      var cleanedValue = inputValue.replace(/[^\d.]/g, '');
      let inputType = this.dataset.calInput;
      // not accept decimal point

      var minValue = parseFloat(myRangeSlider.min);
      var maxValue = parseFloat(myRangeSlider.max);

      if (cleanedValue < minValue) {
        cleanedValue = minValue;
      }
      if (cleanedValue > maxValue) {
        cleanedValue = maxValue;
      }

      var parsedValue = String(cleanedValue);


      if (inputType === "roi") {
        parsedValue = parsedValue;
      }
      else if (inputType === "tenure") {
        parsedValue = parsedValue.replace(/\./g, '').replaceAll(",", "");
      }
      else {
        parsedValue = formatIndianNumber(parsedValue);
      }

      sliderValue.value = parsedValue;
      myRangeSlider.value = cleanedValue;
      updateInputValue();
    });

  });

  //  Slider linear gradient and slider value and input value code end
}