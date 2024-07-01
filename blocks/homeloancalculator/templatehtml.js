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

const salaried = callJson.data[0].salaried.salariedcheck
  ? `
<li id="salaryTab" class="firsttab onetab" style="display: block; background: rgb(255, 255, 255);">
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
                src="${callJson.data[0].business.calculatorbusinessimg}
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

const emidiv = callJson.data[0].chechboxemiobj.chechboxemi
  ? `
<div class="emicalculator commoncalculator">
    <div class="parent-emi" id="emic">
        <div class="inputDiv">
            ${emiinputdiv.innerHTML}
        </div>
        <div class="outputdiv">
            <div class="output-parent">
                <div class="mainoutput">
                    <img data-src="callJson.data[0].calendarbox"
                        class="outputimg lozad" alt="calendar">
                    <img data-src="${callJson.data[0].alendarmobile}"
                        class="outputimg2 lozad" alt="calendar"
                        src="${callJson.data[0].alendarmobile}"
                        data-loaded="true">

                    <p class="outputdes">
                        ${callJson.data[0].outputtext}
                    </p>
                    <div class="outputans" data-cal-result="resultAmt">₹34,438/-</div>

                </div>


                <div class="amountdiv">
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
                </div>


            </div>
        </div>
    </div>
</div>`
  : "";

export const emiCalcHTM = `
 <div class="container responsivegrid overlayDiv cmp-container--emicaloverlay show">
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

                                  <li class="tab-eligibility-calc tab-common" class="gst-third-tab tab-common">
                                      <p>${callJson.data[0].tabname.thridtabname}</p>
                                  </li>
  
  
                              </ul>
                          </div>
                          <div class="calctabs">


                                ${emidiv}
  
                          </div>
  
                          <div class="customerbuttons">
  
                              <a target="_self">
  
                                  <button class="expert">{callJson.data[0].button1text}</button>
                              </a>
                              <a target="_self">
  
                                  <button class="expert orangeexpert">{callJson.data[0].button2text}</button>
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
