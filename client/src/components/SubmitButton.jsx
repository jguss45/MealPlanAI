import React, { useState } from 'react';

import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';

const SubmitButton = (prompt) => {
  const snap = useSnapshot(state);

  const [generatingPlan, setGeneratingPlan] = useState(false) //to show user output is being generated

  const handleSubmit = async () => {
    //need something here to ensure all fields of form are filled out before api call
    if (!snap.formCheck) {
      alert("Please fill out all form fields before submitting.")
      return;
    }
    
    setGeneratingPlan(true)

    console.log("logging prompt before api call----------------")
    console.log(prompt)
    try {

      const response = await fetch(config.production.backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })
      
      if (response.ok) {
        console.log("response was ok --------------")
        const data = await response.json();
        state.mealPlan = data.plan //text response to be shown to user
        state.intro = false
      } else {
        console.log('Failed to generate meal plan:', response.status, response.statusText);
        alert('Failed to generate meal plan. Please try again')
      }

    } catch (error) {
      alert(error)
    } 
    
    setGeneratingPlan(false);
  }

  return (
    <div>
      {/* Submit form button */}
      <button
        type='submit'
        className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
        onClick={handleSubmit}
      >
        {generatingPlan ? 'Generating...' : 'Submit '}
      </button>
    </div>
  );
};

export default SubmitButton;