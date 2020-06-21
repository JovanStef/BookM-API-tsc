export class Album {
    private name: string
    private image: string
    private artist: string

    constructor(name: string, image: string, artist: string) {
        this.name = name;
        this.image = image;
        this.artist = artist;
    }

    public getName(): string {
        return this.name
    }
    public getImage(): string {
        return this.image
    }
    public getArtist(): string {
        return this.artist
    }



}