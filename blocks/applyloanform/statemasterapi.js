import { workFlowStatemaster } from "./statemasterbiz.js";
import { fetchAPI } from "../../scripts/scripts.js";

export function stateMasterApi() {
    let loaninnerform=document.querySelector(".loan-form-sub-parent");
    let applyLaonFormOpenBtns = [];
    let buttonExpert = document.querySelectorAll(".expert");
    const productBannerButton=document.querySelector("#loan-banner .cmp-teaser__content .cmp-teaser__action-container .cmp-teaser__action-link")
    const documentWhatsAppBtn =document.querySelector(".cmp-container--documentrequired .cmp-container .extendedbutton")
    const stickyFooter=document.getElementById("sticky-btn-loan-form");
    const locationCardButton = document.querySelectorAll(
        ".cmp-container--branches .cmp-contentfragmentlist .cmp-contentfragment .cmp-contentfragment__elements .cmp-contentfragment__element--ctaName .cmp-contentfragment__element-value"
      );
  const neeyatBtn = document.querySelectorAll(".open-form-btn");
  

    applyLaonFormOpenBtns = [...buttonExpert, productBannerButton, documentWhatsAppBtn, stickyFooter, ...locationCardButton, ...neeyatBtn];

    let filterdBtns = applyLaonFormOpenBtns.filter(btn => btn != null);

    filterdBtns.forEach(function (button) {
        button.addEventListener("click", function (e) {
            if (loaninnerform.dataset.stateMaster != "true") {
                statemasterGetStatesApi()
                    .catch(function (error) {
                        console.warn(error)
                    });

                loaninnerform.dataset.stateMaster = true;
            }
        });
    });
}

function statemasterGetStatesApi() {
    return new Promise((resolve, reject) => {
        let url = "https://publish-p133703-e1305981.adobeaemcloud.com/graphql/execute.json/piramalfinance/State%20City%20Master";

        // let stateMasterGraphQLQuery = "query MyQuery { statemasterList { items { state, data } } }";

        fetchAPI("GET", url)
            .then(function (response) {
                workFlowStatemaster(response.responseJson.data.statemasterList.items);
            })
            .catch(function (error) {
                console.warn(error);
            });
    });
}