import { getProps, renderHelper } from "../../scripts/scripts.js";

export default function decorate(block) {
    const [url] = getProps(block);

    const resp = [
        {
            url: "https://publish-p133703-e1305981.adobeaemcloud.com/in/en/home-loan/ahmedabad.html",
            text: "Ahmedabad"
        },
        {
            url: "https://publish-p133703-e1305981.adobeaemcloud.com/in/en/home-loan/chennai.html",
            text: "Chennai"
        },
        {
            url: "https://publish-p133703-e1305981.adobeaemcloud.com/in/en/home-loan/delhi.html",
            text: "Delhi"
        },
        {
            url: "https://publish-p133703-e1305981.adobeaemcloud.com/in/en/home-loan/bangalore.html",
            text: "Bangalore"
        }
    ]


    let li = renderHelper(resp, `<div class="forName">
        <li><a href="{url}" title="{text}">{text}</a></li>    
    </div>`)
    block.innerHTML = '<ul>' + li + '</ul>'
}