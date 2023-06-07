import { proxy } from "valtio";

//state object is used to store the following information and subsequently trigger re-renders on a change to any of its keys
const state = proxy({
    intro: true, //track whether we should show homepage or mealplan
    mealPlan: "Your mealplan will appear here", 
    formCheck: false,
});

export default state;