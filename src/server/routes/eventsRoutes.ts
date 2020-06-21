import express from "express";
import { EventsController } from "../../db/actions/eventsActions";

const evCtrl = new EventsController
const events = express.Router();


events.get('/events',evCtrl.getAllEventsDB);
events.post('/events')



export default events