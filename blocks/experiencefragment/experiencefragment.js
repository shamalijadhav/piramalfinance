
export default async function decorate(blocks){
    try {
        const blockProps = Array.from(blocks.children, (row) => row.firstElementChild);
        const [xfPath , xfAuhtorURL] = blockProps;
        const xfURLLink = xfPath.querySelector('a').textContent.trim();
        const xfAuhorLink = xfAuhtorURL.querySelector('a').textContent.trim();
        const xfFragemntData = await fetch(`${xfAuhorLink}${xfURLLink}.plain.html`);
        const xfResponseawait = await xfFragemntData.text();    
        const xfDiv = document.createElement('div');
        xfDiv.innerHTML = xfResponseawait;
        blocks.innerHTML = ''
        blocks.append(xfDiv);
    } catch (error) {
        console.error(error);
    }
}