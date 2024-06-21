export default async function decorate(blocks){
    try {
        let cfURL = blocks.querySelector('a').textContent.trim();
        cfURL = cfURL.replace('/content/dam/', '/api/assets/');
        const cfFragemntData = await fetch(`${cfURL}.json`);
        const cfResponseawait = await cfFragemntData.json();    
        const cfDiv = document.createElement('div');
        cfDiv.innerHTML = cfResponseawait;
        blocks.innerHTML = ''
        blocks.append(cfDiv);
    } catch (error) {
        console.error(error);
    }
}