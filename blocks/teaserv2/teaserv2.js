export default function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  var renderTeaserHTML = renderTeaserHTMLFactory(props);
  block.innerHTML = '';
  block.append(renderTeaserHTML);
}

function renderTeaserHTMLFactory(props) {
  const [mainHref, bgImage, frontImage, title, description, mobileDescription, button, buttonHref] = props;

  const mainhrefCallDiv = document.createElement("a");
  mainhrefCallDiv.href = mainHref?.textContent.trim();
  console.log(mainhrefCallDiv);

  const bgImageCallDiv = document.createElement("div");
  const bgImageSrc = bgImage?.querySelector("picture > img").src;
  bgImageSrc && (bgImageCallDiv.style.backgroundImage = `url(${bgImageSrc})`);
//   console.log(bgImageCallDiv);

  const frontImageCallDiv = document.createElement("div");
  const frontImageCall = frontImage.querySelector("picture");
  //   frontImageCall.querySelector('img').alt = altTextImage.textContent.trim();
  frontImageCallDiv.append(frontImageCall || frontImageCallDiv);
//   console.log(frontImageCallDiv);

  const titleCallDiv = document.createElement("div");
  const titleDiv = title?.textContent.trim() || titleCallDiv;
  titleCallDiv.innerHTML = titleDiv;
//   console.log(titleCallDiv);

  const descriptionCallDiv = document.createElement("div");
  const descriptionDiv = description?.textContent.trim() || descriptionCallDiv;
  descriptionCallDiv.innerHTML = descriptionDiv;
//   console.log(descriptionCallDiv);

  const buttonHrefAnchor = buttonHref.querySelector("a");
  const buttonDiv = button?.textContent.trim();
  buttonHrefAnchor.innerText = buttonDiv;
//   console.log(buttonHrefAnchor);

  let mainWrapper = ''
  if (mainhrefCallDiv instanceof HTMLAnchorElement) {
    mainhrefCallDiv.append(bgImageCallDiv);
    mainhrefCallDiv.append(frontImageCallDiv);
    mainhrefCallDiv.append(titleCallDiv);
    mainhrefCallDiv.append(descriptionCallDiv);
    mainhrefCallDiv.append(buttonHrefAnchor);
    mainWrapper = mainhrefCallDiv;
  } else {
    var mainDiv = document.createElement("div");
    mainDiv.append(bgImageCallDiv);
    mainDiv.append(frontImageCallDiv);
    mainDiv.append(titleCallDiv);
    mainDiv.append(descriptionCallDiv);
    mainDiv.append(buttonHrefAnchor);
    mainWrapper = mainDiv;
  }

  return mainWrapper;
}
