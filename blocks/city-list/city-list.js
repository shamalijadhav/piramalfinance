import { fetchAPI, getProps, renderHelper } from "../../scripts/scripts.js";

export default async function decorate(block) {
    const [url] = getProps(block);
    const resp = await fetchAPI("GET", url);
    const data = await resp.json();

    let li = renderHelper(data.data, `<div class="forName">
        <li><a href="{url}" title="{text}">{text}</a></li>    
    </div>`)
    block.innerHTML = '<ul>' + li + '</ul>'
}