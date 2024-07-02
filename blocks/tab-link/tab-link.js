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
    model.classList.add("compony-details");
    div.querySelector(".active-tab-name").addEventListener('click', function (e) {
        // if (e.currentTarget.classList) {
        //     model.classList.add("model-mob-hide");
        // } else {
        //     model.classList.remove("model-mob-hide");
        // }
        if (model.classList.contains("model-mob-hide")) {
            model.classList.remove("model-mob-hide");
            document.body.classList.remove("overlay-active");
        } else {
            model.classList.add("model-mob-hide");
            document.body.classList.add("overlay-active");
        }
    })

    // Add a click event to the overlay to close the modal
    const overlay = document.createElement("div");
    overlay.classList.add("body-overlay");
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function () {
        model.classList.remove("model-mob-hide");
        document.body.classList.remove("overlay-active");
    });
} 