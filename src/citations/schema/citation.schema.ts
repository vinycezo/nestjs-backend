import * as mongoose from 'mongoose';

export const CitationSchema= new mongoose.Schema({
    libelle:String,
    oeuvre:String,
    auteur:String,
     like:Number  
})