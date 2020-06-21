import { Request, Response } from "express";
import EventDB, { Event_DB } from "../../db/models_DB/event_DB";
import {Artist} from "../../Models/artist";
import { EventM } from "../../Models/event";


export class EventsController{
    constructor(){

    }

    public async getAllEventsDB(req:Request,res:Response){
                let events:EventM[]=[]
                let limit:string | any = req.query.limit;
                let skip:string | any = req.query.skip;
            try{
                const tempEvents:Event_DB[] | any[] = await EventDB.find({})
                .skip(parseInt(skip))
                .limit(parseInt(limit))
                .sort({date:1});

                tempEvents.forEach((elem:Event_DB | any)=>{
                    let dummy = new EventM(elem._id,elem.name,elem.date,elem.prices,new Artist(elem.artist.name,elem.artist.url),elem.location,elem.image,elem.description);
                    events.push(dummy)
                });

                res.status(200).send(events)
            }catch(err){
                res.status(500).send(err)
            }
    }

    public async addNewEventDB(req:Request,res:Response){
        let newEvent:Event_DB = req.body;
        let existingEvent:Event_DB | any = await EventDB.findOne({name:newEvent.name.toLowerCase()})
        try{
            if(existingEvent == null){
                await EventDB.create(newEvent)
                res.status(200).send({"message":"Event added"})
            }else{
                res.status(400).send({"message":"Event exists"});
            }
        }catch(err){
            res.status(500).send(err)

        }
    }

    public async removeEventDB(req:Request,res:Response){
        try{
           await EventDB.findOneAndRemove({name:req.body.name});
           res.status(200).send({"message":"Event removed"})
        }catch(err){
            res.status(500).send(err.message)
        }
    }
}

