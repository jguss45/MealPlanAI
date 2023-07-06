import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config(); // load env variables into process.env object

// handle error in case api key isn't set
if(!process.env.OPENAI_API_KEY) {
    console.error("OPENAI API Key not found");
    process.exit(1)
}

const router = express.Router();

// create Configuration object to be used in OpenAIAPI object
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}); 

//create OpenAIAPI Object
const openai = new OpenAIApi(config);

// define api response to GET requests to root path
//  respond with simple message
router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from gpt-3.5-turbo routes" })
});

// define api response to POST requests to root path
//  respond with generated image from DALL-E 
router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{
                "role": "user",
                "content": prompt.prompt
            }],
            n: 1,
        });

        const text = response.data.choices[0].message.content;

        res.status(200).json({ plan: text });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" })
    }
})

export default router;