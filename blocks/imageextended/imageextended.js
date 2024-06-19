export default function decorate(block) {
  var newDiv = gettingImage(block);

  block.innerHTML(newDiv);

}

function gettingImage(block) {
  const isDesktop = window.matchMedia("(min-width: 900px)");
  const isMobile = window.matchMedia("(max-width: 768px)");

  // Getting Element
  const blockContainer = block.innerHTML.trim();

  // Div
  const blockDiv = document.createElement("div");

  // Div Inner HTMl
  blockDiv.innerHTML = blockContainer;

  // Div child
  const blockDivChild = blockDiv.children;

  // Picture
  const blockPic = "";

  // Text
  const hrefElem = "";

  // A tag
  const createHref = document.createElement("a");

  // Creating a DIV for desktop tag
  const createDivDesktop = document.createElement("div");
  if (isDesktop.matches) {
    blockPic = blockDivChild[0].querySelector("picture");
    hrefElem = blockDivChild[2].innerText.trim();
    createHref.href = hrefElem;
    createHref.target = "_blank";
    createHref.innerHTML = blockPic;
    createDivDesktop.classList.add("image-href-desktop");
    createDivDesktop.innerHTML(createHref);
  } else if (isMobile.matches) {
    blockPic = blockDivChild[3].querySelector("picture");
    hrefElem = blockDivChild[5].innerText.trim();
    createHref.href = hrefElem;
    createHref.target = "_blank";
    createHref.innerHTML = blockPic;
    createDivDesktop.classList.add("image-href-mobile");
    createDivDesktop.innerHTML(createHref);
  }

  return createDivDesktop;
}
