import React, { useState } from 'react';
import Loader from './Loader';
import config from '../config/config';
import state from '../store';

const SubmitButton = () => {

  const [loading, setLoading] = useState(false); //to show user 'sending' or not after they submit

  const handleSubmit = async (type) => {
    //need something here to ensure all fields of form are filled out before api call

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
        handleSubmit={handleSubmit}
      >
        {loading ? 'Sending...' : 'Submit '}
      </button>
    </div>
  );
};

export default SubmitButton;