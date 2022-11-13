const mongoose = require('mongoose');

//schema
var notesSchema= new mongoose.Schema({
    title:String,
    content:String
})

var notesModel= mongoose.model('notes', notesSchema);
module.exports=notesModel;