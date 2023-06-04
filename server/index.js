import express from 'express';
import * as dotenv from 'dotenv';
// need cors (cross-origin resource sharing) to allow resources to be requested from another domain outside of domain from which resource originated
    // in this case origin is mealGenius frontend, outside domain is openAI API
import cors from 'cors'; 

import gptRoutes from './routes/gpt.routes.js';

dotenv.config();

const app = express();
app.use(cors()); // enable CORS for all routes
app.use(express.json({ limit: "50mb" })) // parse incoming requests with JSON and set limit of 50 mb on the request body size

app.use("/api/v1/gpt", gptRoutes);

//set up route for root URL of server
app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello from GPT" })
})

//start server and listen on port 8080
app.listen(8080, () => console.log("Listening on port 8080"));