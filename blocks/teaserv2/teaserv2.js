export default function decorate(block) {
  const props = [...block.children].map((row) => row.firstElementChild);
  var renderTeaserHTML = renderTeaserHTMLFactory(props);
}

function renderTeaserHTMLFactory(props) {
  const [mainHref, bgImage, frontImage, altTextImage, title, description, mobileDescription, button] = props;

  const mainhrefCallDiv = document.createElement('a');
  mainhrefCallDiv.href = mainHref?.textContent.trim();
  console.log(mainhrefCallDiv);

  const bgImageCallDiv = document.createElement('div');
  const bgImageSrc = bgImage?.querySelector('picture > img').src;
  bgImageSrc && (bgImageCallDiv.style.backgroundImage = `url(${bgImageSrc})`);
  console.log(bgImageCallDiv);


  const frontImageCallDiv = document.createElement('div');
  const frontImageCall = frontImage.querySelector('picture');
  frontImageCall.querySelector('img').alt = altTextImage.textContent.trim();
  frontImageCallDiv.append(frontImageCall || frontImageCallDiv);
  console.log(frontImageCallDiv);


  const titleCallDiv = document.createElement('div');
  const titleDiv = title?.textContent.trim() || titleCallDiv;
  titleCallDiv.innerHTML = titleDiv;
  console.log(titleCallDiv);


  const descriptionCallDiv = document.createElement('div');
  const descriptionDiv = description?.textContent.trim() || descriptionCallDiv;
  descriptionCallDiv.innerHTML = descriptionDiv;
  console.log(descriptionCallDiv);


  const buttonCallDiv = document.createElement('button');
  const buttonDiv = button.querySelector('a') || buttonCallDiv;
  console.log(buttonDiv);







  //   const bgImage = bgImage.style.backgroundImage = "url(images/img.jpg)";

//   const teaserHTML = `<div>
//   ${mainhrefDiv} ? ${bgImageCallDiv}
//   ${frontImageCallDiv}
//   ${titleCallDiv}
//   ${descriptionCallDiv}
//   ${buttonDiv}
//   : ${bgImageCallDiv}
//   ${frontImageCallDiv}
//   ${titleCallDiv}
//   ${descriptionCallDiv}
//   ${buttonDiv}
//   </div>`
}
