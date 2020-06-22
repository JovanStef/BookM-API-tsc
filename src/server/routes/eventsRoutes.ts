import express from "express";
import { EventsController } from "../../db/actions/eventsActions";

const evCtrl = new EventsController;
const events = express.Router();

const route = 'events';


events.get(`/${route}`,evCtrl.getAllEventsDB);
events.get(`/${route}/search`,evCtrl.searchEventDB)
events.post(`/${route}`,evCtrl.addNewEventDB);
events.delete(`/${route}`,evCtrl.removeEventDB);



export default events