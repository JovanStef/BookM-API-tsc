import mongoose,{Schema,Document} from 'mongoose';

export interface Event_DB extends mongoose.Document {
     name: string;
     date: string;
     location: object;
     prices: object;
     artist: object;
     image: string;
     desc:string;
}

  const eventSchema:Schema = new mongoose.Schema({
    name:{
          type:String,
          lowercase:true,
          required:true
    },
    date:{
        type:String,
        required:true
    },
    location:{
        country:{
            type:String,
            lowercase:true,
            required:true
        },
        capital:{
            type:String,
            lowercase:true,
            required:true
        }
        
    },
    prices:{
        parter:{
            type:Number,
            required:true
        },
        fanPit:{
            type:Number,
            required:true
        },
        vip:{
            type:Number,
            required:true
        },
    },
    artist:{
        name:{
            type:String,
            lowercase:true,
            required:true
        },
        url:{
            type:String,
            lowercase:true,
            required:true
        }
    },
    image:{
        type:String,
        lowercase:true,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
  },
  {
      timestamps:true
  });
  
  const EventDB = mongoose.model<Event_DB>('EventDB',eventSchema);

 
  
  export default EventDB