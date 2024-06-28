export default function decorate(block) {
  const props = Array.from(block.children, (row) => row.firstElementChild);
  const renderTeaserHTML = renderTeaserHTMLFactory(props);
  block.innerHTML = "";
  block.append(renderTeaserHTML);
  try {
    calculatorCallXf();
  } catch (error) {
    console.error(error);
  }
}

function renderTeaserHTMLFactory(props) {
  const [mainHref, bgImage, frontImage, title, description, mobileDescription, button, buttonHref, bgColor, teaserv2Attr] = props;

  const createElement = (tag, className, content) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.innerHTML = content || "";
    return element;
  };

  const mainLink = mainHref?.textContent.trim() || "";
  const container = document.createElement("a");
  if (mainLink) container.href = mainLink;

  const bgImageSrc = bgImage?.querySelector("picture > img")?.src || "";
  const bgBannerColor = bgColor?.textContent.trim()?.src || "";
  const bgImageDiv = createElement("div", "bg-image");
  if (bgImageSrc) bgImageDiv.style.backgroundImage = `url(${bgImageSrc})`;
  if (bgBannerColor) bgImageDiv.style.backgroundColor = bgBannerColor;

  const frontImagePic = frontImage?.querySelector("picture");
  const frontImageDiv = createElement("div", "front-image");
  if (frontImagePic) frontImageDiv.append(frontImagePic);

  const titleDiv = createElement("div", "title", title?.textContent.trim() || "");
  const descriptionDiv = createElement("div", "description", description?.textContent.trim() || "");

  let newButtonTag = "";
  const buttonHrefAnchor = buttonHref?.querySelector("a") || "";
  if (buttonHrefAnchor) {
    buttonHrefAnchor.innerText = button?.textContent.trim() || "";
    newButtonTag = buttonHrefAnchor.outerHTML;
  } else if (button) {
    newButtonTag = createElement("div", "button-container-text", button?.textContent.trim() || "");
  }

  bgImageDiv.append(frontImageDiv, titleDiv, descriptionDiv, newButtonTag);

  const teaserv2AttrGet = teaserv2Attr?.textContent?.trim() || "";
  teaserv2Attr.closest(".teaserv2-wrapper").setAttribute("data-teaserv2-xf", teaserv2AttrGet);

  if (container.tagName === "A") {
    container.append(bgImageDiv);
  }

  return container;
}

function calculatorCallXf() {
  document.querySelectorAll("[data-teaserv2-xf]").forEach((eachTeaserv2) => {
    eachTeaserv2.addEventListener("click", function (e) {
      e.stopImmediatePropagation();
      const xfGetAttr = this.getAttribute("data-teaserv2-xf");
      const findSectionXFShow = document.querySelector("." + xfGetAttr);
      findSectionXFShow.querySelector(".overlayDiv").classList.add("show");
      xfShowHideBodyClick(findSectionXFShow);
    });
  });
}

function xfShowHideBodyClick(findSectionXFShow) {
  let body = document.querySelector("body");
  body.classList.add("bodyBlur");
  body.addEventListener("click", function (e) {
    if (!e.target.closest(".show")) {
      //   if (findSectionXFShow.querySelector('.overlayDiv').classList.contains('show')) {
      findSectionXFShow.querySelector(".overlayDiv").classList.remove("show");
      body.classList.remove("bodyBlur");
      // }
    }
  });
}
