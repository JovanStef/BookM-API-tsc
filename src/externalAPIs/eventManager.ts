import { location, priceList } from '../Models/event';
import { Artist } from '../Models/artist';
import { EventM } from '../Models/event';
import { Helper } from '../common/helpers';

const helper = new Helper;

export class EventManager {
    private events: EventM[] = [];
    private artists: Artist[] = [];

    constructor() {

    }

    public makeEvents(artists: Artist[]): void {
        if (artists.length === 0) {
            throw new Error('No artists in makeEvents@EventManager')
        }
        let locations: location[] = helper.getLocations(artists.length + 1);
        let dates: Date[] = helper.getDates(artists.length + 1);
        let prices: priceList[] = helper.getPriceList(artists.length + 1);
        
        artists.forEach((elem, i) => {
            let image: any = elem.getAlbums().length === 0 ? 'nn': elem.getAlbums()[0].getImage()
            let tempEvent:EventM = new EventM(i, elem.getName(), dates[i], prices[i], elem, locations[i], image,"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
            this.events.push(tempEvent);
        })

    }

    public setArtists(artists:any[]):void{
        artists.forEach((artist)=>{
            let temp = new Artist(artist.name,artist.url);
            this.artists.push(temp);
        })
    };

    public getEvents(): EventM[] {
        console.log('ecents')
        if (this.events.length === 0) {
            throw new Error('No events in makeEvents@EventManager')
        }
        return this.events;
    };

    public addEvent(newEvent:EventM): boolean {
        this.events.push(newEvent);

        return true;
    };


    public removeEvent(event: EventM): boolean {
        return false
    }

    public getArtists():Artist[]{
        return this.artists
    }

}