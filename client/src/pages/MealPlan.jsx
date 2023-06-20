import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useSnapshot } from "valtio";

import { textVariant, slideIn } from "../config/motion";
import { styles } from "../styles";
import state from "../store";
import formatMealPlanString from "../helpers/formatMealPlan";

const MealPlan = () => {
  const snap = useSnapshot(state);
  const formattedMealPlan = formatMealPlanString(snap.mealPlan);

  return (
    <AnimatePresence>
      {!snap.intro && (
        <div className="flex justify-center py-20 px-20">
          <div className="w-full max-w-2xl mt-20 mx-20">
            <motion.div
              key={state.mealPlan}
              variants={slideIn("left", "tween", 0.2, 1)}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.3 }}
              className="flex-[0.9] bg-black-100 p-8 rounded-2xl max-w-4xl mx-auto mt-4"
              style={{ whiteSpace: "pre-wrap" }}
            >
              <p className={styles.sectionSubText}>Are you ready?</p>
              <h3 className={styles.sectionHeadText}>HERE WE GO</h3>

              {formattedMealPlan.map((dayString, index) => (
                <>
                  <motion.p
                    variants={textVariant()}
                    className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
                    key={index}
                  >
                    {dayString}
                  </motion.p>
                  {/* Will add lines to separate each day of meal plan */}
                  {index !== formattedMealPlan.length - 1 && (
                    <motion.div
                      variants={slideIn("left", "tween", 0.2, 1)}
                      initial="hidden"
                      animate="show"
                      transition={{ duration: 0.3 }}
                      className="border-b border-gray-300"
                      key={`separator-${index}`}
                    />
                  )}
                </>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MealPlan;
