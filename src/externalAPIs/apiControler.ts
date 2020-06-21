import { Request, Response } from "express";
import { DataLoader, ArtistsAndAlbums } from "./apiLoader";
import { Artist } from "../Models/artist";
import { Album } from "../Models/album";
import { EventM } from "../Models/event";
import { EventManager } from "./eventManager";
import ArtistDB, { Artist_DB } from "../db/models_DB/artist_DB";
import AlbumDB, { Album_DB } from "../db/models_DB/album_DB";
import EventDB,{Event_DB} from "../db/models_DB/event_DB";

export class ApiControler {

    constructor() {

    }

    public async setArtistsToDB(req: Request, response: Response) {
        let artists: Artist[] = []
        try {
            const xApi: DataLoader = new DataLoader
            let artists_Albums:ArtistsAndAlbums = new ArtistsAndAlbums
            await artists_Albums.setAllArtist(xApi)
            artists = artists_Albums.getArtists();

            artists.forEach(async (elem) => {
                let temp:Artist_DB = new ArtistDB(elem);
                temp.save();
            })
            response.status(200).send('Added all artists from API to DB')
        } catch (err) {
            response.status(500).send(err)
        }
    }

    public async getArtistByName(req: Request, response: Response) {
        try {
            let temp:Artist_DB | any = await ArtistDB.findOne({ name: req.params.name.toLowerCase() });
            let artist:Artist = new Artist(temp.name, temp.url)

            response.status(200).send(artist)
        } catch (err) {
            response.status(500).send(err)
        }
    }

    public async setAlbumByArtistToDB(req: Request, response: Response) {
        try {
            let temp:Artist_DB | any = await ArtistDB.find({});

            const xApi: DataLoader = new DataLoader
            let artists_Albums = new ArtistsAndAlbums

            temp.forEach(async (artist:Artist_DB) => {
                let albums: Album[] | any[]= await artists_Albums.setAlbumsforArtist(xApi, artist.name);
                albums.forEach(async (album:Album) => {
                    let tempAlbum = new AlbumDB({ name: album.getName(), image: album.getImage(), artist: artist._id });
                    await tempAlbum.save()
                })

            })
            response.status(200).send('albums')
        } catch (err) {
            response.status(500).send(err)

        }
    }

    public async setEventsToDB(req: Request, response: Response) {
        const eventManager = new EventManager;
        let artists: Artist[] = [];
        let events: EventM[] = [];

        let tempArtists: Artist_DB []|any[] = await ArtistDB.find({});
        let tempAlbum: Album_DB[]|any[] = await AlbumDB.aggregate([{ $group: { _id: "$artist", album: { $first: "$$ROOT" } } }])

        try {
            tempArtists.forEach((elem:Artist_DB) => {
                let tArt = new Artist(elem.name, elem.url);
                tempAlbum.forEach((alb:Album_DB|any) => {
                    if (alb.album.artist.toString() === elem._id.toString()) {
                        let tAlb:Album = new Album(alb.album.name, alb.album.image, elem.name);
                        tArt.addAlbum(tAlb);
                    }
                })
                artists.push(tArt)
            });

            eventManager.makeEvents(artists);
            events = eventManager.getEvents();

            let eventsForDB:Event_DB[] = []
            events.forEach((event:EventM)=>{
                let dummy:Event_DB|any={
                name:event.getName(),date:event.getDate(),location:event.getLocation(),prices:event.getPrices(),artist:event.getArtist(),image:event.getImage(),desc:event.getDescription()
                }
                let tempEvents:Event_DB = new EventDB(dummy)
                eventsForDB.push(tempEvents)
            })
            EventDB.insertMany(eventsForDB)
            response.status(200).send(eventsForDB)
        } catch (err) {
            response.status(500).send(err)
        }

    }
}