import { location, priceList } from '../Models/event';
// import worldCountriesCapitals from 'world-countries-capitals';
// import dateGenerator from 'random-date-generator';

const wcc = require('world-countries-capitals');
const DateGenerator = require('random-date-generator');

export class Helper {
    private locations: location[] = [];
    private prices: priceList[] = [];
    private dates: Date[] = [];
    constructor() {

    }

    public getDates(numOfDates: number): Date[] {
        let startDate = new Date(2018, 2, 2);
        let endDate = new Date(2022, 3, 3);
        for (let i = 0; i < numOfDates; i++) {
            let dDate: Date = DateGenerator.getRandomDateInRange(startDate, endDate);
            this.dates.push(dDate);
        }
        return this.dates;
    }

    public getLocations(numOfLocations: number): location[] {
        let temp: any[] = wcc.getNRandomCountriesData(numOfLocations);
        temp.forEach((elem) => {
            let loc: location = { ...elem }
            // country:elem.country , capital:elem.capital
            this.locations.push(loc)
        })
        return this.locations
    }

    public getPriceList(numOfPricelists: number): priceList[] {
        for (let i = 0; i < numOfPricelists; i++) {
            let price: number = Math.floor(Math.random() * 20);
            let priceList: priceList = {
                parter: price,
                fanPit: price + 10,
                vip: price + 20
            }
            this.prices.push(priceList);
        }
        return this.prices
    }

    public resolveReqBody(obj:object | any):object{
        let searchQ:string | number;
        console.log(Object.values(obj))
        switch(Object.keys(obj)[0]){
            case('name'):
            searchQ = obj.name;
            break;
            case('location'):
            searchQ = obj.location;
            break;
            case('date'):
            searchQ = obj.date;
            break;
            case('price'):
            searchQ = obj.price;
            break;
            default:
                return {"message":"Search by name,location,date or price"}
        }
        return {key:Object.keys(obj)[0] , value:searchQ}
    }
}
