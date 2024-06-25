
export default async function decorate(blocks){
    try {
        const blockProps = Array.from(blocks.children, (row) => row.firstElementChild);
        const [xfPath , xfAuhtorURL] = blockProps;
        const xfURLLink = xfPath.querySelector('a').textContent.trim();
        const xfAuhorLink = xfAuhtorURL.querySelector('a').textContent.trim();
        const xfFragemntData = await fetch(`${xfAuhorLink}${xfURLLink}/master.html`);
        const xfResponseawait = await xfFragemntData.text();    
        const currUrl = new URL(location.href);
        xfResponseawait = xfResponseawait.replace(/(http:|)(^|\/\/)(.*?\/)/g, xfAuhorLink)
        const xfDiv = document.createElement('div');
        xfDiv.innerHTML = xfResponseawait;
        blocks.innerHTML = ''
        blocks.append(xfDiv);
    } catch (error) {
        console.error(error);
    }
}