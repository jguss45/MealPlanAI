import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

import { useSnapshot } from 'valtio';

import config from '../config/config';
import { fadeAnimation, slideAnimation, slideIn } from '../config/motion';
import { styles } from '../styles';
import state from '../store';
import Loader from './Loader';
import SubmitButton from './SubmitButton';


const Form = () => {
  const formRef = useRef(); //create ref object to reference the form
  //state variable to track whether user wants to enter calories or macros
  const [isEnteringCalories, setIsEnteringCalories] = useState(true)

  const [form, setForm] = useState({
    calories: "",
    fat: "",
    protein: "",
    carbs: "",
    exceptions: "",
    days: "",
  })

  const [loading, setLoading] = useState(false); //to show user 'sending' or not after they submit

  const handleChange = (e) => {
    //for updating the form anytime there is a change in the form field
    const { name, value } = e.target;
  
    setForm({
      ...form,
      [name]: value,
    })
    console.log(form)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    //retrieve form values
      //const cals = event.target.calories.value
    //retrieve other form values
  
    //make api call and process response
    console.log("submitted")
  
  }


  return (
    <motion.div
      key={isEnteringCalories}
      variants={slideIn('left', 'tween', 0.2, 1)}
      initial='hidden'
      animate='show'
      transition={{ duration: 0.3 }}
      className='flex-[0.75] bg-black-100 p-8 rounded-2xl max-w-xl mx-auto'
    >
      <p className={styles.sectionSubText}>Meal Plan Constraints</p>
      <h3 className={styles.sectionHeadText}>Your plan.</h3>
      <form 
        ref={formRef}
        onSubmit={handleSubmit}
        className='mt-2 flex flex-col gap-8 max-w-md mx-auto'
      >
        <div className='bg-tertiary py-3 px-8 w-fit text-white font-bold rounded-xl flex gap-10'>
          {/* Toggle whether entering calories or macros */}
          <label className='flex gap-2'>
            <input
              type="radio"
              name="entryMode"
              value="macros"
              checked={!isEnteringCalories}
              onChange={() => setIsEnteringCalories(false)}
            />
            Macros
          </label>

          <label className='flex gap-2'>
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
          <label className='flex flex-col'>
            <span>Calories</span>
            <input
              type='number'
              name='calories'
              value={form.calories}
              onChange={handleChange}
              placeholder='Calories per day e.g. 1950'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>
          ) : (
            <>
              <label className='flex flex-col'>
                <span>Protein</span>
                <input
                  type='number'
                  name='protein'
                  value={form.protein}
                  onChange={handleChange}
                  placeholder='Protein per day in grams e.g. 120'
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
                />
              </label>

              <label className='flex flex-col'>
                <span>Fat</span>
                <input
                  type='number'
                  name='fat'
                  value={form.fat}
                  onChange={handleChange}
                  placeholder='Fat per day in grams e.g. 60'
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'

                />
              </label>

              <label className='flex flex-col'>
                <span>Carbs</span>
                <input
                  type='number'
                  name='carbs'
                  value={form.carbs}
                  onChange={handleChange}
                  placeholder='Carbs per day in grams e.g. 300'
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'

                />
              </label>
            </>
          )}
        </div>

        <div>
          {/* Inputs for excluded items */}
          <label className='flex flex-col'>
            <span>Excluded items</span>
              <input
                type='text'
                name='exceptions'
                value={form.exceptions}
                onChange={handleChange}
                placeholder='Separate items by commas, e.g. nuts, dairy, etc.'
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'

              />
          </label>
        </div>

        <div>
          {/* Input for the number of days */}
          <label className='flex flex-col'>
            <span>Days</span>
              <input
                type='number'
                name='days'
                value={form.days}
                onChange={handleChange}
                placeholder='Number of days in plan e.g 3,5,7'
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
            />
          </label>
        </div>

        <div>
          {/* Submit form button */}
          <button
              type='submit'
              className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
              >
              {loading ? 'Sending...' : 'Submit '}
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default Form