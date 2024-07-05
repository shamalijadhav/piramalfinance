export function calcHtmlv2(callJson) {
  const salaried = callJson.data[0].salaried.salariedcheck
    ? `
<li id="salaryTab" class="firsttab onetab">
    <div class="customecheck">
        <div class="salary-parent">
            <input type="radio" id="${callJson.data[0].salaried.salariedtabid}" name="${callJson.data[0].salaried.salariedtabname}"
                class="input_salary_checkbox" data-cal-foir="salaried" value="${callJson.data[0].salaried.salariedtabvalue}"
                checked>
            <label for="${callJson.data[0].salaried.salariedtabid}">${callJson.data[0].salaried.salariedtabtext}</label>
            <div class="blackborder">
                <div class="black">

                </div>
            </div>
        </div>
        <div class="customimage">
            <img data-src="${callJson.data[0].salaried.calculatorsalariedimg}" class="customer lozad"
                alt="${callJson.data[0].salaried.calculatorsalariedimgalt}" src="${callJson.data[0].salaried.calculatorsalariedimg}"
                data-loaded="true">
        </div>

    </div>
</li>`
    : "";

  const business = callJson.data[0].business.businesscheck
    ? `
<li id="${callJson.data[0].business.businesstabid}" class="firsttab secondtab twotab">
    <div class="customecheck">
        <div class="salary-parent business-parent">
            <input type="radio" id="${callJson.data[0].business.businesstabid}" name="${callJson.data[0].business.businesstabname}"
                class="input_business_checkbox" data-cal-foir="biz" value="${callJson.data[0].business.businesstabvalue}">
            <label for="${callJson.data[0].business.businesstabid}">${callJson.data[0].business.businesstabtext}</label>
            <div class="blackborder">
                <div class="black">

                </div>
            </div>

        </div>
        <div class="customimage">
            <img data-src="${callJson.data[0].business.calculatorbusinessimg}"
                class=" customer lozad" alt="${callJson.data[0].business.calculatorbusinessimgalt}"
                src="${callJson.data[0].business.calculatorbusinessimg}"
                data-loaded="true">
        </div>
    </div>

</li> `
    : "";

let emiinputdiv = "";
  callJson.data[0]["chechboxemiobj"]["chechboxemi"] &&
    callJson.data[0]["chechboxemiobj"].loanamout.forEach(function (each, index) {
      emiinputdiv += `<div class="loanamount">
          <div class="data">
              <label class="description">${each.label}</label>
              <!-- add class yearstext for displaying textvalue -->
              <div class="inputdivs ">
      
                  <span class="rupee">${each.rupeesign}</span>
      
                  <label for="calcemi-${index}" aria-label="calculateemi"></label>
                  <input type="text" class="inputvalue slider-value" value=""
                      id="calcemi-${index}" data-slider="${each.dataslider}" data-cal-input="${each.dataattr}">
      
                  <span class="textvalue">${each.labelyearsvalue}</span>
      
              </div>
          </div>
          <div class="rangediv">
              <input type="range" min="${each.rangeminvalue}" step="${each.rangestep}" max="${each.rangemaxvalue}"
                  value="${each.displayvalue}" id="${each.dataslider}" class="range-slider__range">
              <div class="values">
                  <span class="text">${each.minvaluetext}</span>
                  <span class="text">${each.maxvaluetext}</span>
              </div>
          </div>
      </div>`;
    });

let eligibilityinputdiv = "";
  callJson.data[0]["chechboxelibilityobj"]["chechboxemi"] &&
    callJson.data[0]["chechboxelibilityobj"].loanamout.forEach(function (each, index) {
        eligibilityinputdiv += `<div class="loanamount">
          <div class="data">
              <label class="description">${each.label}</label>
              <!-- add class yearstext for displaying textvalue -->
              <div class="inputdivs ">
      
                  <span class="rupee">${each.rupeesign}</span>
      
                  <label for="calcemi-${index}" aria-label="calculateemi"></label>
                  <input type="text" class="inputvalue slider-value" value=""
                      id="calcemi-${index}" data-slider="${each.dataslider}" data-cal-input="${each.dataattr}">
      
                  <span class="textvalue">${each.labelyearsvalue}</span>
      
              </div>
          </div>
          <div class="rangediv">
              <input type="range" min="${each.rangeminvalue}" step="${each.rangestep}" max="${each.rangemaxvalue}"
                  value="${each.displayvalue}" id="${each.dataslider}" class="range-slider__range">
              <div class="values">
                  <span class="text">${each.minvaluetext}</span>
                  <span class="text">${each.maxvaluetext}</span>
              </div>
          </div>
      </div>`;
    });

  const rightSideAmount = callJson.data[0].principaltext
    ? `<div class="amountdiv">
                      <div class="firstamout">
                          <p>${callJson.data[0].principaltext}</p>
                          <p class="amount"><span>₹</span><span
                                  data-cal-result="principalAmt">25,00,000</span>
                          </p>
                      </div>
                      <div class="secondamount firstamout">
                          <p>${callJson.data[0].interesttext}</p>
                          <p class="amount"><span>₹</span><span
                                  data-cal-result="interestAmt">16,32,560</span>
                          </p>
                      </div>
  </div>`
    : "";

  const emidiv = callJson.data[0].chechboxemiobj.chechboxemi
    ? `
<div class="emicalculator commoncalculator">
    <div class="parent-emi" id="emic">
        <div class="inputDiv">
            ${emiinputdiv}
        </div>
        <div class="outputdiv">
            <div class="output-parent">
                <div class="mainoutput">
                    <img data-src="${callJson.data[0].calendarbox}"
                        class="outputimg lozad" alt="calendar" src="${callJson.data[0].calendarbox}">
                    <img data-src="${callJson.data[0].calendarmobile}"
                        class="outputimg2 lozad" alt="calendar"
                        src="${callJson.data[0].calendarmobile}"
                        data-loaded="true">

                    <p class="outputdes">
                        ${callJson.data[0].outputtext}
                    </p>
                    <div class="outputans" data-cal-result="resultAmt">₹34,438/-</div>

                </div>

                ${rightSideAmount}

            </div>
        </div>
    </div>
</div>`
    : "";


const eligibilitydiv = callJson.data[0].chechboxelibilityobj.chechboxemi
    ? `
<div class="eligibilitycalculator calculator commoncalculator">
    <div class="parent-emi parent-eligibility" id="emic">
        <div class="inputDiv">
            ${eligibilityinputdiv}
        </div>
        <div class="outputdiv">
            <div class="output-parent">
                <div class="mainoutput">
                    <img data-src="${callJson.data[0].calendarbox}"
                        class="outputimg lozad" alt="calendar" src="${callJson.data[0].calendarbox}">
                    <img data-src="${callJson.data[0].calendarmobile}"
                        class="outputimg2 lozad" alt="calendar"
                        src="${callJson.data[0].calendarmobile}"
                        data-loaded="true">

                    <p class="outputdes">
                        ${callJson.data[0].outputtext}
                    </p>
                    <div class="outputans" data-cal-result="resultAmt">₹34,438/-</div>

                </div>

                ${rightSideAmount}

            </div>
        </div>
    </div>
</div>`
    : "";

  return `
 <div class="container responsivegrid show">
      <div id="container-7dfdb51cd4" class="cmp-container">
          <div class="title home-loan-title">
              <div id="title-bd2a9ac3b1" class="cmp-title">
                  <h3 class="cmp-title__text">${callJson.data[0].title}</h3>
              </div>
          </div>
          <div class="homeloancalculator">
              <div class="home-loan-calculator-parent ${callJson.data[0].maindivbackground}">
  
                  <div class="hlc-subparent">
                      <ul class="radiotab">
  
                      ${salaried}
  
                        ${business} 
                            
                      </ul>
                  </div>
              </div>
  
              <div class="calculator-parent">
                  <div class="calculator-parent-child">
                      <div class="cp-child">
                          <div class="mainheading ${callJson.data[0].mainheadingclass}">
                              <p class="first-head">${callJson.data[0].selectloantype.subheading}</p>
                                <p class="second-head">${callJson.data[0].selectloantype.subheadingtow}</p>
                          </div>
                          <div class="headingtabs ${callJson.data[0].mainheadingclass}">
                              <ul class="headul">


                                  <li class="tab-emi-calc tab-common active">
                                      <p>${callJson.data[0].tabname.firsttabbname}</p>
                                  </li>
  
                                  <li class="tab-eligibility-calc tab-common">
                                      <p>${callJson.data[0].tabname.secondtabbname}</p>
                                  </li>

                                  <li class="tab-eligibility-calc tab-common gst-third-tab">
                                      <p>${callJson.data[0].tabname.thridtabname}</p>
                                  </li>
  
  
                              </ul>
                          </div>
                          <div class="calctabs">


                                ${emidiv}
                                ${eligibilitydiv}
  
                          </div>
  
                          <div class="customerbuttons">
  
                              <a href="${callJson.data[0].button1link}" target="_self">
  
                                  <button class="expert">${callJson.data[0].button1text}</button>
                              </a>
                              <a href="${callJson.data[0].button2link}" target="_self">
  
                                  <button class="expert orangeexpert">${callJson.data[0].button2text}</button>
                              </a>
  
                          </div>
                      </div>
                  </div>
              </div>
  
              <div class="homepagemobiledesign"></div>
              <input type="hidden" name="product type" id="calculator-product-type" value="${callJson.data[0].pageproperties}">
              <!-- tab-center--calculator -->
          </div>
      </div>
  </div>
  `;
}
