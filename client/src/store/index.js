import { proxy } from "valtio";

//state object is used to store the following information and subsequently trigger re-renders on a change to any of its keys
const state = proxy({
    inputCalories: true,
    calories: 2500,
    protein: 110,
    fats: 70, 
    carbs: 320,
    exceptions: [],
});

export default state;