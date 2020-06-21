import express from "express";
import { Request, Response } from "express"
import ArtistDB , {Artist_DB} from '../../db/models_DB/artist_DB';
import {DataLoader , ArtistsAndAlbums} from '../../externalAPIs/apiLoader';
import { Artist } from "Models/artist";
import { Album } from "Models/album";

const artists = express.Router();

artists.get('/artists',async(req:Request, response:Response) => {
  try{
    // let artist:Artist_DB = new ArtistDB({name:'some artist',url:'some urlurl'});
    // await artist.save()
  } catch(err){

  }
    response.send('artist111');
  })

artists.get('/artists-albums', async(req:Request, response:Response) => {

  try{
    let xApi:DataLoader = new DataLoader
    let artists_Albums = new ArtistsAndAlbums
    await artists_Albums.setAllArtist(xApi)
    let artists:Artist[] = artists_Albums.getArtists()

    response.send(artists);

  }catch(err){

  }

  })
  export default artists