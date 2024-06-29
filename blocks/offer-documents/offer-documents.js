import { getProps } from "../../scripts/scripts.js";

export default function decorate(block) {
    const [mainTitle, image, title, subTitle, content, button, buttonURL, type] = getProps(block, {
        index: [1, 3]
    });


    if (type === "secondary") {
        block.innerHTML = `
            <div class="richtext text boxContainer stakeholder-container popup-rich-text">
                <div  class="cmp-text">
                    <p>
                        <a href="${buttonURL}" target="_blank" rel="noopener noreferrer"> ${mainTitle}</a>
                    </p>
                </div>
            </div>    
        `
        return;
    }
    block.innerHTML = `
            <div class="richtext text boxContainer stakeholder-container popup-rich-text modal-cta">
                <div  class="cmp-text">
                    <p>${mainTitle}</p>
                </div>
                <div class="stake-pop-up dp-none">
                    <div class="popup stake-document-popup">
                        <div class="text popupText">
                            <div class="cmp-text">
                                <p><span class="title">${title}</span></p>
                                <p><span class="description">${subTitle}</span></p>
                    
                                <p class="cross-container">
                                    <img src="/content/dam/piramalfinance/company/about-us/partnership/close.png" alt="close">
                                </p>
                                <div class="popup-parent-cont">
                                    <div class="popupContainer">
                                        ${content.outerHTML}
                                        <p>
                                            <span class="popupbutton">
                                                <a href="${buttonURL}"
                                                    target="_blank">
                                                    ${button}
                                                </a>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
    `

    block.addEventListener("click", function (e) {
        e.currentTarget.querySelector(".stake-pop-up")?.classList.remove("dp-none");
    })
}