
export default async function decorate(blocks){
    try {
        const xfURL = blocks.querySelector('a').textContent.trim();
        const xfFragemntData = await fetch(`${xfURL}.plain.html`);
        const xfResponseawait = await xfFragemntData.text();    
        const xfDiv = document.createElement('div');
        xfDiv.innerHTML = xfResponseawait;
        blocks.innerHTML = ''
        blocks.append(xfDiv);
    } catch (error) {
        console.error(error);
    }
}