export default function decorate(block) {
    const [name, id] = block.children;
    const names = name.innerText.split(",");
    const ids = id.innerText.split(",");
    let tabsTemplate = '';
    names.forEach(function (eachName, index) {
        tabsTemplate += `<div id="${ids[index].trim().replace(/ /g, '-')}">${eachName.trim()}</div>`
    });
    block.innerHTML = tabsTemplate;
    block.addEventListener("click", function (e) {
        const currentEl = e.target;
        const id = currentEl.id;
        const tabContainer = document.querySelector('[data-id=' + id + ']')
        if (tabContainer) {
            const section = tabContainer.closest(".section");
            section.querySelectorAll(".tab-container").forEach(function (el, index) {
                section.querySelector(".tab-name").children[index].classList.remove("active");
                el.classList.add("dp-none");
            })
            tabContainer.classList.remove("dp-none");
            currentEl.classList.add("active");
        }
    })
    console.log(block);
}