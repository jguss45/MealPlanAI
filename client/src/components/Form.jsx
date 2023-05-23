import React, { useState, useRef } from 'react';
import { useSnapshot } from 'valtio';

import config from '../config/config';
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

  const toggleEntryMode = () => {
    setIsEnteringCalories(prevState => !prevState);
  };

  const handleChange = (e) => {
    //for updating the form anytime there is a change in the form field
    const { name, value } = e.target;
  
    setForm({
      ...form,
      [name]: value,
    })
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
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
    >
      <div>
        {/* Toggle whether entering calories or macros */}
        <button onClick={toggleEntryMode}>
          {isEnteringCalories ? "Enter Macros" : "Enter Calories" }
        </button>
      </div>
      <div>
        {/* Inputs for calories, macros, etc. */}
        {isEnteringCalories ? (
        <label>
          <span>Calories</span>
          <input
            type='text'
            name='calories'
            value={form.calories}
            onChange={handleChange}
            placeholder='Calories per day e.g. 1950'
          />
        </label>
        ) : (
          <>
            <label>
              <span>Protein</span>
              <input
                type='text'
                name='protein'
                value={form.protein}
                onChange={handleChange}
                placeholder='Protein per day in grams e.g. 120'
              />
            </label>

            <label>
              <span>Fat</span>
              <input
                type='text'
                name='fat'
                value={form.fat}
                onChange={handleChange}
                placeholder='Fat per day in grams e.g. 60'
              />
            </label>

            <label>
              <span>Carbs</span>
              <input
                type='text'
                name='carbs'
                value={form.carbs}
                onChange={handleChange}
                placeholder='Carbs per day in grams e.g. 300'
              />
            </label>
          </>
        )}
      </div>

      <div>
        {/* Inputs for excluded items */}
        <label>
          <span>Items to exclude</span>
            <input
              type='text'
              name='exceptions'
              value={form.exceptions}
              onChange={handleChange}
              placeholder='Exceptions e.g. nuts, dairy, etc.'
            />
        </label>
      </div>

      <div>
        {/* Input for the number of days */}
        <label>
          <span>Days</span>
            <input
              type='text'
              name='carbs'
              value={form.days}
              onChange={handleChange}
              placeholder='Number of days in plan e.g 3,5,7'
          />
        </label>
      </div>

      <div>
        {/* Submit form button */}
        <button
            type='submit'
            className=''
        >
            {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </form>
  )
}

export default Form