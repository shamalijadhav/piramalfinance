import { generateTabName } from "../tab-name/tab-name.js";

export default function decorate(block) {
    return generateTabName(block)
}