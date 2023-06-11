import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useSnapshot } from "valtio";

import { slideIn } from "../config/motion";
import { styles } from "../styles";
import SubmitButton from "../components/SubmitButton";
import state from "../store";

const Form = () => {
  const snap = useSnapshot(state);

  const formRef = useRef(); //create ref object to reference the form
  //state variable to track whether user wants to enter calories or macros
  const [isEnteringCalories, setIsEnteringCalories] = useState(true);

  const [form, setForm] = useState({
    calories: "2500",
    fat: "",
    protein: "",
    carbs: "",
    exceptions: "treenuts, shellfish",
    meals_per_day: "5",
  });

  const [prompt, setPrompt] = useState("");

  //anytime the form or the form field inputs change, prompt will be updated.
  useEffect(() => {
    const newPrompt = isEnteringCalories
      ? `You are my AI meal planner. Create a concise meal plan meeting the exact constraints that I give you.
    I want a meal plan for 7 days consisting of ${form.meals_per_day} meals per day.
    Meal plan must not include ${form.exceptions}.
    Meal plan must match the caloric requirement of ${form.calories} calories per day.
    For each meal, specify the amount of each ingredient in grams and show total calories per meal.
    For each day of the meal plan, start on a new line and specify each meal such as Day 1 Meal 1.`
      : `You are my AI meal planner. Create a concise meal plan meeting the exact constraints that I give you. 
    I want a meal plan for 7 days consisting of ${form.meals_per_day} meals per day.
    Meal plan must not include ${form.exceptions}.
    Meal plan must match the following macro requirements. 
    Fat: ${form.fat} Protein: ${form.protein} Carbs: ${form.carbs}`;
    setPrompt(newPrompt);
  }, [form, isEnteringCalories]);

  const handleChange = (e) => {
    //for updating the form anytime there is a change in the form field
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //retrieve form values
    //const cals = event.target.calories.value
    //retrieve other form values

    //make api call and process response
    console.log("submitted");
  };

  //if all fields for each entry mode aren't filled out, inform user
  useEffect(() => {
    // Check if all corresponding fields are filled out for each entry mode
    let isComplete = false;

    if (isEnteringCalories) {
      isComplete =
        form.calories !== "" &&
        form.exceptions !== "" &&
        form.meals_per_day !== "" 
    } else {
      isComplete =
        form.protein !== "" &&
        form.fat !== "" &&
        form.carbs !== "" &&
        form.exceptions !== "" &&
        form.meals_per_day !== ""
    }

    state.formCheck = isComplete;

  }, [form, isEnteringCalories]);

  return (
    <AnimatePresence>
      {snap.intro && (
        <div className="flex justify-end py-20 px-20">
          <div className="w-1/4 max-w-xl mt-20 mx-20">
            <motion.div
              key={isEnteringCalories}
              variants={slideIn("left", "tween", 0.2, 1)}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.3 }}
              className="flex-[0.75] bg-black-100 p-8 rounded-2xl max-w-xl ml-auto "
            >
              <p className={styles.sectionSubText}>Meal Plan Constraints</p>
              <h3 className={styles.sectionHeadText}>Your plan.</h3>
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="mt-2 flex flex-col gap-4 max-w-sm mx-auto"
              >
                <div className="bg-tertiary py-3 px-8 w-fit text-white font-bold rounded-xl flex gap-10">
                  {/* Toggle whether entering calories or macros */}
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      name="entryMode"
                      value="macros"
                      checked={!isEnteringCalories}
                      onChange={() => setIsEnteringCalories(false)}
                    />
                    Macros
                  </label>

                  <label className="flex gap-2">
                    <input
                      type="radio"
                      name="entryMode"
                      value="calories"
                      checked={isEnteringCalories}
                      onChange={() => setIsEnteringCalories(true)}
                    />
                    Calories
                  </label>
                </div>
                <div>
                  {/* Inputs for calories, macros, etc. */}
                  {isEnteringCalories ? (
                    <label className="flex flex-col">
                      <span>Calories</span>
                      <input
                        type="number"
                        name="calories"
                        value={form.calories}
                        onChange={handleChange}
                        placeholder="Calories per day e.g. 1950"
                        className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                      />
                    </label>
                  ) : (
                    <>
                      <label className="flex flex-col">
                        <span>Protein</span>
                        <input
                          type="number"
                          name="protein"
                          value={form.protein}
                          onChange={handleChange}
                          placeholder="Protein per day in grams e.g. 120"
                          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                        />
                      </label>

                      <label className="flex flex-col">
                        <span>Fat</span>
                        <input
                          type="number"
                          name="fat"
                          value={form.fat}
                          onChange={handleChange}
                          placeholder="Fat per day in grams e.g. 60"
                          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                        />
                      </label>

                      <label className="flex flex-col">
                        <span>Carbs</span>
                        <input
                          type="number"
                          name="carbs"
                          value={form.carbs}
                          onChange={handleChange}
                          placeholder="Carbs per day in grams e.g. 300"
                          className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                        />
                      </label>
                    </>
                  )}
                </div>

                <div>
                  {/* Inputs for excluded items */}
                  <label className="flex flex-col">
                    <span>Excluded items</span>
                    <input
                      type="text"
                      name="exceptions"
                      value={form.exceptions}
                      onChange={handleChange}
                      placeholder="Separate items by commas, e.g. nuts, dairy, etc."
                      className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                    />
                  </label>
                </div>

                <div>
                  {/* Input for the number of meals per day */}
                  <label className="flex flex-col">
                    <span>Meals per day</span>
                    <input
                      type="number"
                      name="meals_per_day"
                      value={form.meals_per_day}
                      onChange={handleChange}
                      placeholder="Number of meals per day e.g 2,3,5, etc."
                      className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
                    />
                  </label>
                </div>

                <div>
                  <SubmitButton prompt={prompt} />
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Form;
