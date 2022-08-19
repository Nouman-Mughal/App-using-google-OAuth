import mongoose  from "mongoose";

const Schema=mongoose.Schema;
//this code will allow mongoose to create new schema.
const userSchema=new Schema({
    username:String,
    googleID:String,
    thumbnail:String
})
//now need to create new model in database or new collection.
export const User=mongoose.model('user',userSchema)
//upto now we have defined collection and its datastructure.