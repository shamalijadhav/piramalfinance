// callback for touch based scrolling event
function updateButtons(entries) {
    entries.forEach((entry) => {
        // if panel has become > 60% visible
        if (entry.isIntersecting) {
            // get the buttons
            // const carouselButtons = entry.target.parentNode.parentNode.querySelector('.button-container');
            // const carouselButtons = entry.target.parentNode.parentNode.lastChild;
            // remove selected state from whatever button has it
            // [...carouselButtons.querySelectorAll(':scope button')].forEach((b) => b.classList.remove('selected'));
            // // add selected state to proper button
            // carouselButtons
            //     .querySelector(`:scope button[data-panel='${entry.target.dataset.panel}']`)
            //     .classList.add('selected');
        }
    });
}
const observer = new IntersectionObserver(updateButtons, { threshold: 0.6, rootMargin: '500px 0px' });

export default function decorate(block) {
    const [name, id] = block.children;
    const names = name.innerText.split(",");
    const ids = id.innerText.split(",");
    let tabsTemplate = '';
    block.innerHTML = '';
    names.forEach(function (eachName, index) {
        const div = document.createElement("div");
        div.id = ids[index].trim().replace(/ /g, '-');
        div.innerText = eachName.trim();
        block.append(div);
        observer.observe(div);
        // tabsTemplate += `<div id="${ids[index].trim().replace(/ /g, '-')}">${eachName.trim()}</div>`
    });

    block.addEventListener("click", function (e) {
        const currentEl = e.target;
        const id = currentEl.id;
        const tabContainer = document.querySelector('[data-id=' + id + ']')
        if (tabContainer) {
            const section = tabContainer.closest(".section");
            section.querySelectorAll(".tab-container").forEach(function (el, index) {
                section.querySelector(".tab-name").children[index].classList.remove("active");
                el.classList.add("dp-none");
                el.classList.remove("active");
            })
            tabContainer.classList.remove("dp-none");
            tabContainer.classList.add("active");
            currentEl.classList.add("active");
        }
    })
    console.log(block);
}