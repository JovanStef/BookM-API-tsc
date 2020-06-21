import axios from 'axios';
import { Artist } from '../Models/artist';
import { Album } from '../Models/album';
import artists from 'server/routes/artistRoutes';

export class DataLoader {
  private artists: any;
  private albums: any;
  constructor() {

  }
  public async loadartists(limit: number) {
    return new Promise((resolve, reject) => {
      axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=mettalica&limit=${limit}&api_key=7a28abe059d0d55f7545bc2939cbf74d&format=json`,
      ).then((response) => {
        this.artists = response
        resolve(response);
      }).catch((e) => {
        reject(e);
        throw new Error(e);
      })
    })
  };

  public async loadAlbums(artist: string) {
    return new Promise((resolve, reject) => {
      axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist.toLowerCase()}&api_key=7a28abe059d0d55f7545bc2939cbf74d&format=json`,
      ).then((response) => {
        this.albums = response
        resolve();
      }).catch((e) => {
        reject(e);
        throw new Error(e);
      })
    })
  };

  public getArtists() {
    return this.artists
  };

  public getAlbums() {
    return this.albums
  };

}

export class ArtistsAndAlbums {
  private allArtists: Artist[] = []
  private allAlbumsForArtist: Album[] = []
  private allArtistsWithAlbums: Artist[] = [];

  constructor() {

  }

  public async setallArtistsAndAlbums(api: DataLoader) {
    try{
      await api.loadartists(30)
      let artistsData: any = await api.getArtists();

  let temp = artistsData.data.similarartists.artist;
  temp.forEach(async (elem: any) => {
    let albums: Album[] = await this.setAlbumsforArtist(api, elem.name);

    let artist: Artist = new Artist(elem.name, elem.url);
    this.allArtists.push(artist);
    artist.setAlbums(albums);
    this.allArtistsWithAlbums.push(artist);
  });
}catch(err){

}

  };

  public async setAllArtist(api: DataLoader){
    try{
      await api.loadartists(30)
        let artistsData: any = await api.getArtists();
        let temp = artistsData.data.similarartists.artist;
        temp.forEach(async(elem:any)=>{
          let artist: Artist = new Artist(elem.name, elem.url);
          this.allArtists.push(artist);
        })
    }catch(err){

    }

  }

  public async setAlbumsforArtist(api: DataLoader, artist: string) {
    let albumsForArtist: Album[] = [];
    try{

      await api.loadAlbums(artist)
      let albumsData: any = await api.getAlbums();
      let temp = albumsData.data.topalbums.album === undefined ? {name:'',image:[{['#text']:''},{['#text']:''},{['#text']:''}],artist:''}:albumsData.data.topalbums.album;
  
      temp.forEach((elem: any) => {
        let album: Album = new Album(elem.name, elem.image[3]['#text'], elem.artist.name);
        albumsForArtist.push(album)
      });
  
      this.allAlbumsForArtist = albumsForArtist
    }catch(err){

    }
    return albumsForArtist;
  }

  public getArtists(): Artist[] {
    return this.allArtists
  }
  public getallAlbumsForArtist(): Album[] {
    return this.allAlbumsForArtist;
  }
  public getallArtistsWithAlbums(): Artist[] {
    return this.allArtistsWithAlbums;
  }



}



