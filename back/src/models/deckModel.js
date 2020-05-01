import mongoose from 'mongoose'


var ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

export const DeckSchema = new Schema({
    colors: Array,
    cards: [
        {
            id: String,
            img: String,
            cout: Number,
            type: String,
        }
    ],
    userId:{
        type: ObjectId,
        required: 'Entrez un user id'
    }
})
