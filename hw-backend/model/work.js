const mongoose = require('mongoose');

//schema
var workSchema= new mongoose.Schema({
    name:String,
    artist:String,
    url:String
})

var workModel= mongoose.model('work', workSchema);
module.exports=workModel;