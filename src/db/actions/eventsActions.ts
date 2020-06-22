import { Request, Response } from "express";
import { Helper } from '../../common/helpers';
import EventDB, { Event_DB } from "../../db/models_DB/event_DB";
import { Artist } from "../../Models/artist";
import { EventM } from "../../Models/event";


export class EventsController {
    constructor() {

    }

    public async getAllEventsDB(req: Request, res: Response) {
        let events: EventM[] = []
        req.query.limit == undefined ? req.query.limit = '6' : req.query.limit;
        req.query.skip == undefined ? req.query.skip = '0' : req.query.skip;

        let limit: string | any = req.query.limit;
        let skip: string | any = req.query.skip;

        try {
            const tempEvents: Event_DB[] | unknown[] = await EventDB.find({})
                .skip(parseInt(skip))
                .limit(parseInt(limit))
                .sort({ date: 1 });

            tempEvents.forEach((elem: Event_DB | any) => {
                let dummy = new EventM(elem._id, elem.name, elem.date, elem.prices, new Artist(elem.artist.name, elem.artist.url), elem.location, elem.image, elem.description);
                events.push(dummy)
            });

            res.status(200).send(events)
        } catch (err) {
            res.status(500).send(err)
        }
    };

    public async addNewEventDB(req: Request, res: Response) {
        let newEvent: Event_DB = req.body;
        let existingEvent: Event_DB | unknown = await EventDB.findOne({ name: newEvent.name.toLowerCase() })
        try {
            if (existingEvent == null) {
                await EventDB.create(newEvent)
                res.status(200).send({ "message": "Event added" })
            } else {
                res.status(400).send({ "message": "Event exists" });
            }
        } catch (err) {
            res.status(500).send(err)
        }
    };

    public async removeEventDB(req: Request, res: Response) {
        try {
            await EventDB.findOneAndRemove({ name: req.body.name });
            res.status(200).send({ "message": "Event removed" })
        } catch (err) {
            res.status(500).send(err.message)
        }
    };



    public async searchEventDB(req: Request, res: Response) {
        const helper: Helper = new Helper
        let searchQ: object | any = helper.resolveReqBody(req.body);
        try {
            let events: Event_DB[] | unknown[]

            switch (searchQ.key) {
                case ('location'):
                    events = await EventDB.find({ "location.country": searchQ.value });
                    events = events.length > 0 ? events : await EventDB.find({ "location.capital": searchQ.value });
                    break;
                case ('price'):
                case ('prices'):
                    let parter: Event_DB[] | unknown[] = await EventDB.find({ "prices.parter": searchQ.value });
                    let fanPit: Event_DB[] | unknown[] = await EventDB.find({ "prices.fanPit": searchQ.value });
                    let vip: Event_DB[] | unknown[] = await EventDB.find({ "prices.vip": searchQ.value });

                    events = parter.length > 0 ? parter :
                    events = fanPit.length > 0 ? fanPit : vip;
                    break;
                case ('date'):
                    let date = new Date(searchQ.value).toString();
                    console.log(date)
                    events = await EventDB.find({date:{$gte:date }})
                    break;
                default:
                    events = await EventDB.find({ [searchQ.key]: searchQ.value });
            }

            events.length > 0 ? res.status(200).send(events) : res.status(400).send({ "message": "No such events" })
        } catch (err) {
            res.status(500).send(err.message)
        }
    }
}

