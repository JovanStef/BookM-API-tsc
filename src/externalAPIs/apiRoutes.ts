import express, { response } from "express";
import { Request, Response } from "express";
import { ApiControler } from './apiControler';
import ArtistDB , {Artist_DB} from '../db/models_DB/artist_DB';
import {DataLoader , ArtistsAndAlbums} from './apiLoader';
import { Artist } from "Models/artist";
import { Album } from "Models/album";

const api = new ApiControler

const apiEx = express.Router();
const route = 'apiExternal'

apiEx.get(`/${route}/getArtists/:name`,api.getArtistByName)

// apiEx.get(`/${route}/setArtists`, api.setArtistsToDB);

// apiEx.get(`/${route}/setAlbums`,api.setAlbumByArtistToDB)

// apiEx.get(`/${route}/setEvents`,api.setEventsToDB)



  export default apiEx