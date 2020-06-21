import express from 'express';
import apiEx from '../../externalAPIs/apiRoutes';
import artists from './artistRoutes';
import events from './eventsRoutes';

const app = express();

let appRouter = express.Router();

appRouter.use(events)
appRouter.use(artists)
appRouter.use(apiEx)



export default appRouter
