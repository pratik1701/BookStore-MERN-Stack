import express from "express";
import mongoose from 'mongoose';
import { PORT, mongogDBConnectionStr } from './config.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();
// middleware parsing requestBody
app.use(express.json());

// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

// Option 2: Allow Cusom Origins
/* app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST','PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
})); */

app.get('/',(_,res) => {
 return res.status(234).send('Welcome to MERN stack ');
});

app.use('/books', booksRoute);

mongoose
.connect(mongogDBConnectionStr)
.then(() => {
    console.log('App connected to database');
    app.listen(PORT,() => {
        console.log(`App is listening on port: ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});