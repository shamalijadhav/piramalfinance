export default function decorate(block) {
  console.log(block);
  const newDiv = createImageWithLink(block);
  if (newDiv) {
    block.innerHTML = "";
    block.appendChild(newDiv);
    aTagPreventDefault();
  }
}

function createImageWithLink(block) {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const blockDiv = document.createElement("div");
  blockDiv.innerHTML = block.innerHTML.trim();

  const pictureIndex = isMobile ? 3 : 0;
  const textIndex = isMobile ? 5 : 2;
  const blockPic = blockDiv.children[pictureIndex]?.querySelector("picture");
  const hrefElem = blockDiv.children[textIndex]?.innerText.trim();

  if (!blockPic || !hrefElem) {
    console.warn("Required elements not found in the block.");
    return document.createElement("div");
  }

  const createHref = document.createElement("a");
  createHref.href = hrefElem;
  createHref.target = "_blank";
  createHref.classList.add("anchor-event-link");
  createHref.appendChild(blockPic);

  const createDiv = document.createElement("div");
  createDiv.classList.add(isMobile ? "image-href-mobile" : "image-href-desktop");
  createDiv.appendChild(createHref);

  return createDiv;
}

function aTagPreventDefault() {
  const anchorLinks = document.querySelectorAll('.anchor-event-link');

  anchorLinks?.forEach(link => {
    if (link.getAttribute('href') === '#') {
      link.addEventListener('click', e => e.preventDefault());
    }
  });
}