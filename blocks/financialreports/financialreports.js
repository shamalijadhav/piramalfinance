import { fetchAPI, renderHelper } from "../../scripts/scripts";

export default function decorate(block) {
    console.log("financialreports :: ", block);
    const props = getProps(block);
    console.log(props);
    fetchAPI("GET",)
    renderHelper()
}