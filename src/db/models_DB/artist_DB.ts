  import mongoose,{Schema,Document} from 'mongoose';

  export interface Artist_DB extends mongoose.Document {
      name:string;
      url:string
  }

    const artistSchema:Schema = new mongoose.Schema({
        name:{
            type:String,
            unique:true,
            lowercase:true,
            required:true
        },
        url:{
            type:String,
            lowercase:true,
            required:true
        },
        albums:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Album'
        }]
        
    },
    {
        timestamps:true
    });
    
    const ArtistDB = mongoose.model<Artist_DB>('ArtistDB',artistSchema);

   
    
    export default ArtistDB