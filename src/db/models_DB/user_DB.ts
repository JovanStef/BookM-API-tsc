import mongoose, { Schema, Document } from 'mongoose';

export interface User_DB extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  tokens: Array<string>;
  events: Array<string>;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventDB',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserDB = mongoose.model<User_DB>('UserDB', userSchema);

export default UserDB;
