import { generateDetailedTeaserDOM } from '../detailed-teaser/detailed-teaser.js';
import { generateTeaserDOM } from '../teaser/teaser.js';

const carouselContainerMapping = {}
carouselContainerMapping["detailed-teaser"] = generateDetailedTeaserDOM;
carouselContainerMapping["ss-teaser"] = generateDetailedTeaserDOM;

export default function decorate(block) {
    const tabid = block.children[0].innerText;
    const tabclass = block.children[1].innerText;
    // block.classList.add(tabclass);
    const panelContainer = document.createElement('div');
    panelContainer.classList.add('panel-container');
    block.dataset.id = tabid.trim().replace(/ /g, '-');
    const panels = Array.from(block.children).slice(1);
    [...panels].forEach((panel, i) => {
        // generate the  panel
        const [imagebg, image, classList, ...rest] = panel.children;
        const classesText = classList.textContent.trim();
        const classes = (classesText ? classesText.split(',') : []).map((c) => c && c.trim()).filter((c) => !!c);
        let blockType = 'teaser';
        // const blockType = [...classes].includes('detailed-teaser') ? 'detailed-teaser' : 'teaser';
        // check if we have to render teaser or a detailed teaser
        // const teaserDOM = 
        //   blockType === 'detailed-teaser'
        //     ? generateDetailedTeaserDOM([imagebg, image, ...rest], classes)
        //     : generateTeaserDOM([imagebg, image, ...rest], classes);
        let generateOtherComponent = null;
        classes.forEach(function (className) {
            if (carouselContainerMapping[className]) {
                blockType = className;
                generateOtherComponent = carouselContainerMapping[className];
            }
        })
        generateOtherComponent = generateOtherComponent ? generateOtherComponent([imagebg, image, ...rest], classes) : generateTeaserDOM([imagebg, image, ...rest], classes);
        panel.textContent = '';
        panel.classList.add(blockType, 'block');
        classes.forEach((c) => panel.classList.add(c.trim()));
        panel.dataset.panel = `panel_${i}`;
        panel.append(generateOtherComponent);
        panelContainer.append(panel);

        if (panels.length > 1) {
            // generate the button
            const button = document.createElement('button');
            buttonContainer.append(button);
            button.title = `Slide ${i + 1}`;
            button.dataset.panel = `panel_${i}`;
            if (!i) button.classList.add('selected');

            observer.observe(panel);

            // add event listener to button
            button.addEventListener('click', () => {
                panelContainer.scrollTo({ top: 0, left: panel.offsetLeft - panel.parentNode.offsetLeft, behavior: 'smooth' });
            });
        }
    });
    block.textContent = '';
    block.append(panelContainer);
}