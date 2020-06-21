import { Album } from './album';

export class Artist {
    private name: string
    private url: string
    private albums: Album[]

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
        this.albums = []
    }

    public getName(): string {
        return this.name
    }
    public getUrl(): string {
        return this.url
    }
    public getAlbums(): Album[] {
        return this.albums
    }

    public setAlbums(albums:any): boolean {
        if (albums.length) {
            albums.forEach((elem:any) => {
                let temp = new Album(elem['name'], elem['image'], elem['artist'])
                this.albums.push(temp)
            })
            return true;
        }
        return false;
    }

    public addAlbum(album: Album): boolean {
        if (album !== undefined) {
            this.albums.push(album)
            return true;
        }
        return false;
    }

}