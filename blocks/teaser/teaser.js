export function decorateButtons(...buttons) {
    return buttons
      .map((div) => {
        const a = div.querySelector('a');
        if (a) {
          a.classList.add('button');
          if (a.parentElement.tagName === 'EM') a.classList.add('secondary');
          if (a.parentElement.tagName === 'STRONG') a.classList.add('primary');
          return a.outerHTML;
        }
        return '';
      })
      .join('');
  }
  
  export function generateTeaserDOM(props, classes) {
    // Extract properties, always same order as in model, empty string if not set
    const nullDom = document.createElement("a");
    const [pictureBgContainer,pictureContainer, eyebrow, title, longDescr, shortDescr, firstCta, secondCta , ctaImage = nullDom , ctaImageAlt = nullDom , ctaImageUrl =  nullDom, ctaImage2 = nullDom , ctaImageAlt2 = nullDom , ctaImageUrl2 = nullDom , ctaImage3 = nullDom , ctaImageAlt3 = nullDom , ctaImageUrl3 = nullDom ] = props;
    const bgPicture = pictureBgContainer.querySelector('picture');
    const picture = pictureContainer.querySelector('picture');
    console.log(bgPicture , picture);
    const hasShortDescr = shortDescr.textContent.trim() !== '';
    // Build DOM
    const ctaImageAnchor = ctaImageUrl.querySelector("a") || nullDom;
    const ctaImageAnchor2 = ctaImageUrl2.querySelector("a") || nullDom;
    const ctaImageAnchor3 = ctaImageUrl3.querySelector("a") || nullDom;
    ctaImageAnchor.innerHTML = ctaImage.innerHTML;
    ctaImageAnchor2.innerHTML = ctaImage2.innerHTML;
    ctaImageAnchor3.innerHTML = ctaImage3.innerHTML;
    const teaserDOM = document.createRange().createContextualFragment(`
      <div class='background'>${bgPicture ? bgPicture.outerHTML : ''}</div>
      <div class="front-picture">${picture ? picture.outerHTML : ''}</div>
      <div class='foreground'>
        <div class='text'>
          ${
            eyebrow.textContent.trim() !== ''
              ? `<div class='eyebrow'>${eyebrow.textContent.trim().toUpperCase()}</div>`
              : ``
          }
          <div class='title'>${title.innerHTML}</div>
          <div class='long-description'>${longDescr.innerHTML}</div>
          <div class='short-description'>${hasShortDescr ? shortDescr.innerHTML : longDescr.innerHTML}</div>
          <div class='cta'>${decorateButtons(firstCta, secondCta)}</div>
        </div>
        <div class='spacer'>
        </div>
        <div class="cta-image">${ctaImageAnchor ? ctaImageAnchor.outerHTML : ''}</div>
        <div class="cta-image">${ctaImageAnchor2 ? ctaImageAnchor2.outerHTML : ''}</div>
        <div class="cta-image">${ctaImageAnchor3 ? ctaImageAnchor3.outerHTML : ''}</div>
      </div>
    `);
  
    // set the mobile background color
    const backgroundColor = [...classes].find((cls) => cls.startsWith('bg-'));
    if (backgroundColor) {
      teaserDOM
        .querySelector('.foreground')
        .style.setProperty('--teaser-background-color', `var(--${backgroundColor.substr(3)})`);
    }
  
    // add final teaser DOM and classes if used as child component
    return teaserDOM;
  }
  
  export default function decorate(block) {
    // get the first and only cell from each row
    const props = [...block.children].map((row) => row.firstElementChild);
    const teaserDOM = generateTeaserDOM(props, block.classList);
    block.textContent = '';
    block.append(teaserDOM);
  }
  