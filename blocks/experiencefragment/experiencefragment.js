
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(blocks){
    try {
        const cfURL = blocks.querySelector('a').textContent.trim();
        const fragemntData = await fetch(`${cfURL}.plain.html`);
        const responseawait = await fragemntData.json();
        console.log(responseawait);
    } catch (error) {
        console.error(error);
    }
}