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
        const id = e.target.id;
        const tabContainer = document.querySelector('[data-id=' + id + ']')
        if (tabContainer) {
            tabContainer.closest(".section").querySelectorAll(".tab-container").forEach(function (el) {
                el.classList.add("dp-none");
            })
            tabContainer.classList.remove("dp-none");
            console.log(e.target);
        }
    })
    console.log(block);
}