import React, { useState } from 'react';
import Loader from './Loader';
import config from '../config/config';
import state from '../store';

const SubmitButton = (prompt) => {

  const [loading, setLoading] = useState(false); //to show user 'sending' or not after they submit

  const handleSubmit = async () => {
    //need something here to ensure all fields of form are filled out before api call
    console.log("logging prompt before api call----------------")
    console.log(prompt)
    try {

      const response = await fetch(config.development.backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })
      
      const data = await response.json();

      state.mealPlan = data.plan //text response to be shown to user

    } catch (error) {
      alert(error)
    }
  }

  return (
    <div>
      {/* Submit form button */}
      <button
        type='submit'
        className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
        onClick={() => handleSubmit(prompt)}
      >
        {loading ? 'Sending...' : 'Submit '}
      </button>
    </div>
  );
};

export default SubmitButton;