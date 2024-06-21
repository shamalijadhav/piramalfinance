
export default async function decorate(blocks){
    try {
        const cfURL = blocks.querySelector('a').textContent.trim();
        const fragemntData = await fetch(`${cfURL}.plain.html`);
        const responseawait = await fragemntData.text();    
        const cfDiv = document.createElement('div');
        cfDiv.innerHTML = responseawait;
        blocks.innerHTML = ''
        blocks.apppend(cfDiv);
    } catch (error) {
        console.error(error);
    }
}