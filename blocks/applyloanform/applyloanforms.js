import { branchInput, cutomerEmployment, cutomerIncome, cutomerName, cutomerNo, formDobInput, formLoanAmt, formTc, loanFormContainer, loanFormOtpBtn, loanOtpInput, loanProduct, otpNumChange, otpPhoneNum, stateInput } from "./loanformdom.js";
import { loanTypeDropdownSelect } from "./utm.js";


export function applyLoanFormClick(){
  let loaninnerform=document.querySelector(".loan-form-sub-parent");
  if(loaninnerform){
  
  
    // checkbox logic
    let checkboxDiv = document.querySelectorAll(".cmp-form-option-parent");
    
  
      checkboxDiv[0].style.border = "1px solid #f26841";
    
    checkboxDiv.forEach(function (e) {
      e.addEventListener("click", function () {
        let radioButton = this.querySelector('input[type="radio"]');
        radioButton.checked = true;
        checkboxDiv.forEach(function (e) {
          e.style.border = "1px solid #AFB9C3";
        });
        e.style.border = "1px solid #f26841";
      });
    });
  
    //  Display of form 
     let crossIcon = document.querySelectorAll(".crossimage, .failformcross");
     let buttonExpert = document.querySelectorAll(".expert");
     let overlay=document.querySelector(".modal-overlay");
     const firstformbtn = document.querySelector(".first-form-button .cmp-container");
     let bodyElement=document.body;
     const secondformbtn = document.querySelector(".loan-form-otp-button-container .cmp-container");
     const otparrow = document.querySelector(".leftarrow");
     const documentWhatsAppBtn =document.querySelector(".cmp-container--documentrequired .cmp-container .extendedbutton")
     const productBannerButton=document.querySelector("#loan-banner .cmp-teaser__content .cmp-teaser__action-container .cmp-teaser__action-link")
    const stickyFooter=document.getElementById("sticky-btn-loan-form");
    const locationCardButton = document.querySelectorAll(
      ".cmp-container--branches .cmp-contentfragmentlist .cmp-contentfragment .cmp-contentfragment__elements .cmp-contentfragment__element--ctaName .cmp-contentfragment__element-value"
    );
    const bannerFormButton=document.querySelectorAll(".cmp-teaser--open-form-action .cmp-teaser .cmp-teaser__action-container .cmp-teaser__action-link");
    const neeyatBtn=document.querySelectorAll(".open-form-btn");
    var cardlink=document.querySelector(".location-link");
    
   
    
     
    buttonExpert.forEach(function(button){
      button.addEventListener("click", function (e) {
        e.preventDefault();
        let anchor = button.closest('a');
        if (anchor && anchor.getAttribute('href')) {
            let link = anchor.getAttribute('href');
            let target = anchor.getAttribute('target');
            if (target === '_blank') {
                window.open(link, target); // Open the link using the target attribute specified by the user
            } else {
                // Default behavior: open the link in the same tab
                window.location.href = link; 
            }
        } else {
        formOpen()
  
        resetLoanForm();
        firstformbtn.classList.remove("loader-initialized");
        loaninnerform.classList.remove("loan-form-sub-otp", "loan-form-success", "loan-form-request-fail", "loan-form-something-wrong");
       }
      });
    })
    
    if(documentWhatsAppBtn){
      documentWhatsAppBtn.addEventListener("click",function(e){
        e.preventDefault();
        formOpen()
      })
    }
   if(bannerFormButton){
      bannerFormButton.forEach(element => {
        element.addEventListener("click",function(){
            formOpen();
        })
      });
    }
    if(neeyatBtn){
      neeyatBtn.forEach(element => {
        element.addEventListener("click",function(){
          
            formOpen();
  
        })
      });
    }
    
    if(productBannerButton && !cardlink){
      productBannerButton.addEventListener("click",function(e){
        e.preventDefault();
        formOpen();
      })
    }
   
    if(stickyFooter && !cardlink){
      stickyFooter.addEventListener("click",function(e){
      // e.preventDefault();
      formOpen()
     })
    }
    
    if (locationCardButton && !cardlink) {
      
        locationCardButton.forEach(function (card) {
        
          card.addEventListener("click", function (e) {
            e.preventDefault();
            formOpen();
          });
        });
    }
  
  
  
    loanTypeDropdownSelect();
    
  
    
  
   
  
      crossIcon.forEach(function(e){
        e.addEventListener("click", function () {
  
  
          if(emiOverlay||elgOverlay){
            if(emiOverlay.classList.contains("show")||elgOverlay.classList.contains("show")){
              loaninnerform.style.visibility="hidden";
              overlay.style.zIndex="1000";
  
              
  
              if(loaninnerform.classList.contains("loan-form-success")){
                loaninnerform.classList.remove("loan-form-success");
                loaninnerform.classList.remove("loan-form-sub-otp");
  
              }
  
        
            }else{
              loaninnerform.classList.remove("loan-form--open")
              overlay.classList.remove("show");
              bodyElement.style.overflowY = "auto";
              loaninnerform.style.visibility="hidden";
              resetLoanForm();
              loaninnerform.classList.remove("loan-form-sub-otp", "loan-form-success", "loan-form-request-fail", "loan-form-something-wrong");
              if(loaninnerform.classList.contains("loan-form-success")){
                loaninnerform.classList.remove("loan-form-success");
                loaninnerform.classList.remove("loan-form-sub-otp");
  
              }
            }
          }else{
            loaninnerform.classList.remove("loan-form--open")
            overlay.classList.remove("show");
            bodyElement.style.overflowY = "auto";
            loaninnerform.style.visibility="hidden";
            // resetLoanForm();
            // loaninnerform.classList.remove("loan-form-sub-otp", "loan-form-success", "loan-form-request-fail", "loan-form-something-wrong");
            if(loaninnerform.classList.contains("loan-form-success")){
              loaninnerform.classList.remove("loan-form-success");
              loaninnerform.classList.remove("loan-form-sub-otp");
  
            }
            
      
          }
          
          resetLoanForm();
          loaninnerform.classList.remove("loan-form-sub-otp", "loan-form-success", "loan-form-request-fail", "loan-form-something-wrong");
        });
      })  
      if(firstformbtn){
        firstformbtn.addEventListener("click",function(){
  
          loaninnerform.classList.add("loan-form-sub-otp");
          otpPhoneNum().textContent = cutomerNo().value;
          startTimer(footer_time_limit,footer_time_out);
          const timerElement = document.querySelector(".applyloanform .timer");
          if (timerElement) {
              timerElement.style.display = "block";
          }      loanOtpInput().value = "";
          
          document.querySelector("#otp-digits").textContent = "0/4 Digits";
    
        });
      }
      
  
      let resendOtpBtn = document.querySelector("#loan-form-resend-otp");
      if(resendOtpBtn){
        resendOtpBtn.addEventListener("click", function() {
          startTimer(footer_time_limit,footer_time_out);
        });
      }
      
  
      otparrow.addEventListener("click",function(){
  
        loaninnerform.classList.remove("loan-form-sub-otp");
        clearInterval(intervalTime);
        loanOtpInput().value = "";
      });
  
  
  
    
    let loanSubParent = document.querySelector( ".loan-form-sub-parent .cmp-container" );
    let emiOverlay=document.querySelector(".cmp-container--emicaloverlay");
    let elgOverlay = document.querySelector(".cmp-container--elgcaloverlay");
  
    loaninnerform.addEventListener("click", function (event) {
      
      if(event.target.classList.contains("subpoints")) {
        let inputId = event.target.dataset.getInput;
        let input = document.querySelector('#'+ inputId);
        input.value = event.target.textContent.trim();
  
        if(input.id == "form-loan-type") {
          let loanType = event.target.dataset.loanType;
          input.dataset.loanType = loanType;
          stateInput().value = "";
          loanProduct().dispatchEvent(new Event("change"));
        }
  
        if(input.id != "form-loan-type") {
          input.dispatchEvent(new Event('change'));
          input.classList.add("place-selected");
        }
  
        input.dispatchEvent(new Event('input', { bubbles: true }));
  
        return;
      }
      
      if ( !loanSubParent.contains(event.target)) {
            if(emiOverlay||elgOverlay){
              if(emiOverlay.classList.contains("show")||elgOverlay.classList.contains("show")){
                loaninnerform.style.visibility="hidden";
                overlay.style.zIndex="1000";
                
  
          
              }else{
                overlay.classList.remove("show");
                loaninnerform.style.visibility="hidden";
                document.body.style.overflowY = "auto";
                resetLoanForm();
                clearInterval(intervalTime);
                loanOtpInput().value = "";
                loaninnerform.classList.remove("loan-form-sub-otp", "loan-form-success", "loan-form-request-fail", "loan-form-something-wrong")
              }
            }else{
              overlay.classList.remove("show");
              loaninnerform.style.visibility="hidden";
              document.body.style.overflowY = "auto";
              resetLoanForm();
              clearInterval(intervalTime);
              loanOtpInput().value = "";
              loaninnerform.classList.remove("loan-form-sub-otp", "loan-form-success", "loan-form-request-fail", "loan-form-something-wrong")
            }
      }
    });
  
   overlay.addEventListener("click", function (event){
    if (window.matchMedia("(max-width: 1024px)").matches){
  
        overlay.classList.remove("show");
        loaninnerform.style.visibility="hidden";
        bodyElement.style.overflowY = "auto";
        
    }
   })
  
    
  
  // })
  
  
   function formOpen(){
    if (window.matchMedia("(max-width: 1024px)").matches){
        overlay.classList.add("show");
  
  
        loaninnerform.classList.add("loan-form--open");
        loaninnerform.style.visibility="visible";
  
        bodyElement.style.overflowY = "hidden";
  
    }else{
        overlay.classList.add("show");
        if(emiOverlay||elgOverlay){
          if(emiOverlay.classList.contains("show")||elgOverlay.classList.contains("show")){
          overlay.style.zIndex = "1205";
          }
  
        }
        loaninnerform.style.visibility="visible";
        bodyElement.style.overflowY = "hidden";
    }
    
  }
  
  
  function toggleOptionForm(optionFormParent) {   
  if (optionFormParent.style.display === "block") {
      optionFormParent.style.display = "none";
  } else {
      optionFormParent.style.display = "block";
  }
  }
  function toggleOptionSelect(optionFormParent) { 
      let computedStyle = window.getComputedStyle(optionFormParent);
      let visibility = computedStyle.getPropertyValue('visibility');  
    if (visibility === "hidden") {
        optionFormParent.style.visibility  = "visible";
    } else {
        optionFormParent.style.visibility  = "hidden";
    }
  }
  
  function toggleArrowImage(arrowImage) {
  arrowImage.classList.toggle("inverted");
  }
  
  let statecontainer=document.getElementById("statecontainer")
  let stateparent=document.getElementById("stateparent")
  let branchcontainer=document.getElementById("branchcontainer")
  let branchparent=document.getElementById("branchparent")
  let multiSelect = document.querySelector(".multiselectoptions");
  let multiSelectDropdown=multiSelect.nextElementSibling;
  // let multiSelectContainer=document.querySelector(".multiselectoptions");
  
  let isStateContainerVisible = false; 
  let isBranchContainerVisible = false;
  let isLoanContainerVisible=false;
  
  document.addEventListener("click", handleClickOutside);
  
  function handleClickOutside(event) {
    if ((event.target.closest("#statecontainer") && event.target.classList.contains("subpoints")) || isStateContainerVisible && !stateparent.contains(event.target)&& !statecontainer.contains(event.target)) {
        toggleOptionSelect(statecontainer);
        toggleArrowImage(stateparent.querySelector('.arrowimage'));
        isStateContainerVisible = false;
    }
    if ((event.target.closest("#branchcontainer") && event.target.classList.contains("subpoints")) ||isBranchContainerVisible && !branchparent.contains(event.target)&& !branchcontainer.contains(event.target)) {
      toggleOptionSelect(branchcontainer);
      toggleArrowImage(branchparent.querySelector('.arrowimage'));
      isBranchContainerVisible = false; 
    }
    if ((event.target.closest(".cmp-form-text") && event.target.classList.contains("subpoints")) || (isLoanContainerVisible && !multiSelect.contains(event.target) && !multiSelectDropdown.contains(event.target))) {
      
      let optionFormParent = multiSelect.nextElementSibling;
      toggleOptionForm(optionFormParent);
      toggleArrowImage(this.querySelector('.arrowimage'));
      isLoanContainerVisible=false;
    }
  }
  
  let branchArrowImg = document.querySelector('#branchparent .arrowimage');
  stateparent.addEventListener("click", function (event) {
    branchcontainer.style.visibility = "hidden";
    branchArrowImg.classList.remove("inverted");
    isBranchContainerVisible = false;
  
    toggleOptionSelect(statecontainer);
    toggleArrowImage(this.querySelector('.arrowimage'));
    isStateContainerVisible = !isStateContainerVisible; 
    
    event.stopPropagation();
  });
  
  
  let stateArrowImg = document.querySelector('#stateparent .arrowimage');
  branchparent.addEventListener("click", function (event) {
    statecontainer.style.visibility = "hidden";
    stateArrowImg.classList.remove("inverted");
    isStateContainerVisible = false;
  
    toggleOptionSelect(branchcontainer);
    toggleArrowImage(this.querySelector('.arrowimage'));
    isBranchContainerVisible = !isBranchContainerVisible; 
    
    event.stopPropagation();
  });
  
    
  multiSelect.addEventListener("click",function(event){
    branchcontainer.style.visibility = "hidden";
    branchArrowImg.classList.remove("inverted");
    isBranchContainerVisible = false;
    
    statecontainer.style.visibility = "hidden";
    stateArrowImg.classList.remove("inverted");
    isStateContainerVisible = false;
  
    let optionFormParent = this.nextElementSibling;
    toggleOptionForm(optionFormParent);
    toggleArrowImage(this.querySelector('.arrowimage'));
    isLoanContainerVisible=!isLoanContainerVisible;
    event.stopPropagation();
  });
  
  
  const checkbox = document.getElementById("loanformcheck");
  const circle = document.querySelector(".circle");
  
  checkbox.addEventListener("change", function() {
    if (this.checked) {
          circle.classList.add("movecircle");
             circle.classList.remove("animate");
          
             } else {
      circle.classList.remove("movecircle");
      circle.classList.add("animate");
  
    }
  });
  
  function  resetLoanForm() {
    let applyloanform = document.querySelector(".applyloanform");
    let errorMessages = applyloanform.querySelectorAll(".loan-form-err");
  
    errorMessages.forEach(errMsg => {
      errMsg.style.display = "none";
    });
  
    let inputs = [loanProduct(), formLoanAmt(), cutomerName(), cutomerIncome(), 
      formDobInput(), stateInput(), branchInput(), cutomerNo()];
    
    inputs.forEach(i => i.value = "");
  
    formTc().checked = false;
    document.querySelector("#radio-salary").checked = true;
  
    let submitBtns = document.querySelectorAll(".loan-form-button-container .cmp-container");
    submitBtns.forEach( btn => {
      btn.classList.remove("loan-form-button-active");
    });
  }
  
  let footer_time_limit = 30;
  let footer_time_out;
  let intervalTime;
  
  otpNumChange().addEventListener("click", function() {
    let loaninnerform=document.querySelector(".loan-form-sub-parent");
    loaninnerform.classList.remove("loan-form-sub-otp");
    clearInterval(intervalTime);
    loanOtpInput().value = "";
  });
  
  loanFormOtpBtn().addEventListener("click", function() {
    clearInterval(intervalTime);
  });
  
  function startTimer(footer_time_limit,footer_time_out) {
    clearInterval(footer_time_out);
    clearInterval(intervalTime);
    let resendOtpBtn = document.querySelector("#loan-form-resend-otp");
    intervalTime = setInterval(() => {
        if (footer_time_limit >= 0) {
            document.querySelector(".applyloanform .timer").style.display = "block";
            if (footer_time_limit <= 9) {
              document.querySelector('.applyloanform .timer').innerHTML = '00:' + '0' + footer_time_limit;
            } else {
              document.querySelector('.applyloanform .timer').innerHTML = '00:' + footer_time_limit;
            }
            footer_time_limit--;
            resendOtpBtn.style.pointerEvents = "none";
        } else {
            clearInterval(footer_time_out);
            document.querySelector('.applyloanform .timer').style.display = "none";
            resendOtpBtn.style.pointerEvents = "unset";
        }
    }, 1000);
  }
  }
}

window.addEventListener('pageshow', function(event) {
  // If the page is reloaded from the cache, perform a full refresh
  if (event.persisted) {
    window.location.reload();
  }
});