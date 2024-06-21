
import { loadFragment } from '../fragment/fragment.js';

export default function decorate(blocks){
    debugger;
    var cfURL = blocks.querySelector('a').textContent.trim();
    var fragemntData =  loadFragment(cfURL);
}