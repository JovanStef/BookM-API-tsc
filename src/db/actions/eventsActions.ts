import { Request, Response } from "express";
import {Helper} from '../../common/helpers';
import EventDB, { Event_DB } from "../../db/models_DB/event_DB";
import {Artist} from "../../Models/artist";
import { EventM } from "../../Models/event";


export class EventsController{
    constructor(){
        
    }

    public async getAllEventsDB(req:Request,res:Response){
                let events:EventM[]=[]
                req.query.limit == undefined ? req.query.limit='6' : req.query.limit;
                req.query.skip == undefined ? req.query.skip='0' : req.query.skip;

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
    };

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
    };

    public async removeEventDB(req:Request,res:Response){
        try{
           await EventDB.findOneAndRemove({name:req.body.name});
           res.status(200).send({"message":"Event removed"})
        }catch(err){
            res.status(500).send(err.message)
        }
    };



    public async searchEventDB(req:Request,res:Response){
        const helper:Helper = new Helper
        let searchQ:object|any = helper.resolveReqBody(req.body)
        try{
            res.status(200).send(searchQ)
        }catch(err){
            res.status(500).send(err.message)
        }
    }
}

