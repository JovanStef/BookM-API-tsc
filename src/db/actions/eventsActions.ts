import { Request, Response } from "express";
import EventDB, { Event_DB } from "../../db/models_DB/event_DB";
import {Artist} from "../../Models/artist";
import { EventM } from "../../Models/event";


export class EventsController{
    constructor(){

    }

    public async getAllEventsDB(req:Request,res:Response){
                let events:EventM[]=[]
            try{
                const tempEvents:Event_DB[] | any[] = await EventDB.find({})

                tempEvents.forEach((elem:Event_DB | any)=>{
                    let dummy = new EventM(elem._id,elem.name,elem.date,elem.prices,new Artist(elem.artist.name,elem.artist.url),elem.location,elem.image,elem.desc);
                    events.push(dummy)
                })

                res.status(200).send(events)
            }catch(err){
                res.status(500).send(err)
            }
    }
}

