import { Artist } from "./artist";

export interface location {
    country: string
    capital: string
}

export interface priceList {
    parter: number
    fanPit: number
    vip: number
}

export class EventM {
    private id: number
    private name: string;
    private date: Date;
    private location: location;
    private prices: priceList;
    private artist: Artist;
    private image: string;
    private description:string;

    constructor(id: number, name: string, date: Date, prices: priceList, artist: Artist, location: location, image: string,description:string) {
        this.id = id;
        this.name = name;
        this.date = new Date(date);
        this.prices = prices;
        this.artist = artist;
        this.location = location;
        this.image = image;
        this.description = description;
    };

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    };

    public getDate(): Date {
        return this.date;
    };

    public getLocation(): location {
        return this.location;
    };

    public getPrices(): priceList {
        return this.prices;
    };

    public getArtist(): Artist {
        return this.artist;
    };

    public getImage(): string {
        return this.image;
    };

    public getDescription():string{
        return this.description;
    }
}