import { getProps } from "../../scripts/scripts.js";

export default function decorate(block) {
    console.log("tab link block");

    const heading = block.querySelector("p");
    const activeTab = block.querySelector("strong");
    const div = document.createElement("div");
    // heading.remove();
    div.innerHTML = `
            <div class="text legal-mobile-text">
                <div id="text-4267ae00e4" class="cmp-text">
                    <p>${heading.innerText}</p>
                    <p class="active-tab-name">${activeTab.innerText}</p>
                </div>
            </div>`
    block.insertBefore(div, block.children[0]);
    const model = block.children[1];
    model.classList.add("model-mob-hide");
    div.querySelector(".active-tab-name").addEventListener('click', function (e) {
        if (e.currentTarget.classList)
            model.classList.add("model-mob-hide");
    })
} 