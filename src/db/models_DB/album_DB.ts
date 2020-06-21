import mongoose,{Schema,Document} from 'mongoose';

export interface Album_DB extends mongoose.Document {
    name:string;
    image:string
}

  const albumSchema:Schema = new mongoose.Schema({
      name:{
          type:String,
          lowercase:true,
      },
      image:{
          type:String,
          lowercase:true,
      },
      artist:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'Artist'
      }
      
  },
  {
      timestamps:true
  });
  
  const AlbumDB = mongoose.model<Album_DB>('AlbumDB',albumSchema);

 
  
  export default AlbumDB