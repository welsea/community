const mongoose = require('mongoose');

//schema
var ficsSchema= new mongoose.Schema({
    name:String,
    content:String,
    author:String,
    kudos:Number,
    summary:String
})

var ficsModel= mongoose.model('fics', ficsSchema);
module.exports=ficsModel;