import { fetchAPI, getProps, renderHelper } from "../../scripts/scripts.js";

export default async function decorate(block) {
    console.log("financialreports :: ", block);
    const props = getProps(block);
    console.log(props);
    const [url, type] = props;
    block.innerHTML = "";
    try {
        const resp = await fetchAPI("GET", url);
        const data = await resp.json();
        const years = data.result[0];
        Object.keys(years).forEach(function (year) {
            console.log(year);
            const months = years[year][0];
            let monthsli = '';
            Object.keys(months).forEach(function (month) {
                console.log(months[month]);
                monthsli += `  
                                <div class="subAccordianContent" style="display: nona;">
                                    <div class="publicDisclosuresWrap">
                                        <div class="innersubAccordianContent">
                                            <a href="javascript:;" class="innersubAccordianTitle">${month}</a>
                                            <div class="publicDisclosuresWrap innerSubAccordianData">
                                                <ul> ${renderHelper(months[month], `
                                                    <div class="forName">    
                                                        <li>
                                                            <a href="{PdfPath}" data-category="{Pdf_Category}" target="_blank">
                                                                <span class="created-date">{Created_Date}</span>
                                                                {Title}</a>
                                                        </li>
                                                    </div>
                                                    `)} 
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
            });
            block.innerHTML += `
                        <section class="accordianpdf-section">
                            <div class="container boxContainer">
                                <div class="accordianContent">
                                    <div class="accordianBox">
                                        <div class="subAccordianWrap">
                                            <div class="subAccordianBox active">
                                                <a href="javascript:;" class="subAccordianTitle"
                                                    data-accordianpdf-folderpath="/content/dam/piramalfinance/pdf/stakeholder/financial-reports/2024"
                                                    data-accordianpdf-folderdepth="2">${year}</a>
                                                ${monthsli}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    `
        })
        console.log(data);

        // Set initial display to none for all subAccordianContent elements
        var subAccordianContents = block.querySelectorAll('.subAccordianContent');
        subAccordianContents.forEach(function (content) {
            content.style.display = 'none';
        });


        // Function to handle click on main accordion titles
        function handleMainAccordionClick(event) {
            var parent = event.target.parentNode;
            var siblings = getSiblings(parent);

            parent.classList.toggle('active');
            siblings.forEach(function (sibling) {
                sibling.classList.remove('active');
            });

            var content = parent.querySelectorAll('.subAccordianContent');
            content.forEach(function (el) {
                var computedStyle = window.getComputedStyle(el);
                el.style.display = computedStyle.getPropertyValue('display') === 'none' ? 'block' : 'none';
            })

            siblings.forEach(function (sibling) {
                var siblingContent = sibling.querySelector('.subAccordianContent');
                var siblingComputedStyle = window.getComputedStyle(siblingContent);
                if (siblingComputedStyle.getPropertyValue('display') === 'block') {
                    siblingContent.style.display = 'none';
                }
            });
        }


        // Event listeners for main accordion titles
        var mainAccordionTitles = block.querySelectorAll('.subAccordianTitle');
        mainAccordionTitles.forEach(function (title) {
            title.addEventListener('click', handleMainAccordionClick);
        });



        // Event listeners for inner accordion titles
        var innerAccordionTitles = block.querySelectorAll('.innersubAccordianTitle');
        innerAccordionTitles.forEach(function (title) {
            title.addEventListener('click', handleInnerAccordionClick);
        });
    } catch (error) {
        console.error(error);
    }
    // renderHelper()
}

// import { getSiblings, handleInnerAccordionClick } from "./accordianclick";
// Function to handle click on inner accordion titles
export function handleInnerAccordionClick(event) {
    var parent = event.target.parentNode;
    var siblings = getSiblings(parent);

    parent.classList.toggle('active');
    siblings.forEach(function (sibling) {
        sibling.classList.remove('active');
    });

    var content = parent.querySelector('.innerSubAccordianData');
    var computedStyle = window.getComputedStyle(content);
    content.style.display = computedStyle.getPropertyValue('display') === 'none' ? 'block' : 'none';

    siblings.forEach(function (sibling) {
        var siblingContent = sibling.querySelector('.innerSubAccordianData');
        var siblingComputedStyle = window.getComputedStyle(siblingContent);
        if (siblingComputedStyle.getPropertyValue('display') === 'block') {
            siblingContent.style.display = 'none';
        }
    });
}

// Function to get siblings of an element
export function getSiblings(elem) {
    var siblings = [];
    var sibling = elem.parentNode.firstChild;
    for (; sibling; sibling = sibling.nextSibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
        }
    }
    return siblings;
}