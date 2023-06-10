import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useSnapshot } from "valtio";

import config from "../config/config";
import { fadeIn, textVariant, slideIn } from "../config/motion";
import { styles } from "../styles";
import state from "../store";
import SubmitButton from "./SubmitButton";

const MealPlan = () => {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {!snap.intro && (
        <div className="flex justify-end py-20 px-20">
        <div className="w-1/4 max-w-xl mt-20 mx-20">
        <motion.div
          key={state.mealPlan}
          variants={slideIn("left", "tween", 0.2, 1)}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.3 }}
          className="flex-[0.9] bg-black-100 p-8 rounded-2xl max-w-4xl mx-auto mt-4"
        >
          <p className={styles.sectionSubText}>Are you ready?</p>
          <h3 className={styles.sectionHeadText}>HERE WE GO</h3>
          <motion.p
            variants={textVariant()}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            {snap.mealPlan}
          </motion.p>
        </motion.div>
        </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MealPlan;