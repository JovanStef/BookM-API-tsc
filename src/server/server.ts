// /home/jovan/Documents/CodeAcademy/mongodb/bin/mongod --dbpath=/home/jovan/Documents/CodeAcademy/mongodb-bookM

import * as dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import endpoint from '../../env';
import appRouter from './routes/mainRouter';
import {dbConnection} from '../db/mongoDB';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
 
app.get('/', (request, response) => {
  response.send('Home');
});

app.use(appRouter);

app.use((req, res)=> {
  res.status(404).send("Route not found" )
})
 
app.listen(endpoint.port, ()=>{
  dbConnection();
    console.log(`App is listening on port ${endpoint.port}!`)
});