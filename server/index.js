import express from 'express';
import * as dotenv from 'dotenv';
// need cors (cross-origin resource sharing) to allow resources to be requested from another domain outside of domain from which resource originated
    // in this case origin is mealGenius frontend, outside domain is openAI API
import cors from 'cors'; 

//import gpt.turbo from './routes/gpt.turbo.js';