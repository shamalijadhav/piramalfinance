import { generateTabName } from "../tab-name/tab-name";

export default function decorate(block) {
    return generateTabName(block)
}