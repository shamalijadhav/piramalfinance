export default function decorate(block) {
  const newDiv = gettingImage(block);

  block.innerHTML = newDiv ;

}

function gettingImage(block) {
  let isDesktop = window.matchMedia("(min-width: 900px)");
  let isMobile = window.matchMedia("(max-width: 768px)");

  // Getting Element
  let blockContainer = block.innerHTML.trim();

  // Div
  let blockDiv = document.createElement("div");

  // Div Inner HTMl
  blockDiv.innerHTML = blockContainer;

  // Div child
  let blockDivChild = blockDiv.children;

  // Picture
  let blockPic = "";

  // Text
  let hrefElem = "";

  // A tag
  let createHref = document.createElement("a");

  // Creating a DIV for desktop tag
  let createDiv = document.createElement("div");

  if (isDesktop.matches) {
    blockPic = blockDivChild[0].querySelector("picture");
    hrefElem = blockDivChild[2].innerText.trim();
    createHref.href = hrefElem;
    createHref.target = "_blank";
    createHref.appendChild(blockPic);
    createDiv.classList.add("image-href-desktop");
    createDiv.appendChild(createHref);
  } else if (isMobile.matches) {
    blockPic = blockDivChild[3].querySelector("picture");
    hrefElem = blockDivChild[5].innerText.trim();
    createHref.href = hrefElem;
    createHref.target = "_blank";
    createHref.appendChild(blockPic);
    createDiv.classList.add("image-href-mobile");
    createDiv.appendChild(createHref);
  }

  return createDiv;
}
