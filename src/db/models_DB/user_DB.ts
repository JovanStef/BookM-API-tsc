import mongoose,{Schema,Document} from 'mongoose';
import EventDB from './event_DB';

export interface User_DB extends mongoose.Document {
    name: string;
    email:string;
    password:string;
    tokens:Array<string>;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
},{
    timestamps:true
}); 
userSchema.virtual('events',{
    ref:'EventDB',
    localField:'_id',
    foreignField:'user'
});
const UserDB = mongoose.model<User_DB>('UserDB',userSchema);

  
export default UserDB;