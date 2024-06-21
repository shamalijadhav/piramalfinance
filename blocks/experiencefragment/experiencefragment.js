
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(blocks){
    try {
        var cfURL = blocks.querySelector('a').textContent.trim();
        var fragemntData = await fetch(`${path}.plain.html`);
        console.log( response => response.json);
    } catch (error) {
        console.error(error);
    }
}