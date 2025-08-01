import express from 'express';
import dotenv from 'dotenv';


import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';


import downloadsRoute from "./routes/downloadsRoute.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
const mongoDBURL=process.env.MONGODB_URL;

// Middleware for parsing request body
app.use(express.json());
// app.use(cors({
//   origin: 'https://frontend.netlify.app'
// }));

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.use('/uploads', express.static('uploads')); // to serve PDFs
app.use("/api/downloads", downloadsRoute);

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
