export default function decorate(block) {
  const props = Array.from(block.children, (row) => row.firstElementChild);
  const renderTeaserHTML = renderTeaserHTMLFactory(props);
  block.innerHTML = "";
  block.append(renderTeaserHTML);
}

function renderTeaserHTMLFactory(props) {
  const [mainHref, bgImage, frontImage, title, description, mobileDescription, button, buttonHref] = props;

  const createElement = (tag, className, content) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerHTML = content;
    return element;
  };

  const mainLink = mainHref?.textContent.trim();
  const container = mainLink ? document.createElement("a") : document.createElement("div");
  if (mainLink) container.href = mainLink;

  const bgImageSrc = bgImage?.querySelector("picture > img")?.src;
  const bgImageDiv = createElement("div", "bg-image");
  if (bgImageSrc) bgImageDiv.style.backgroundImage = `url(${bgImageSrc})`;

  const frontImagePic = frontImage?.querySelector("picture");
  const frontImageDiv = createElement("div", "front-image");
  if (frontImagePic) frontImageDiv.append(frontImagePic);

  const titleDiv = createElement("div", "title", title?.textContent.trim());
  const descriptionDiv = createElement("div", "description", description?.textContent.trim());

  const buttonHrefAnchor = buttonHref?.querySelector("a");
  if (buttonHrefAnchor) {
    buttonHrefAnchor.innerText = button?.textContent.trim();
    container.append(bgImageDiv, frontImageDiv, titleDiv, descriptionDiv, buttonHrefAnchor);
  } else {
    container.append(bgImageDiv, frontImageDiv, titleDiv, descriptionDiv);
  }

  return container;
}
