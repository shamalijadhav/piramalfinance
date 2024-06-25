export default function decorate(block) {
    const props = [...block.children].map( row => row);
    const getHTML = generateFeatureHTML(props);
    const newDivFeature = document.createElement('div');
    newDivFeature.innerHTML = getHTML;
    block.innerHTML = '';
    block.append(newDivFeature);
}

function generateFeatureHTML(props) {
    let [
        containerLink, 
        cardDescription, 
        leftSideImage, 
        leftSideImageAlt, 
        rightSideImage, 
        rightSideImageAlt,
        rightSideImageLink,
        keyFeatureTitle,
        keyFeatureImagePlus,
        keyFeatureImageMinus,
        keyFeatureInnerImage1, 
        keyFeatureInnerText1,
        keyFeatureInnerImage2, 
        keyFeatureInnerText2,
        keyFeatureInnerImage3,
        keyFeatureInnerText3,
    ] 
        = props;

    containerLink = containerLink.textContent.trim();
    cardDescription = cardDescription.querySelector('div > div');
    leftSideImage = leftSideImage.querySelector('div > picture > img').src;
    leftSideImageAlt = leftSideImageAlt.textContent.trim();
    rightSideImage = rightSideImage.querySelector('div > picture > img').src;
    rightSideImageAlt = rightSideImageAlt.textContent.trim();
    rightSideImageLink = rightSideImageLink.textContent.trim();
    keyFeatureTitle = keyFeatureTitle.textContent.trim();
    keyFeatureImagePlus = keyFeatureImagePlus.querySelector('div > picture > img').src;
    keyFeatureImageMinus = keyFeatureImageMinus.querySelector('div > picture > img').src;

    keyFeatureInnerText1 = keyFeatureInnerText1.querySelector('div > div');
    keyFeatureInnerText2 = keyFeatureInnerText2.querySelector('div > div');
    keyFeatureInnerText3 = keyFeatureInnerText3.querySelector('div > div');
    keyFeatureInnerImage1 = keyFeatureInnerImage1.querySelector('div > picture > img').src;
    keyFeatureInnerImage2 = keyFeatureInnerImage2.querySelector('div > picture > img').src;
    keyFeatureInnerImage3 = keyFeatureInnerImage3.querySelector('div > picture > img').src;

  // Generate HTML
  const html = `<div class="homeloanteaser teaser">
    <div id="" class="cmp-teaser">
        <a class="cmp-teaser__link" href="${containerLink}">
            <div class="cmp-teaser__content">
                ${cardDescription.outerHTML}
            </div>
            <div class="cmp-teaser__image">
                <div data-cmp-is="image"
                    data-cmp-filereference="${leftSideImage}" data-cmp-hook-image="imageV3" class="cmp-image" itemscope=""
                    itemtype="">
                    <img src=""
                        loading="lazy" class="cmp-image__image" itemprop="contentUrl" alt="${leftSideImageAlt}" src="${leftSideImage}">
                </div>
            </div>
        </a>
        <a href="${rightSideImageLink}" class="redirectionbutton">
        <img
                data-src="${rightSideImage}" class="lozad"
                src="${rightSideImage}" data-loaded="true" alt="${rightSideImageAlt}">
        </a>
        <div class="keyfeature-container">
            <div class="keyfeatures-info">
                <p class="heading">${keyFeatureTitle}</p>
                <img data-src="${keyFeatureImagePlus}" alt="plusicon"
                    class="plusicon lozad" src="${keyFeatureImagePlus}"
                    data-loaded="true" style="display: block;">
                <img data-src="${keyFeatureImageMinus}" alt="minusicon"
                    class="minusicon lozad" style="display: none;"
                    src="${keyFeatureImageMinus}" data-loaded="true">
                <div class="keyfeatures" style="display: none;">
                    <div class="feature" id="hideshow">
                        <img data-src="${keyFeatureInnerImage1}" alt="cost"
                            class="lozad" src="${keyFeatureInnerImage1}"
                            data-loaded="true">
                        <div class="feature-details">
                            ${keyFeatureInnerText1.outerHTML}
                        </div>
                    </div>

                    <div class="feature" id="hideshow">
                        <img data-src="${keyFeatureInnerImage2}" alt="tenure"
                            class="lozad" src="${keyFeatureInnerImage2}"
                            data-loaded="true">
                        <div class="feature-details">
                            ${keyFeatureInnerText2.outerHTML}
                        </div>
                    </div>

                    <div class="feature" id="hideshow">
                        <img data-src="${keyFeatureInnerImage3}" alt="Interest"
                            class="lozad" src="${keyFeatureInnerImage3}"
                            data-loaded="true">
                        <div class="feature-details">
                        ${keyFeatureInnerText3.outerHTML}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`

return html;
}

